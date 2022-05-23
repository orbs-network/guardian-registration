import configs from "../configs"

const getChainName = (chain: string) => {
    console.log(chain);
    
    const chainConfig = configs.networks[chain]
    return chainConfig ? chainConfig.name : 'Ether'
}

export {getChainName}