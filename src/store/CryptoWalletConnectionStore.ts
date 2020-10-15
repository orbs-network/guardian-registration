import { action, computed, observable, reaction } from "mobx";
import { IReactionDisposer } from "mobx/lib/core/reaction";
import { ICryptoWalletConnectionService } from "@orbs-network/contracts-js";

export class CryptoWalletConnectionStore {
  @observable private walletConnectionRequestApproved: boolean = false;

  @observable public hasEthereumProvider: boolean;
  @observable public hasEventsSupport: boolean;

  @observable public mainAddress: string = "";

  private addressCheckingInterval?: NodeJS.Timeout = undefined;
  reactionToWalletConnection: IReactionDisposer;

  constructor(
    private cryptoWalletConnectionService: ICryptoWalletConnectionService
  ) {
    this.hasEthereumProvider =
      cryptoWalletConnectionService.hasEthereumProvider;
    this.hasEventsSupport = cryptoWalletConnectionService.hasEventsSupport;

    this.reactionToWalletConnection = reaction(
      () => this.isConnectedToWallet,
      async (isConnected) => {
        if (isConnected) {
          this.readInformationFromConnectedWallet();
        }
      },
      {
        fireImmediately: true,
      }
    );

    if (this.hasEthereumProvider) {
      // We will only detect address change if the Ethereum provider can support it
      if (this.cryptoWalletConnectionService.hasEventsSupport) {
        this.cryptoWalletConnectionService.onMainAddressChange((address) =>
          this.setMainAddress(address)
        );
      } else {
        // Else, we will read it one time + set an interval
        this.cryptoWalletConnectionService
          .readMainAddress()
          .then((address) => this.setMainAddress(address));

        this.addressCheckingInterval = setInterval(
          () =>
            this.cryptoWalletConnectionService
              .readMainAddress()
              .then((address) => this.setMainAddress(address)),
          1000
        );
      }
    }
  }

  @computed
  public get isConnectedToWallet(): boolean {
    return (
      this.hasEthereumProvider &&
      (this.cryptoWalletConnectionService.didUserApproveDappInThePast ||
        this.walletConnectionRequestApproved)
    );
  }

  public async askToConnect(): Promise<boolean> {
    if (this.isConnectedToWallet) {
      return true;
    } else {
      const permissionGranted = await this.cryptoWalletConnectionService.requestConnectionPermission();
      this.setWalletConnectionRequestApproved(permissionGranted);

      return this.walletConnectionRequestApproved;
    }
  }

  private async readInformationFromConnectedWallet() {
    const walletAddress = await this.cryptoWalletConnectionService.readMainAddress();

    this.setMainAddress(walletAddress);
  }

  @action("setWalletConnectionRequestApproved")
  private setWalletConnectionRequestApproved(requestApproved: boolean) {
    this.walletConnectionRequestApproved = requestApproved;
  }

  @action("setMainAddress")
  private setMainAddress(mainAddress: string) {
    this.mainAddress = mainAddress;
  }
}
