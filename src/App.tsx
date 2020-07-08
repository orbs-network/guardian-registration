import React from "react";
import "./App.css";
import { ContentContainer } from "./components/structure/ContentContainer";
import { Route, Switch } from "react-router-dom";
import { useCryptoWalletIntegrationStore } from "./store/storeHooks";
import { observer } from "mobx-react";
import { NoEthereumProviderSection } from "./pages/NoEthereumProviderSection";

const App = observer(() => {
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

  console.log(cryptoWalletIntegrationStore.isConnectedToWallet);

  if (!cryptoWalletIntegrationStore.isConnectedToWallet) {
    return (
      <main className="App">
        <ContentContainer id={"appContainer"}>
          <NoEthereumProviderSection
            walletConnectionPhase={"connect"}
            actionFunction={() => cryptoWalletIntegrationStore.askToConnect()}
          />
        </ContentContainer>
      </main>
    );
  }

  return (
    <main className="App">
      <ContentContainer id={"appContainer"}>
        <Switch>
          <Route path={"/"}>
            <div>Hello</div>
          </Route>
        </Switch>
      </ContentContainer>
    </main>
  );
});

export default App;
