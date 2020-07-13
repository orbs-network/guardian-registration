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
import { makeStyles } from "@material-ui/core/styles";
import { Page } from "./components/structure/Page";

const useStyles = makeStyles(() => ({
  app: {
    height: "100%",
  },
}));

const App = observer(() => {
  const classes = useStyles();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

  const isConnected = cryptoWalletIntegrationStore.isConnectedToWallet;

  const appContent = useMemo(() => {
    if (!isConnected) {
      return (
        <Page>
          <NoEthereumProviderSection
            walletConnectionPhase={"connect"}
            actionFunction={() => cryptoWalletIntegrationStore.askToConnect()}
          />
        </Page>
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
    <>
      <Header />
      <main className={classes.app}>
        <Background prismVersion={"0.5"} />
        <ContentContainer id={"appContainer"}>{appContent}</ContentContainer>
        <CssBaseline />
      </main>
    </>
  );
});

export default App;
