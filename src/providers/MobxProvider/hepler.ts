import configs from "../../configs";
import {  buildServices } from "../../services/Services";
import {
   configureMobx,
   getStores,
} from "../../store/storesInitialization";

const initApp =  (chain?: string) => {
  if(!chain){
    return 
  }
  const ethereumProvider = (window as any).ethereum;
  
  configureMobx();
  
  const services = buildServices(ethereumProvider, configs.networks[chain]);
  const stores = getStores(
    services.cryptoWalletIntegrationService,
    services.guardiansService,
    services.stakingRewardsService,
    services.delegationsService
  );

  return {stores, services};
};

export default initApp;
