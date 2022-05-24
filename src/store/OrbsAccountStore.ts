import {
  action,
  computed,
  IReactionDisposer,
  observable,
  reaction,
} from "mobx";
import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { PromiEvent, TransactionReceipt } from "web3-core";
import { delay, ipvHexToV4 } from "../utils/utils";
import { JSON_RPC_ERROR_CODES } from "../constants/ethereumErrorCodes";
import {
  ICryptoWalletConnectionService,
  IGuardiansService,
  IStakingRewardsService,
  TGuardianRewardsSettings,
  TRewardsContractSettings,
  TGuardianRegistrationPayload,
  TGuardianUpdatePayload,
  IDelegationsService,
} from "@orbs-network/contracts-js";
import transactionService from "../services/TransactionService";
import { checkIfRegisteredByChain } from "./utils";
import { IRegistrationByChain } from "../types";

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

const emptyGuardianContractInteractionTimes: TGuardianContractInteractionTimes =
  {
    registrationTime: 0,
    lastUpdateTime: 0,
  };

const ONE_HOUR_IN_SECONDS = 60 * 60;

export class OrbsAccountStore {
  @observable public doneLoading = false;
  @observable public errorLoading = false;
  @observable public txPending = false;
  @observable public registrationStatusByChain: IRegistrationByChain[] = [];
  @observable public txHadError = false;
  @observable public txCanceled = false;
  @observable public isGuardian = false;
  @observable public guardianInfo: TGuardianInfo = emptyGuardianInfo;
  @observable public txHash: string | undefined = undefined;

  @observable
  public guardianContractInteractionTimes: TGuardianContractInteractionTimes = emptyGuardianContractInteractionTimes;

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

  @observable public selectedGuardianAddress?: string;

  @observable
  public delegatorsCutPercentage?: number;
  @observable
  public detailsPageUrl?: string;

  @observable public ethBalance = 0;

  private addressChangeReaction: IReactionDisposer;

  constructor(
    private cryptoWalletIntegrationStore: CryptoWalletConnectionStore,
    private guardiansService: IGuardiansService,
    private stakingRewardsService: IStakingRewardsService,
    private delegationsService: IDelegationsService,
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

  @computed public get isUsingDefaultDelegatorsCutPercentage(): boolean {
    return this.guardianRewardsSettings.isUsingDefaultRewardsPercent;
  }

  @computed public get hasGuardianDetailsURL(): boolean {
    return !!this.detailsPageUrl;
  }

  @computed public get registeredChains(): number[] {

    return this.registrationStatusByChain
      .filter((m) => m.isRegistered)
      .map((m) => m.chain);
  }


  @computed public get unregisteredChains(): number[] {
    return this.registrationStatusByChain
      .filter((m) => !m.isRegistered)
      .map((m) => m.chain);
  }

  /**
   * Checks if the account is delegating to another account
   */
  @computed public get isDelegatingToOtherAccount(): boolean {
    return (
      this.selectedGuardianAddress !== undefined &&
      this.selectedGuardianAddress?.toLowerCase() !==
        this.cryptoWalletIntegrationStore.mainAddress.toLowerCase()
    );
  }

  private onTransactionEnded() {
    this.setTxHash(undefined);
    this.setTxPending(false);
    transactionService.clearTransactionHash();
  }

  // **** Contract interactions ****
  private async handlePromievent(
    promievent:
      | PromiEvent<TransactionReceipt>
      | Promise<PromiEvent<TransactionReceipt>>,
    name = "A promivent"
  ): Promise<TransactionReceipt | undefined> {
    this.resetTxIndicators();

    // Indicate tx is pending
    this.setTxPending(true);
    console.log(`Waiting for promievent of ${name}`);
    try {
      const res = await promievent;

      console.log(`Got Results for promievent of ${name}`);
      return res;
    } catch (e) {
      this.onTransactionEnded();
      if (
        (e as any).code === JSON_RPC_ERROR_CODES.provider.userRejectedRequest
      ) {
        this.setTxCanceled(true);
      } else {
        throw e;
      }
    }
  }

  public async createPromiEventAction(
    promiEvent: PromiEvent<TransactionReceipt>,
    errorMsg: string,
    name?: string
  ) {
    try {
      let blockNumber = 0;
      promiEvent.once("transactionHash", (hash: string) => {
        this.setTxHash(hash);
        transactionService.setTransactionHash(hash);
      });
      promiEvent.once("receipt", async (receipt) => {
        blockNumber = receipt.blockNumber;
      });
      const txRes = await this.handlePromievent(promiEvent, name);

      await transactionService.onReceiptConfirmation(blockNumber);

      this.manuallyReadAccountData();
      this.onTransactionEnded();

      return txRes;
    } catch (e) {
      this.setTxHadError(true);
      // TODO : Handle the error
      console.error(`${errorMsg} ${e}`);
      throw e;
    }
  }

  public async registerGuardian(
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) {
    const promiEvent = this.guardiansService.registerGuardian(
      guardianRegistrationPayload
    );
    return this.createPromiEventAction(
      promiEvent,
      "Failed registering guardian",
      "Register guardian"
    );
  }

  public async updateGuardianInfo(
    guardianUpdatePayload: TGuardianUpdatePayload
  ) {
    const promiEvent = this.guardiansService.updateGuardianInfo(
      guardianUpdatePayload
    );
    return this.createPromiEventAction(
      promiEvent,
      "Failed updating guardian info",
      "Update guardian"
    );
  }

  public async unregisterGuardian() {
    const promiEvent = this.guardiansService.unregisterGuardian();
    return this.createPromiEventAction(
      promiEvent,
      "Failed unregistering guardian",
      "Unregister guardian"
    );
  }

  public async unDelegateCurrentDelegation() {
    const promiEvent = this.delegationsService.unDelegate(
      this.cryptoWalletIntegrationStore.mainAddress
    );
    return this.createPromiEventAction(
      promiEvent,
      "Failed unDelegating",
      "UnDelegate"
    );
  }

  public async writeGuardianDelegatorsCutPercentage(
    delegatorsCutPercentage: number
  ) {
    const promiEvent = this.stakingRewardsService.setDelegatorsCutPercentage(
      delegatorsCutPercentage
    );
    return this.createPromiEventAction(
      promiEvent,
      "Failed setting delegators cut percentage",
      "Set delegators cut percentage"
    );
  }

  public async writeGuardianDetailsPageURL(guardianDetailsPageURl: string) {
    const promiEvent = this.guardiansService.setGuardianDetailsPageUrl(
      guardianDetailsPageURl
    );

    try {
      const txRes = await this.handlePromievent(
        promiEvent,
        "Set Details page URL"
      );

      // After updating, lets re-read the data
      await this.manuallyReadAccountData();
      this.onTransactionEnded();
      return txRes;
    } catch (e) {
      // TODO : Handle the error
      console.error(`Failed setting Details page URL ${e}`);
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
      } catch (e: any) {
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
    this.delegationsService.setFromAccount(accountAddress);
  }

  // **** Data reading and setting ****

  public async manuallyReadAccountData() {
    try {
      await this.readDataForAccount(
        this.cryptoWalletIntegrationStore.mainAddress
      );
    } catch (e: any) {
      this.failLoadingProcess(e);
      console.error(
        "Error in manually reading address data in Orbs Account Store",
        e
      );
    }
  }

  private async readDataForAccount(accountAddress: string) {
    const res = await checkIfRegisteredByChain(accountAddress);    
    if(res){
      this.setRegistrationStatusByChain(res)
    }
   

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

    this.readAndSetSelectedGuardianAddress(accountAddress).catch((e) =>
      console.error(`Error read-n-set Selected Guardian address ${e}`)
    );

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

        const guardianRegistrationTimeInfo: TGuardianContractInteractionTimes =
          {
            registrationTime,
            lastUpdateTime,
          };

        this.setGuardianInfo(guardianInfo);
        this.setGuardianContractInteractionTimes(guardianRegistrationTimeInfo);
      });
  }

