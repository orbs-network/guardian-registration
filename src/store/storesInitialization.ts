import { configure } from "mobx";
import { IStores } from "./stores";

import { CryptoWalletConnectionStore } from "./CryptoWalletConnectionStore";
import { OrbsAccountStore } from "./OrbsAccountStore";

// This import ensures mobx batching
import "mobx-react-lite/batchingForReactDom";
import {
  ICryptoWalletConnectionService,
  IGuardiansService,
  IStakingRewardsService,
} from "@orbs-network/contracts-js";

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
  guardiansV2Service: IGuardiansService,
  stakingRewardsV2Service: IStakingRewardsService
): IStores {
  // Create stores instances + Hydrate the stores
  const cryptoWalletIntegrationStore = new CryptoWalletConnectionStore(
    cryptoWalletConnectionService
  );
  const orbsAccountStore = new OrbsAccountStore(
    cryptoWalletIntegrationStore,
    guardiansV2Service,
    stakingRewardsV2Service,
    cryptoWalletConnectionService
  );

  const stores: IStores = {
    cryptoWalletIntegrationStore,
    orbsAccountStore,
  };

  return stores;
}
