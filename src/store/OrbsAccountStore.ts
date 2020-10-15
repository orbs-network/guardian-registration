import {
  action,
  computed,
  IReactionDisposer,
  observable,
  reaction,
} from "mobx";
import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { PromiEvent, TransactionReceipt } from "web3-core";
import { ipvHexToV4 } from "../utils/utils";
import { JSON_RPC_ERROR_CODES } from "../constants/ethereumErrorCodes";
import {
  ICryptoWalletConnectionService,
  IGuardiansService,
  IStakingRewardsService,
  TGuardianRewardsSettings,
  TRewardsContractSettings,
  GUARDIANS_SERVICE_CONSTANTS,
  TGuardianRegistrationPayload,
  TGuardianUpdatePayload,
} from "@orbs-network/contracts-js";

export type TGuardianInfo = {
  ip: string;
  orbsAddr: string;
  name: string;
  website: string;
  // contact: string;
};

export type TGuardianContractInteractionTimes = {
  /**
   * Unix timestamp
   */
  registrationTime: number;
  /**
   * Unix timestamp
   */
  lastUpdateTime: number;
};

const emptyGuardianInfo: TGuardianInfo = {
  orbsAddr: "",
  // contact: "",
  ip: "",
  website: "",
  name: "",
};

const emptyGuardianContractInteractionTimes: TGuardianContractInteractionTimes = {
  registrationTime: 0,
  lastUpdateTime: 0,
};

