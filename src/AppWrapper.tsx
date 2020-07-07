import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import App from "./App";
import { configureMobx, getStores } from "./store/storesInitialization";
import { buildServices } from "./services/Services";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { AppStyles, baseTheme } from "./theme/Theme";
import { CssBaseline } from "@material-ui/core";
interface IProps {}

configureMobx();

const ethereumProvider = (window as any).ethereum;
const services = buildServices(ethereumProvider);
const stores = getStores(
  services.cryptoWalletIntegrationService,
  services.guardiansService
);

export const AppWrapper = React.memo<IProps>((props) => {
  return (
    <Router>
      <Provider {...stores} {...services}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={baseTheme}>
            <App />
            <CssBaseline />
          </ThemeProvider>
        </StylesProvider>
      </Provider>
    </Router>
  );
});
