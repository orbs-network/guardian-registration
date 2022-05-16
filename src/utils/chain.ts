import configs from "../configs"

const getChainName = (chain: string) => {
    console.log(chain);
    
    const chainConfig = configs.networks[chain]
    return chainConfig ? chainConfig.name : 'Ether'
}


const getChainNames = (chains: number[]) => {
    let names: string[] = [];
    for (const chain of chains) {
      const name = getChainName(chain.toString());
      names.push(name);
    }
    return names
  };

export {getChainName, getChainNames}