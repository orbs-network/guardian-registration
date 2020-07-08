import {
  action,
  computed,
  IReactionDisposer,
  observable,
  reaction,
} from "mobx";
import { IGuardiansService } from "orbs-pos-data";
import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { IGuardiansV2Service } from "../services/guardiansV2Service/IGuardiansV2Service";
export class OrbsAccountStore {
  @observable public doneLoading = false;
  @observable public errorLoading = false;
  @observable public isGuardian = false;

  @computed get isRegisteredGuardian(): boolean {
    return true;
  }

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
    this.readAndSetIsGuardian(accountAddress).catch((e) =>
      console.error(`Error read-n-set isGuardian ${e}`)
    );
  }

  private async readAndSetIsGuardian(accountAddress: string) {
    const isGuardian = await this.guardiansV2Service.isRegisteredGuardian(
      accountAddress
    );
    this.setIsGuardian(isGuardian);
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
}