const ONE_HOUR_IN_SECONDS = 60 * 60;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class OrbsAccountStore {
  @observable public doneLoading = false;
  @observable public errorLoading = false;
  @observable public txPending = false;
  @observable public txHadError = false;
  @observable public txCanceled = false;
  @observable public isGuardian = false;
  @observable public guardianInfo: TGuardianInfo = emptyGuardianInfo;
  @observable
  public guardianContractInteractionTimes: TGuardianContractInteractionTimes = emptyGuardianContractInteractionTimes;
  @observable
  public rewardDistributionFrequencyInHours: number =
    GUARDIANS_SERVICE_CONSTANTS.emptyRewardsFrequencyValue;

  @observable
  public rewardsContractSettings: TRewardsContractSettings = {
    maxDelegatorsStakingRewardsPercent: 0,
    defaultDelegatorsStakingRewardsPercent: 0,
  };

  @observable
  public guardianRewardsSettings: TGuardianRewardsSettings = {
    isUsingDefaultRewardsPercent: true,
    delegatorsStakingRewardsPercent: 0,
  };

  @observable
  public delegatorsCutPercentage?: number;
  @observable
  public detailsPageUrl?: string;
  @observable
  public guardianId?: string;

  @observable public ethBalance = 0;

  private addressChangeReaction: IReactionDisposer;

  constructor(
    private cryptoWalletIntegrationStore: CryptoWalletConnectionStore,
    private guardiansService: IGuardiansService,
    private stakingRewardsService: IStakingRewardsService,
    private cryptoWalletConnectionService: ICryptoWalletConnectionService
  ) {
    this.addressChangeReaction = reaction(
      () => this.cryptoWalletIntegrationStore.mainAddress,
      async (address) => {
        this.setDoneLoading(false);
        await this.reactToConnectedAddressChanged(address);
        this.setDoneLoading(true);
      },
      {
        fireImmediately: true,
      }
    );
  }

  // **** Computed values ****
  @computed public get isUsingDefaultRewardFrequency(): boolean {
    return (
      this.rewardDistributionFrequencyInHours ===
      GUARDIANS_SERVICE_CONSTANTS.emptyRewardsFrequencyValue
    );
  }

  @computed public get isUsingDefaultDelegatorsCutPercentage(): boolean {
    return this.guardianRewardsSettings.isUsingDefaultRewardsPercent;
  }

  @computed public get hasGuardianDetailsURL(): boolean {
    return !!this.detailsPageUrl;
  }

  @computed public get hasGuardianId(): boolean {
    return this.guardianId !== undefined;
  }

  // **** Contract interactions ****
  private async handlePromievent(
    promievent: PromiEvent<TransactionReceipt>,
    name = "A promivent"
  ): Promise<void> {
    this.resetTxIndicators();

    // Indicate tx is pending
    this.setTxPending(true);
    console.log(`Waiting for promievent of ${name}`);

    try {
      const res = await promievent;
      console.log(`Got Results for promievent of ${name}`);
      return;
    } catch (e) {
      if (
        (e as any).code === JSON_RPC_ERROR_CODES.provider.userRejectedRequest
      ) {
        this.setTxCanceled(true);
      } else {
        throw e;
      }
    } finally {
      this.setTxPending(false);
    }
  }

  public async registerGuardian(
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) {
    try {
      const promiEvent = this.guardiansService.registerGuardian(
        guardianRegistrationPayload
      );

      await this.handlePromievent(promiEvent, "Register guardian");

      // After registering, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      this.setTxHadError(true);
      // TODO : Handle the error
      console.error(`Failed registering guardian ${e}`);
      throw e;
    }
  }

  public async updateGuardianInfo(
    guardianUpdatePayload: TGuardianUpdatePayload
  ) {
    try {
      const promiEvent = this.guardiansService.updateGuardianInfo(
        guardianUpdatePayload
      );

      const res = await this.handlePromievent(promiEvent, "Update guardian");

      // After registering, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      this.setTxHadError(true);
      // TODO : Handle the error
      console.error(`Failed updating guardian info ${e}`);
      throw e;
    }
  }

  public async unregisterGuardian() {
    try {
      const promiEvent = this.guardiansService.unregisterGuardian();

      const res = await this.handlePromievent(
        promiEvent,
        "Unregister guardian"
      );

      // After registering, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      this.setTxHadError(true);
      // TODO : Handle the error
      console.error(`Failed unregistering guardian ${e}`);
      throw e;
    }
  }

  public async setGuardianDistributionFrequency(frequencyInHours: number) {
    const frequencyInSeconds = frequencyInHours * ONE_HOUR_IN_SECONDS;

    const promiEvent = this.guardiansService.setGuardianDistributionFrequency(
      frequencyInSeconds
    );

    try {
      await this.handlePromievent(promiEvent, "Set distribution frequency");

      // After updating, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      // TODO : Handle the error
      console.error(`Failed setting distribution frequency ${e}`);
      throw e;
    }
  }

  public async writeGuardianDelegatorsCutPercentage(
    delegatorsCutPercentage: number
  ) {
    console.log(`Writing :`, delegatorsCutPercentage);

    const promiEvent = this.stakingRewardsService.setDelegatorsCutPercentage(
      delegatorsCutPercentage
    );

    try {
      await this.handlePromievent(promiEvent, "Set delegators cut percentage");

      // After updating, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      // TODO : Handle the error
      console.error(`Failed setting delegators cut percentage ${e}`);
      throw e;
    }
  }

  public async writeGuardianDetailsPageURL(guardianDetailsPageURl: string) {
    console.log(`Writing :`, guardianDetailsPageURl);

    const promiEvent = this.guardiansService.setGuardianDetailsPageUrl(
      guardianDetailsPageURl
    );

    try {
      await this.handlePromievent(promiEvent, "Set Details page URL");

      // After updating, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      // TODO : Handle the error
      console.error(`Failed setting Details page URL ${e}`);
      throw e;
    }
  }

  public async writeGuardianId(guardianId: string) {
    const promiEvent = this.guardiansService.setGuardianId(guardianId);

    try {
      await this.handlePromievent(promiEvent, "Set Guardian ID");

      // After updating, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      // TODO : Handle the error
      console.error(`Failed setting Guardian ID ${e}`);
      throw e;
    }
  }

  // **** Current address changed ****

  private async reactToConnectedAddressChanged(currentAddress: string) {
    if (currentAddress) {
      this.setDefaultAccountAddress(currentAddress);

      if (this.cryptoWalletIntegrationStore.hasEventsSupport) {
        this.refreshAccountListeners(currentAddress);
      }

      try {
        await this.readDataForAccount(currentAddress);
      } catch (e) {
        this.failLoadingProcess(e);
        console.error(
          "Error in reacting to address change in Orbs Account Store",
          e
        );
      }
    }
  }

  private setDefaultAccountAddress(accountAddress: string) {
    this.guardiansService.setFromAccount(accountAddress);
    this.stakingRewardsService.setFromAccount(accountAddress);
    // this.stakingService.setFromAccount(accountAddress);
    // this.orbsTokenService.setFromAccount(accountAddress);
  }

  // **** Data reading and setting ****

  public async manuallyReadAccountData() {
    try {
      await this.readDataForAccount(
        this.cryptoWalletIntegrationStore.mainAddress
      );
    } catch (e) {
      this.failLoadingProcess(e);
      console.error(
        "Error in manually reading address data in Orbs Account Store",
        e
      );
    }
  }

  private async readDataForAccount(accountAddress: string) {
    // DEV_NOTE: We wait to check if this account is a Guardian because it
    //           Affects on whether we need to read more data or not.
    try {
      await this.readAndSetIsGuardian(accountAddress);
    } catch (e) {
      console.error(`Error read-n-set isGuardian ${e}`);
    }

    if (this.isGuardian) {
      this.readAndSetGuardianInfo(accountAddress).catch((e) =>
        console.error(`Error read-n-set Guardian Info ${e}`)
      );

      this.readAndSetRewardsDistributionFrequency(accountAddress).catch((e) =>
        console.error(`Error read-n-set Rewards Frequency ${e}`)
      );

      this.readAndSetDelegatorsCut(accountAddress).catch((e) =>
        console.error(`Error read-n-set delegators cut percentage ${e}`)
      );

      this.readAndSetGuardianRewardsSettings(accountAddress).catch((e) =>
        console.error(`Error read-n-set Guardian rewards settings ${e}`)
      );

      this.readAndSetDetailsPageUrl(accountAddress).catch((e) =>
        console.error(`Error read-n-set Details page URL ${e}`)
      );
    }

    // DEV_NOTE : O.L : This piece of info is not directly related to the account
    this.readAndSetRewardsContractSettings().catch((e) =>
      console.error(`Error read-n-set Ethereum balance ${e}`)
    );

    this.readAndSetEthereumBalance(accountAddress).catch((e) =>
      console.error(`Error read-n-set Ethereum balance ${e}`)
    );
  }

  private async readAndSetIsGuardian(accountAddress: string) {
    const isGuardian = await this.guardiansService.isRegisteredGuardian(
      accountAddress
    );
    this.setIsGuardian(isGuardian);
  }

  private async readAndSetGuardianInfo(accountAddress: string) {
    this.guardiansService
      .readGuardianInfo(accountAddress)
      .then((guardianInfoResponse) => {
        const {
          name,
          website,
          orbsAddr,
          ip,
          // contact,
          registrationTime,
          lastUpdateTime,
        } = guardianInfoResponse;

        // DEV_NOTE : We update two different observables, one for the actual data, and the other for
        //            the creation and editing time.
        const guardianInfo: TGuardianInfo = {
          name,
          website,
          ip: ipvHexToV4(ip),
          // contact,
          orbsAddr,
        };

        const guardianRegistrationTimeInfo: TGuardianContractInteractionTimes = {
          registrationTime,
          lastUpdateTime,
        };

        this.setGuardianInfo(guardianInfo);
        this.setGuardianContractInteractionTimes(guardianRegistrationTimeInfo);
      });
  }

  private async readAndSetRewardsDistributionFrequency(accountAddress: string) {
    const frequencyInSeconds = await this.guardiansService.readGuardianDistributionFrequencyInSeconds(
      accountAddress
    );

    const frequencyInHours = frequencyInSeconds / ONE_HOUR_IN_SECONDS;

    this.setRewardDistributionFrequencyInHours(frequencyInHours);
  }

  private async readAndSetDelegatorsCut(accountAddress: string) {
    const delegatorsCut = await this.stakingRewardsService.readDelegatorsCutPercentage(
      accountAddress
    );

    console.log("Setting delegtors cut", delegatorsCut);
    this.setDelegatorsCutPercentage(delegatorsCut);
  }

  private async readAndSetDetailsPageUrl(accountAddress: string) {
    const detailsPageUrl = await this.guardiansService.readGuardianDetailsPageUrl(
      accountAddress
    );

    this.setDetailsPageURL(detailsPageUrl || undefined);
  }

  private async readAndSetRewardsContractSettings() {
    const rewardsContractSettings = await this.stakingRewardsService.readContractRewardsSettings();

    this.setRewardsContractSettings(rewardsContractSettings);
  }

  private async readAndSetGuardianRewardsSettings(accountAddress: string) {
    const guardianRewardsSettings = await this.stakingRewardsService.readGuardianRewardsSettings(
      accountAddress
    );

    this.setGuardianRewardsSettings(guardianRewardsSettings);
  }

  private async readAndSetEthereumBalance(accountAddress: string) {
    const ethBalance = await this.cryptoWalletConnectionService.readEthereumBalance(
      accountAddress
    );

    this.setEthereumBalance(ethBalance);
  }

  // ****  Subscriptions ****

  private async refreshAccountListeners(accountAddress: string) {
    this.cancelAllCurrentSubscriptions();
  }

  private cancelAllCurrentSubscriptions() {}

  // ****  Complex setters ****
  private failLoadingProcess(error: Error) {
    this.setErrorLoading(true);
    this.setDoneLoading(true);
  }

  private resetTxIndicators() {
    this.setTxPending(false);
    this.setTxHadError(false);
    this.setTxCanceled(false);
  }

  // ****  Observables setter actions ****
  @action("setDoneLoading")
  private setDoneLoading(doneLoading: boolean) {
    this.doneLoading = doneLoading;
  }

  @action("setErrorLoading")
  private setErrorLoading(errorLoading: boolean) {
    this.errorLoading = errorLoading;
  }

  @action("setTxPending")
  private setTxPending(txPending: boolean) {
    this.txPending = txPending;
  }

  @action("setTxCanceled")
  private setTxCanceled(txCanceled: boolean) {
    this.txCanceled = txCanceled;
  }

  @action("setTxHadError")
  private setTxHadError(txHadError: boolean) {
    this.txHadError = txHadError;
  }

  @action("setIsGuardian")
  private setIsGuardian(isGuardian: boolean) {
    this.isGuardian = isGuardian;
  }

  @action("setGuardianInfo")
  private setGuardianInfo(guardianInfo: TGuardianInfo) {
    this.guardianInfo = guardianInfo;
  }

  @action("setGuardianRegistrationTimes")
  private setGuardianContractInteractionTimes(
    guardianContractInteractionTimes: TGuardianContractInteractionTimes
  ) {
    this.guardianContractInteractionTimes = guardianContractInteractionTimes;
  }

  @action("setRewardDistributionFrequencyInHours")
  private setRewardDistributionFrequencyInHours(
    rewardDistributionFrequencyInHours: number
  ) {
    this.rewardDistributionFrequencyInHours = rewardDistributionFrequencyInHours;
  }

  @action("setRewardsContractSettings")
  private setRewardsContractSettings(
    rewardsContractSettings: TRewardsContractSettings
  ) {
    this.rewardsContractSettings = rewardsContractSettings;
  }

  @action("setGuardianRewardsSettings")
  private setGuardianRewardsSettings(
    guardianRewardsSettings: TGuardianRewardsSettings
  ) {
    this.guardianRewardsSettings = guardianRewardsSettings;
  }

  @action("setDelegatorsCutPercentage")
  private setDelegatorsCutPercentage(delegatorsCutPercentage: number) {
    this.delegatorsCutPercentage = delegatorsCutPercentage;
  }

  @action("setDetailsPageURL")
  private setDetailsPageURL(detailsPageUrl?: string) {
    this.detailsPageUrl = detailsPageUrl;
  }

  @action("setGuardianId")
  private setGuardianId(guardianId?: string) {
    this.guardianId = guardianId;
  }

  @action("setEthereumBalance")
  private setEthereumBalance(ethereumBalance: number) {
    this.ethBalance = ethereumBalance;
  }
}
