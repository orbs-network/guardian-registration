import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { OrbsAccountStore } from "./OrbsStore";

interface IStores {
  cryptoWalletIntegrationStore: CryptoWalletConnectionStore;
  orbsAccountStore: OrbsAccountStore;
}
