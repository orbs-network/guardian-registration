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
import polygonNavImg from "./assets/images/polygon-nav.png";
import ethereumNavImg from "./assets/images/ethereum-nav.png";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
export const IS_DEV = process.env.NODE_ENV !== "production";

interface IContaractAdresses {
  guardiansRegistration: string;
  stakingRewards: string;
  delegations: string;
}

export interface INetwork {
  name: string;
  logo?: string;
  requiredConfirmations?: number;
  nativeCurrency?: { name: string; symbol: string; decimals: number };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
  nav: string;
  color: string;
  contractsRegistry: string;
}


const networks: { [key: string]: INetwork } = {
  "1": {
    name: "Ethereum",
    logo: ethImg,
    nav: ethereumNavImg,
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorerUrls: ["https://etherscan.io"],
    color: "#03FCF5",
    contractsRegistry: "0xD859701C81119aB12A1e62AF6270aD2AE05c7AB3",
  },
  "3": {
    name: "Ropsten",
    logo: ethImg,
    nav: ethereumNavImg,
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorerUrls: ["https://etherscan.io"],
    color: "#03FCF5",
    contractsRegistry: "0x5D7779231a6344edE6178623f31007cF2D16DFd7",
  },
  "137": {
    color: "#844FDA",
    name: "Polygon",
    logo: polygonImg,
    nav: polygonNavImg,
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://www.polygonscan.com"],
    contractsRegistry: "0x35eA0D75b2a3aB06393749B4651DfAD1Ffd49A77",
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
  privacyPolicyUrl:
    "https://www.orbs.com/assets/docs/guardians-registration/V3-Orbs-Guardian-Website-privacy-policy.pdf",
  termsOfUseUrl:
    "https://www.orbs.com/assets/docs/guardians-registration/guardian-registration-terms-of-use.pdf",
  networks,
};
export default configs;
