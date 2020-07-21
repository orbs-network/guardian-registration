import { IEthereumProvider } from "./cryptoWalletConnectionService/IEthereumProvider";
import { CryptoWalletConnectionService } from "./cryptoWalletConnectionService/CryptoWalletConnectionService";
import { ICryptoWalletConnectionService } from "./cryptoWalletConnectionService/ICryptoWalletConnectionService";
import {
  GuardiansService,
  IGuardiansService,
  IOrbsClientService,
  OrbsClientService,
} from "orbs-pos-data";
import Web3 from "web3";
import configs from "../configs";
import { BuildOrbsClient } from "./OrbsClientFactory";
import { IGuardiansV2Service } from "./guardiansV2Service/IGuardiansV2Service";
import { GuardiansV2Service } from "./guardiansV2Service/GuardiansV2Service";

export interface IServices {
  cryptoWalletIntegrationService: ICryptoWalletConnectionService;
  guardiansV2Service: IGuardiansV2Service;
  guardiansService: IGuardiansService;
}

// DEV_NOTE : For simplicity of early stage dev, we assume that we have ethereum provider, if not, we will not initialize the services.
export function buildServices(ethereumProvider: IEthereumProvider): IServices {
  let web3: Web3;

  const orbsClient = BuildOrbsClient();
  const orbsClientService: IOrbsClientService = new OrbsClientService(
    orbsClient
  );

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
    guardiansV2Service: new GuardiansV2Service(
      web3,
      configs.v2contractsAddressesOverride.guardiansRegistration
    ),
    guardiansService: new GuardiansService(web3, orbsClientService),
  };
}
