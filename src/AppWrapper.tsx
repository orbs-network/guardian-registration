import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { configureMobx, getStores } from "./store/storesInitialization";
import { buildServices } from "./services/Services";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { AppStyles, baseTheme } from "./theme/Theme";
import { SnackbarProvider } from "notistack";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { ENGLISH_TEXTS } from "./translations/translations.en";

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
    resources: {
      en: {
        translation: ENGLISH_TEXTS,
      },
    },
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
