import { action, IReactionDisposer, observable, reaction } from "mobx";
import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import {
  IGuardiansV2Service,
  TGuardianInfoResponse,
  TGuardianRegistrationPayload,
  TGuardianUpdatePayload,
} from "../services/guardiansV2Service/IGuardiansV2Service";

export type TGuardianInfo = {
  ip: string;
  orbsAddr: string;
  name: string;
  website: string;
  contact: string;
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
  contact: "",
  ip: "",
  website: "",
  name: "",
};

const emptyGuardianContractInteractionTimes: TGuardianContractInteractionTimes = {
  registrationTime: 0,
  lastUpdateTime: 0,
};

export class OrbsAccountStore {
  @observable public doneLoading = false;
  @observable public errorLoading = false;
  @observable public isGuardian = false;
  @observable public guardianInfo: TGuardianInfo = emptyGuardianInfo;
  @observable
  public guardianContractInteractionTimes: TGuardianContractInteractionTimes = emptyGuardianContractInteractionTimes;

  private addressChangeReaction: IReactionDisposer;

  constructor(
    private cryptoWalletIntegrationStore: CryptoWalletConnectionStore,
    private guardiansV2Service: IGuardiansV2Service
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

  // **** Contract interactions ****

  public async registerGuardian(
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) {
    try {
      const promiEvent = await this.guardiansV2Service.registerGuardian(
        guardianRegistrationPayload
      );

      const res = await promiEvent;
      console.log("res", res);

      // After registering, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      // TODO : Handle the error
      console.error(`Failed registering guardian ${e}`);
      throw e;
    }
  }

  public async updateGuardianInfo(
    guardianUpdatePayload: TGuardianUpdatePayload
  ) {
    try {
      const promiEvent = await this.guardiansV2Service.updateGuardianInfo(
        guardianUpdatePayload
      );

      const res = await promiEvent;
      console.log("Guardian update result", res);

      // After registering, lets re-read the data
      await this.manuallyReadAccountData();
    } catch (e) {
      // TODO : Handle the error
      console.error(`Failed updating guardian info ${e}`);
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
    this.guardiansV2Service.setFromAccount(accountAddress);
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
      console.log("Reading account data for ", accountAddress);
      await this.readAndSetIsGuardian(accountAddress);

      const freq = await this.guardiansV2Service.readGuardianDistributionFrequency(
        accountAddress
      );
      console.log("Freq", freq);
    } catch (e) {
      console.error(`Error read-n-set isGuardian ${e}`);
    }

    if (this.isGuardian) {
      console.log("Reading guardian info");
      this.readAndSetGuardianInfo(accountAddress).catch((e) =>
        console.error(`Error read-n-set Guardian Info ${e}`)
      );
    }
  }

  private async readAndSetIsGuardian(accountAddress: string) {
    const isGuardian = await this.guardiansV2Service.isRegisteredGuardian(
      accountAddress
    );
    this.setIsGuardian(isGuardian);
  }

  private async readAndSetGuardianInfo(accountAddress: string) {
    this.guardiansV2Service
      .readGuardianInfo(accountAddress)
      .then((guardianInfoResponse) => {
        const {
          name,
          website,
          orbsAddr,
          ip,
          contact,
          registrationTime,
          lastUpdateTime,
        } = guardianInfoResponse;

        // DEV_NOTE : We update two different observables, one for the actual data, and the other for
        //            the creation and editing time.
        const guardianInfo: TGuardianInfo = {
          name,
          website,
          ip,
          contact,
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

  // ****  Observables setter actions ****
  @action("setDoneLoading")
  private setDoneLoading(doneLoading: boolean) {
    this.doneLoading = doneLoading;
  }

  @action("setErrorLoading")
  private setErrorLoading(errorLoading: boolean) {
    this.errorLoading = errorLoading;
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
}
