import configs, { REQUIRED_CHAINS } from "../configs"

const getChainName = (chain: string | number) => {
    
    const chainConfig = configs.networks[chain]
    return chainConfig ? chainConfig.name : ''
}



const isOptionalChain = (chainId?: number) => {
  if(!chainId){
    return false
  }
  
  return !REQUIRED_CHAINS.includes(chainId);
};



const getRequiredChainName = (chains: number[]) => {
  if (!chains.length) {
    return false;
  }

  const chain =  chains.find((c) => REQUIRED_CHAINS.includes(c));
  if(!chain){
    return ''
  }
  return getChainName(chain)
};

const getOptionalChainName = (chains: number[]) => {
  if (!chains.length) {
    return false;
  }
  const chain =  chains.find((c) => !REQUIRED_CHAINS.includes(c));
  if(!chain){
    return ''
  }
  return getChainName(chain)
};



const getChainNames = (chains: number[]) => {
    let names: string[] = [];
    for (const chain of chains) {
      const name = getChainName(chain.toString());
      names.push(name);
    }
    return names
  };

export {getChainName, getChainNames, isOptionalChain,getOptionalChainName, getRequiredChainName }