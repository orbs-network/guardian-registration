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

export interface IServices {
  cryptoWalletIntegrationService: ICryptoWalletConnectionService;
  guardiansService: IGuardiansService;
  stakingRewardsService: IStakingRewardsService;
  delegationsService: IDelegationsService;
}

// DEV_NOTE : For simplicity of early stage dev, we assume that we have ethereum provider, if not, we will not initialize the services.
export function buildServices(ethereumProvider: IEthereumProvider, network: INetwork): IServices {
  let web3: Web3;

  if (ethereumProvider) {
    web3 = new Web3(ethereumProvider as any);
  } else {
    web3 = new Web3(
      new Web3.providers.WebsocketProvider(configs.ETHEREUM_PROVIDER_WS)
    );
  }

  


  return {
    cryptoWalletIntegrationService: new CryptoWalletConnectionService(
      ethereumProvider
    ),
    guardiansService: new GuardiansService(
      web3,
      network?.addresses?.guardiansRegistration
    ),
    stakingRewardsService: new StakingRewardsService(
      web3,
      network?.addresses?.stakingRewards
    ),
    delegationsService: new DelegationsService(
      web3,
      network?.addresses?.delegations
    ),
  };
}
