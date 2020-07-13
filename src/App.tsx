import React, { useMemo } from "react";
import "./App.css";
import { ContentContainer } from "./components/structure/ContentContainer";
import { Route, Switch } from "react-router-dom";
import { useCryptoWalletIntegrationStore } from "./store/storeHooks";
import { observer } from "mobx-react";
import { NoEthereumProviderSection } from "./pages/NoEthereumProviderSection";
import { GuardiansRegisterOrEditPage } from "./pages/GuardiandRegisterOrEdit/GuardianRegisterOrEditPage";
import { Background } from "./components/structure/Background";
import { Header } from "./components/structure/Header";

const App = observer(() => {
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

  const isConnected = cryptoWalletIntegrationStore.isConnectedToWallet;

  const appContent = useMemo(() => {
    if (!isConnected) {
      return (
        <NoEthereumProviderSection
          walletConnectionPhase={"connect"}
          actionFunction={() => cryptoWalletIntegrationStore.askToConnect()}
        />
      );
    } else {
      return (
        <Switch>
          <Route path={"/"}>
            <GuardiansRegisterOrEditPage />
          </Route>
        </Switch>
      );
    }
  }, [cryptoWalletIntegrationStore, isConnected]);

  return (
    <main className="App">
      <Background prismVersion={"0.5"} />
      <Header />
      <ContentContainer id={"appContainer"}>{appContent}</ContentContainer>
    </main>
  );
});

export default App;