  private async readAndSetDelegatorsCut(accountAddress: string) {
    const delegatorsCut =
      await this.stakingRewardsService.readDelegatorsCutPercentage(
        accountAddress
      );

    console.log("Setting delegtors cut", delegatorsCut);
    this.setDelegatorsCutPercentage(delegatorsCut);
  }

  private async readAndSetDetailsPageUrl(accountAddress: string) {
    const detailsPageUrl =
      await this.guardiansService.readGuardianDetailsPageUrl(accountAddress);

    this.setDetailsPageURL(detailsPageUrl || undefined);
  }

  private async readAndSetRewardsContractSettings() {
    const rewardsContractSettings =
      await this.stakingRewardsService.readContractRewardsSettings();

    this.setRewardsContractSettings(rewardsContractSettings);
  }

  private async readAndSetGuardianRewardsSettings(accountAddress: string) {
    const guardianRewardsSettings =
      await this.stakingRewardsService.readGuardianRewardsSettings(
        accountAddress
      );

    this.setGuardianRewardsSettings(guardianRewardsSettings);
  }

  private async readAndSetEthereumBalance(accountAddress: string) {
    const ethBalance =
      await this.cryptoWalletConnectionService.readEthereumBalance(
        accountAddress
      );

    this.setEthereumBalance(ethBalance);
  }

  private async readAndSetSelectedGuardianAddress(accountAddress: string) {
    const selectedGuardianAddress =
      await this.delegationsService.readDelegation(accountAddress);

    this.setSelectedGuardianAddress(selectedGuardianAddress);
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

  @action("setRegistrationStatusByChain")
  private setRegistrationStatusByChain(value: IRegistrationByChain[]) {
    this.registrationStatusByChain = value;
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

  @action("setTxHash")
  private setTxHash(value?: string) {
    this.txHash = value;
  }

  @action("setEthereumBalance")
  private setEthereumBalance(ethereumBalance: number) {
    this.ethBalance = ethereumBalance;
  }

  @action("setSelectedGuardianAddress")
  private setSelectedGuardianAddress(selectedGuardianAddress: string) {
    this.selectedGuardianAddress = selectedGuardianAddress;
  }
}
