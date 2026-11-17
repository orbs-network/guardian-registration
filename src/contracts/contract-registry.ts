import Web3 from "web3";
// @ts-ignore - JSON import
import ContractRegistryAbi from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/IContractRegistry.json";

const CONTRACT_NAMES = [
  "guardiansRegistration",
  "stakingRewards",
  "delegations",
] as const;

export interface IContractAddresses {
  guardiansRegistration: string;
  stakingRewards: string;
  delegations: string;
}

class ContractRegistry {
  private contract: any;

  constructor(web3: Web3, registryAddress: string) {
    this.contract = new web3.eth.Contract(
      ContractRegistryAbi.abi as any,
      registryAddress
    );
  }

  async getContract(contractName: string): Promise<string> {
    return this.contract.methods.getContract(contractName).call();
  }

  async getContracts(): Promise<IContractAddresses> {
    const [guardiansRegistration, stakingRewards, delegations] =
      await Promise.all(
        CONTRACT_NAMES.map((name) => this.getContract(name))
      );
    return {
      guardiansRegistration,
      stakingRewards,
      delegations,
    };
  }
}

export default ContractRegistry;
