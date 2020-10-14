import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { configureMobx, getStores } from "./store/storesInitialization";
import { buildServices } from "./services/Services";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { AppStyles, baseTheme } from "./theme/Theme";
import { SnackbarProvider } from "notistack";

interface IProps {
  appComponent: React.ReactNode;
}

configureMobx();

const ethereumProvider = (window as any).ethereum;
const services = buildServices(ethereumProvider);
const stores = getStores(
  services.cryptoWalletIntegrationService,
  services.guardiansService,
  services.stakingRewardsService
);

export const AppWrapper = React.memo<IProps>((props) => {
  console.log("Wrapper render");
  const { appComponent } = props;
  return (
    <Router>
      <Provider {...stores} {...services}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={baseTheme}>
            <SnackbarProvider maxSnack={3}>{appComponent}</SnackbarProvider>
          </ThemeProvider>
        </StylesProvider>
      </Provider>
    </Router>
  );
});
