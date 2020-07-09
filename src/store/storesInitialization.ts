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
import { IGuardiansV2Service } from "../services/guardiansV2Service/IGuardiansV2Service";

// This import ensures mobx batching
import "mobx-react-lite/batchingForReactDom";

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
  guardiansV2Service: IGuardiansV2Service
): IStores {
  // Create stores instances + Hydrate the stores
  const cryptoWalletIntegrationStore = new CryptoWalletConnectionStore(
    cryptoWalletConnectionService
  );
  const orbsAccountStore = new OrbsAccountStore(
    cryptoWalletIntegrationStore,
    guardiansV2Service
  );

  const stores: IStores = {
    cryptoWalletIntegrationStore,
    orbsAccountStore,
  };

  return stores;
}
