import { NoEthereumProviderPage } from "../pages/NoEthereumProviderPage";
import useLanguage from "../hooks/useLanguage";
import NetworkWrapper from "./NetworkWrapper";
import { makeStyles } from "@material-ui/styles";
import App from "../App";
import { getTheme } from "../theme/Theme";
import { ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  app: {
    minHeight: `100%`,
    flex: 1,
    background: "#06142e",
  },
}));

export const AppWrapper = () => {
  useLanguage();
  const classes = useStyles();

  if (!(window as any).ethereum) {
    return (
      <ThemeProvider theme={getTheme('1')}>
        <NoEthereumProviderPage />
      </ThemeProvider>
    );
  }

  return (
    <main className={classes.app}>
      <NetworkWrapper>
        <App />
      </NetworkWrapper>
    </main>
  );
};
