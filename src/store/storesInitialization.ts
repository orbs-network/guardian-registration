import { configure } from "mobx";
import { IStores } from "./stores";
import {
  IOrbsPOSDataService,
  IStakingService,
  IOrbsTokenService,
  IGuardiansService,
  IOrbsRewardsService,
} from "orbs-pos-data";

import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { ICryptoWalletConnectionService } from "../services/cryptoWalletConnectionService/ICryptoWalletConnectionService";
import { OrbsAccountStore } from "./OrbsAccountStore";

/**
 * Configures the mobx library. Should get called at App's initialization.
 */
export function configureMobx() {
  configure({
    enforceActions: "observed",
  });
}

/**
 * Builds and initializes all of the stores
 */
export function getStores(
  cryptoWalletConnectionService: ICryptoWalletConnectionService,
  guardiansService: IGuardiansService
): IStores {
  // Create stores instances + Hydrate the stores
  const cryptoWalletIntegrationStore = new CryptoWalletConnectionStore(
    cryptoWalletConnectionService
  );
  const orbsAccountStore = new OrbsAccountStore(
    cryptoWalletIntegrationStore,
    guardiansService
  );

  const stores: IStores = {
    cryptoWalletIntegrationStore,
    orbsAccountStore,
  };

  return stores;
}
