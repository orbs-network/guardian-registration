import React, { useEffect, useMemo } from "react";
import { ContentContainer } from "./components/structure/ContentContainer";
import { Route, Switch, useLocation } from "react-router-dom";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "./store/storeHooks";
import { observer } from "mobx-react";
import { EthereumProviderSection } from "./components/ethereumConnection/EthereumProviderSection";
import { GuardiansRegisterOrEditPage } from "./pages/GuardiandRegisterOrEdit/GuardianRegisterOrEditPage";
import { Background } from "./components/structure/Background";
import { Header } from "./components/structure/Header";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Page } from "./components/structure/Page";
import { useSnackbar } from "notistack";
import { Footer } from "./components/structure/Footer";
import { useCryptoWalletConnectionService } from "./services/servicesHooks";
import { HEADER_HEIGHT_REM } from "./theme/Theme";
import { useModalsTranslations } from "./translations/translationsHooks";
import i18n from "i18next";

const useStyles = makeStyles((theme) => ({
  app: {
    // height: "100%",
    // minHeight: `calc(100% - ${HEADER_HEIGHT_REM}rem)`,
    minHeight: `100%`,
    flex: 1,
    backgroundColor: theme.palette.background.default,
    // backgroundColor: "#06142e",
    // backgroundRepeat: "repeat-y",
    // backgroundImage:
    //   "url(https://www.orbs.com/wp-content/uploads/2019/02/technology-background1.png)",
    backgroundAttachment: "scroll",
    backgroundPosition: "top center",
  },
}));

function getForcedLanguage(pathname: string) {
  const langMatch = pathname.match(/\/(en|ko|jp)\/?/);

  return langMatch ? langMatch[1] : "";
}

function updateLanguage(lang: string) {
  console.log("Updating with " + lang);
  i18n.changeLanguage(lang);
}

const App = observer(() => {
  const classes = useStyles();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
  const cryptoWalletConnectionService = useCryptoWalletConnectionService();
  const orbsAccountStore = useOrbsAccountStore();
  const { enqueueSnackbar } = useSnackbar();

  const isConnected = cryptoWalletIntegrationStore.isConnectedToWallet;
  const modalsTranslations = useModalsTranslations();

  const location = useLocation();
  const forcedLang = getForcedLanguage(location.pathname);

  // TODO : FUTURE : O.L : Change this to am ore elegant solution
  // Update language by url
  useEffect(() => {
    // debugger;
    let langBaseName = "";
    if (forcedLang) {
      langBaseName = `/${forcedLang}/`;
      if (i18n.language !== forcedLang) {
        updateLanguage(forcedLang);
      }
    } else {
      const navigatorLang = navigator.language.split("-")[0];
      if (i18n.languages.indexOf(navigatorLang) > -1) {
        if (i18n.language !== navigatorLang) {
          updateLanguage(navigatorLang);
        }
      }
    }
  }, [forcedLang]);

  const appContent = useMemo(() => {
    if (!isConnected) {
      return (
        <Page>
          <EthereumProviderSection
            walletConnectionPhase={"connect"}
            actionFunction={() => cryptoWalletIntegrationStore.askToConnect()}
            isMetaMaskProvider={
              cryptoWalletConnectionService.isMetamaskInstalled
            }
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
  }, [
    cryptoWalletConnectionService.isMetamaskInstalled,
    cryptoWalletIntegrationStore,
    isConnected,
  ]);

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
        {/*<Background />*/}
        <ContentContainer id={"appContainer"}>{appContent}</ContentContainer>
        <CssBaseline />
      </main>
      <Footer version={"0.1"} />
    </>
  );
});

export default App;
