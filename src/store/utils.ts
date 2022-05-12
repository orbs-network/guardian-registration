import { GuardiansService } from "@orbs-network/contracts-js";
import Web3 from "web3";
import configs from "../configs";
import ContractRegistry from "../contracts/contract-registry";
import { getSupportedNetworks } from "../utils/web3";

const isRegistered = async (web3: Web3, chain: number, account: string) => {
  const network = configs.networks[chain];

  const { contractsRegistry } = network;
  try {
    const registryContract = new ContractRegistry(web3, contractsRegistry);
    const contractAddress = await registryContract.getContract(
      "guardiansRegistration"
    );
    const contract = new GuardiansService(web3, contractAddress);
    return {
      chain,
      isRegistered: await contract.isRegisteredGuardian(account),
    };
  } catch (error) {}
};

const checkIfRegisteredByChain = async (account?: string) => {
  if (!account) {
    return;
  }
  const chains = getSupportedNetworks();
  const promises: any = [];
  chains.forEach(async (chain: number) => {
    const config = configs.networks[chain];
    if (!config) {
      return;
    }
    const rpcUrls = config.rpcUrls;
    if (!rpcUrls) {
      return;
    }
    const rpc = rpcUrls[0];
    const provider = new Web3.providers.HttpProvider(rpc);
    const web3 = new Web3(provider);
    promises.push(isRegistered(web3, chain, account));
  });
  return Promise.all(promises);
};

export { checkIfRegisteredByChain };
