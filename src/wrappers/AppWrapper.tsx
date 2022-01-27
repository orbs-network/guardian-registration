import { NoEthereumProviderPage } from "../pages/NoEthereumProviderPage";
import useLanguage from "../hooks/useLanguage";
import NetworkWrapper from "./NetworkWrapper";
import { makeStyles } from "@material-ui/styles";
import App from "../App";


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
    return <NoEthereumProviderPage />;
  }

  return (
    <main className={classes.app}>
      <NetworkWrapper>
        <App />
      </NetworkWrapper>
    </main>
  );
};
