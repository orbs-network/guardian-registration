import React, { useMemo } from "react";
import { ContentContainer } from "./components/structure/ContentContainer";
import { Route, Switch } from "react-router-dom";
import { useCryptoWalletIntegrationStore } from "./store/storeHooks";
import { observer } from "mobx-react";
import { NoEthereumProviderSection } from "./pages/NoEthereumProviderSection";
import { GuardiansRegisterOrEditPage } from "./pages/GuardiandRegisterOrEdit/GuardianRegisterOrEditPage";
import { Background } from "./components/structure/Background";
import { Header } from "./components/structure/Header";
import { CssBaseline } from "@material-ui/core";

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
    <main className="App" style={{ height: "100%" }}>
      <Background prismVersion={"0.5"} />
      <Header />
      <ContentContainer id={"appContainer"}>{appContent}</ContentContainer>
      <CssBaseline />
    </main>
  );
});

export default App;
