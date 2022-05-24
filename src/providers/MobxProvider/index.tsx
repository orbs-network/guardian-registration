import { Provider } from "mobx-react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import init from "./hepler";

interface Props {
  children: ReactNode;
  chain?: string;
}

function MobxProvider({ children, chain }: Props) {
  const [stores, setStores] = useState<any>(null);
  const [services, setServices] = useState<any>(null);


  const onChain = useCallback(async (chain: string) => {
    const res = await init(chain);
    setServices(res?.services);
    setStores(res?.stores);
  }, []);


  useEffect(() => {
    if (chain) {
      onChain(chain);
    }
  }, [chain, onChain]);


  if (!stores || !services) {
    return null;
  }

  return (
    <Provider {...stores} {...services} chainId={chain}>
      {children}
    </Provider>
  );
}

export default MobxProvider;
