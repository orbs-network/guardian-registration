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
      guardiansRegistration: "0x49E77b78275D6c69c807727870682DbC725E4dc9",
      stakingRewards: "0x295d1982b1b20Cc0c02A0Da7285826c69EF71Fac",
      delegations: "0x513d30e66641cB1f2670b5994DD8E2B61ED3C23c",
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
