import React from "react";
import "./App.css";
import { ContentContainer } from "./components/structure/ContentContainer";
import { Route, Switch } from "react-router-dom";
import { useCryptoWalletIntegrationStore } from "./store/storeHooks";
import { observer } from "mobx-react";
import { NoEthereumProviderSection } from "./pages/NoEthereumProviderSection";
import { GuardiansRegisterOrEditPage } from "./pages/GuardiandRegisterOrEdit/GuardianRegisterOrEditPage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const App = observer(() => {
  const classes = useStyles();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

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
      <ContentContainer
        id={"appContainer"}
        className={classes.centeredContainer}
      >
        <Switch>
          <Route path={"/"}>
            <GuardiansRegisterOrEditPage />
          </Route>
        </Switch>
      </ContentContainer>
    </main>
  );
});

export default App;
