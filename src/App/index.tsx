import { ContentContainer } from "../components/structure/ContentContainer";
import { Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";
import { EthereumProviderSection } from "../components/ethereumConnection/EthereumProviderSection";
import { GuardiansRegisterOrEditPage } from "../pages/GuardiandRegisterOrEdit";
import { Header } from "../components/structure/Header";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Page } from "../components/structure/Page";
import { Footer } from "../components/structure/Footer";
import useLogic from "./useLogic";
import TxStatus from "../components/TxStatus";

const useStyles = makeStyles(() => ({
  app: {
    minHeight: `100vh`,
    flex: 1,
    backgroundRepeat: "repeat-y",
    paddingTop: '50px',
   
    backgroundAttachment: "scroll",
    backgroundPosition: "top center",
    paddingBottom: '150px'
  },
}));
const App = observer(() => {
  const classes = useStyles();

  const {
    isConnected,
    cryptoWalletIntegrationStore,
    cryptoWalletConnectionService,
  } = useLogic();

  // TODO : O.L : Change background image to the orbs one.
  return (
    <>
      <Header />
      {/* <TxStatus /> */}
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
              <Route path="/" component={GuardiansRegisterOrEditPage} />
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
