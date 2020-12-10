import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { configureMobx, getStores } from "./store/storesInitialization";
import { buildServices } from "./services/Services";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { AppStyles, baseTheme } from "./theme/Theme";
import { SnackbarProvider } from "notistack";
import i18n from "i18next";
import {
  useTranslation,
  initReactI18next,
  I18nextProvider,
} from "react-i18next";
import { ENGLISH_TEXTS } from "./translations/translations.en";
import { resources } from "./translations/translations";

interface IProps {
  appComponent: React.ReactNode;
}

configureMobx();

const ethereumProvider = (window as any).ethereum;
const services = buildServices(ethereumProvider);
const stores = getStores(
  services.cryptoWalletIntegrationService,
  services.guardiansService,
  services.stakingRewardsService,
  services.delegationsService
);

// DEV_NOTE : O.L : This will work until we will add other languages handling.
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export const AppWrapper = React.memo<IProps>((props) => {
  console.log("Wrapper render");
  const { appComponent } = props;
  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <Provider {...stores} {...services}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={baseTheme}>
              <SnackbarProvider maxSnack={3}>{appComponent}</SnackbarProvider>
            </ThemeProvider>
          </StylesProvider>
        </Provider>
      </I18nextProvider>
    </Router>
  );
});
