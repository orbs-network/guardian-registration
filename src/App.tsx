import React, { useEffect, useMemo } from "react";
import { ContentContainer } from "./components/structure/ContentContainer";
import { Route, Switch } from "react-router-dom";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "./store/storeHooks";
import { observer } from "mobx-react";
import { NoEthereumProviderSection } from "./pages/NoEthereumProviderSection";
import { GuardiansRegisterOrEditPage } from "./pages/GuardiandRegisterOrEdit/GuardianRegisterOrEditPage";
import { Background } from "./components/structure/Background";
import { Header } from "./components/structure/Header";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Page } from "./components/structure/Page";
import { useSnackbar } from "notistack";
import { Footer } from "./components/structure/Footer";

const useStyles = makeStyles(() => ({
  app: {
    height: "100%",
  },
}));

const App = observer(() => {
  const classes = useStyles();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
  const orbsAccountStore = useOrbsAccountStore();
  const { enqueueSnackbar } = useSnackbar();

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

  // Alert about TX error if happened
  const txHadError = orbsAccountStore.txHadError;
  useEffect(() => {
    if (txHadError) {
      enqueueSnackbar("Error in Transaction", { variant: "error" });
    }
  }, [enqueueSnackbar, txHadError]);

  // Alert about TX cancelation  if happened
  const txCanceled = orbsAccountStore.txCanceled;
  useEffect(() => {
    if (txCanceled) {
      enqueueSnackbar("Transaction canceled", { variant: "info" });
    }
  }, [enqueueSnackbar, txCanceled]);

  return (
    <>
      <Header />
      <main className={classes.app}>
        <Background />
        <ContentContainer id={"appContainer"}>{appContent}</ContentContainer>
        <CssBaseline />
      </main>
      <Footer version={"0.1"} />
    </>
  );
});

export default App;
