import Web3 from "web3";
import configs, { INetwork } from "../configs";
import {
  ICryptoWalletConnectionService,
  CryptoWalletConnectionService,
  IEthereumProvider,
  IGuardiansService,
  GuardiansService,
  IStakingRewardsService,
  StakingRewardsService,
  IDelegationsService,
  DelegationsService,
} from "@orbs-network/contracts-js";
import ContractRegistry from "../contracts/contract-registry";

export interface IServices {
  cryptoWalletIntegrationService: ICryptoWalletConnectionService;
  guardiansService: IGuardiansService;
  stakingRewardsService: IStakingRewardsService;
  delegationsService: IDelegationsService;
}

// DEV_NOTE : For simplicity of early stage dev, we assume that we have ethereum provider, if not, we will not initialize the services.
export async function buildServices(
  ethereumProvider: IEthereumProvider,
  network: INetwork
): Promise<IServices> {
  let web3: Web3;

  if (ethereumProvider) {
    web3 = new Web3(ethereumProvider as any);
  } else {
    web3 = new Web3(
      new Web3.providers.WebsocketProvider(configs.ETHEREUM_PROVIDER_WS)
    );
  }

  const getContracts = () => {
    const contractRegistry = new ContractRegistry(
      web3,
      network.contractsRegistry
    );
    return contractRegistry.getContracts();
  };

  const contracts = await getContracts();
  
  return {
    cryptoWalletIntegrationService: new CryptoWalletConnectionService(
      ethereumProvider
    ),
    guardiansService: new GuardiansService(
      web3,
      contracts.guardiansRegistration
    ),
    stakingRewardsService: new StakingRewardsService(
      web3,
      contracts.stakingRewards
    ),
    delegationsService: new DelegationsService(
      web3,
      contracts.delegations
    ),
  };
}
