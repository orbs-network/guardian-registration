import {  Provider } from "mobx-react";
import  { ReactNode,  useMemo } from "react";
import init from "./hepler";

interface Props {
  children: ReactNode;
  chain?: string;
}

function MobxProvider({children, chain}: Props) {
  const res = useMemo(() => init(chain), [chain]);

  if(!chain || !res){
    return null
  }
  
  const { services, stores } = res;

  return <Provider {...stores} {...services} chainId={chain}>{children}</Provider>;
}

export default MobxProvider;
