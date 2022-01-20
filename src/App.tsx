import React, {  useEffect } from "react";
import {  ContentContainer } from "./components/structure/ContentContainer";
import {  Route,  Switch } from "react-router-dom";
import {
   useCryptoWalletIntegrationStore,
   useOrbsAccountStore,
} from "./store/storeHooks";
import {  observer } from "mobx-react";
import {  EthereumProviderSection } from "./components/ethereumConnection/EthereumProviderSection";
import {  GuardiansRegisterOrEditPage } from "./pages/GuardiandRegisterOrEdit/GuardianRegisterOrEditPage";
import {  Background } from "./components/structure/Background";
import {  Header } from "./components/structure/Header";
import {  CssBaseline } from "@material-ui/core";
import {  makeStyles } from "@material-ui/core/styles";
import {  Page } from "./components/structure/Page";
import {  useSnackbar } from "notistack";
import {  Footer } from "./components/structure/Footer";
import {  useCryptoWalletConnectionService } from "./services/servicesHooks";
import {  useModalsTranslations } from "./translations/translationsHooks";

const useStyles = makeStyles(() => ({
  app: {
    // height: "100%",
    // minHeight: `calc(100% - ${HEADER_HEIGHT_REM}rem)`,
    minHeight: `100vh`,
    flex: 1,
    backgroundRepeat: "repeat-y",
    backgroundImage:
      "url(https://www.orbs.com/wp-content/uploads/2019/02/technology-background1.png)",
    backgroundAttachment: "scroll",
    backgroundPosition: "top center",
  },
}));

const App = observer(() => {
  const classes = useStyles();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
  const cryptoWalletConnectionService = useCryptoWalletConnectionService();
  const orbsAccountStore = useOrbsAccountStore();
  const { enqueueSnackbar } = useSnackbar();

  const isConnected = cryptoWalletIntegrationStore.isConnectedToWallet;
  const modalsTranslations = useModalsTranslations();


  // Alert about TX error if happened
  const txHadError = orbsAccountStore.txHadError;
  useEffect(() => {
    if (txHadError) {
      enqueueSnackbar("Error in Transaction", {
        variant: "error",
        autoHideDuration: 7000,
      });
    }
  }, [enqueueSnackbar, txHadError]);

  // Alert about TX cancelation  if happened
  const txCanceled = orbsAccountStore.txCanceled;
  useEffect(() => {
    if (txCanceled) {
      enqueueSnackbar(modalsTranslations("message_txCanceled"), {
        variant: "info",
      });
    }
  }, [enqueueSnackbar, modalsTranslations, txCanceled]);

  // TODO : O.L : Change background image to the orbs one.
  return (
    <>
      <Header />
      <main className={classes.app}>
        <ContentContainer id={"appContainer"}>
          {!isConnected ? (
            <Page>
              <EthereumProviderSection
                walletConnectionPhase={"connect"}
                actionFunction={() =>
                  cryptoWalletIntegrationStore.askToConnect()
                }
                isMetaMaskProvider={
                  cryptoWalletConnectionService.isMetamaskInstalled
                }
              />
            </Page>
          ) : (
            <Switch>
              <Route path='/' component = {GuardiansRegisterOrEditPage} />
            </Switch>
          )}
        </ContentContainer>
        <CssBaseline />
      </main>
      <Footer version={"0.1"} />
    </>
  );
});

export default App;
