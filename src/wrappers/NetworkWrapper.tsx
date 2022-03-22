import { SnackbarProvider } from "notistack";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router";
import WrongNetwork from "../components/WrongNetwork";
import { NETWORK_QUERY_PARAM } from "../constants";
import { useNetwork } from "../hooks/useWeb3";
import MobxProvider from "../providers/MobxProvider";
import { forceChainChange, isWrongNetwork } from "../utils/web3";

interface Props {
  children: ReactNode;
}

const availableChains =
  process.env.REACT_APP_TARGET_NETWORKS &&
  JSON.parse(process.env.REACT_APP_TARGET_NETWORKS);

const addEventsToEthereumProvider = () => {
  const ethereumProvider = (window as any).ethereum;
  ethereumProvider.on("networkChanged", function () {
    window.location.reload();
  });
  ethereumProvider.on("accountsChanged", function () {
    window.location.reload();
  });
};

function NetworkWrapper({ children }: Props) {
  const [forcedChain, setForcedChain] = useState<string | null>(null);
  const location = useLocation();
  useEffect(() => {
    addEventsToEthereumProvider();
  }, []);
  const chain = useNetwork();

  const detectForcedNetwork = () => {
    const res = new URLSearchParams(location.search).get(NETWORK_QUERY_PARAM);
    setForcedChain(res);
  };

  useEffect(() => {
    detectForcedNetwork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chain) {
    return null;
  }
  if (
    isWrongNetwork(chain, availableChains) ||
    forceChainChange(forcedChain, chain)
  ) {
    return (
      <WrongNetwork
        selectedChain={Number(chain)}
        availableChains={availableChains}
      />
    );
  }
  
  return (
    <MobxProvider chain={chain}>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </MobxProvider>
  );
}

export default NetworkWrapper;
