/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

// @ts-ignore
import ethImg from "./assets/images/eth.png";
import polygonImg from "./assets/images/polygon.png";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
export const IS_DEV = process.env.NODE_ENV !== "production";

interface IContaractAdresses {
  guardiansRegistration: string;
  stakingRewards: string;
  delegations: string;
}

export interface INetwork {
  addresses?: IContaractAdresses;
  name: string;
  logo?: string;
  requiredConfirmations?: number;
  nativeCurrency?: { name: string; symbol: string; decimals: number };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
}

const getTestNetworkAddresses = () => {
  try {
    const addresses = require("./local/addresses.json");
    return {
      delegations: addresses.delegations,
      stakingRewards: addresses.stakingRewards,
      guardiansRegistration: addresses.guardiansRegistration,
    };
  } catch (error) {
    console.log("seems that ganache is not running");
  }
};

const networks: { [key: string]: INetwork } = {
  "1": {
    name: "Ethereum",
    logo: ethImg,
    addresses:
      process.env.REACT_APP_TEST_NETWORK === "local"
        ? getTestNetworkAddresses()
        : undefined,
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  "137": {
    name: "Polygon",
    logo: polygonImg,
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://www.polygonscan.com"],
    addresses: {
      guardiansRegistration: "0x9C9ff40EC1C90bB4F72FF123c204ADC55782946d",
      stakingRewards: "0x4450bd4e1489cf7629CBFEd837e879Fb71bc4dF0",
      delegations: "0x19611B0Bda728Bf02821B2fcC81a5fd1d2D8ae45",
    },
  },
};

////////////// CONFIG VARIABLES ///////////////
interface IConfig {
  urlBase: string;
  ETHEREUM_PROVIDER_WS: string;
  termsOfUseUrl: string;
  privacyPolicyUrl: string;
  networks: { [key: string]: INetwork };
}

const configs: IConfig = {
  urlBase: process.env.PUBLIC_BASE_PATH || "",
  ETHEREUM_PROVIDER_WS: `wss://mainnet.infura.io/ws/v3/${INFURA_KEY}`,
  privacyPolicyUrl: "https://www.orbs.com/guardian-portal-privacy-policy/",
  termsOfUseUrl: "https://www.orbs.com/guardian-portal-terms-of-use/",
  networks,
};
export default configs;
