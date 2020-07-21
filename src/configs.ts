import { IOrbsPosContractsAddresses } from "orbs-pos-data";

/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

type TSupportedNets = "local" | "ropsten" | "mainnet";
// @ts-ignore
const ethereumNetwork: TSupportedNets = process.env.REACT_APP_ETHEREUM_NETWORK;

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
export const IS_DEV = process.env.NODE_ENV !== "production";
const SHOULD_OVERRIDE_ADDRESS = IS_DEV || ethereumNetwork === "ropsten";

////////////// CONFIG VARIABLES ///////////////
interface IConfig {
  urlBase: string;
  v2contractsAddressesOverride: Partial<{
    guardiansRegistration: string;
  }>;
  ETHEREUM_PROVIDER_WS: string;
}

const configs: IConfig = {
  urlBase: process.env.PUBLIC_BASE_PATH || "",
  v2contractsAddressesOverride: {},
  ETHEREUM_PROVIDER_WS: `wss://mainnet.infura.io/ws/v3/${INFURA_KEY}`,
};

// Webpack will remove this section on production build //
if (process.env.NODE_ENV !== "production") {
  if (ethereumNetwork === "local") {
    const addresses = require("./local/addresses.json");

    configs.v2contractsAddressesOverride.guardiansRegistration =
      addresses.guardiansRegistration;
  }
}

export default configs;
