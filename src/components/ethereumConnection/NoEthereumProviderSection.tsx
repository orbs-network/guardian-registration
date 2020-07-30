import React, { useMemo, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Typography,
  useTheme,
  Checkbox,
  MuiThemeProvider,
} from "@material-ui/core";
import {
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useBoolean } from "react-hanger";
import { renderToString } from "react-dom/server";
import { InTextLink } from "../InTextLink";
import configs from "../../configs";
import { baseTheme } from "../../theme/Theme";
import { LegalTicker } from "./LegalTicker";

type TWalletConnectionPhase = "install" | "connect";

interface IProps {
  walletConnectionPhase: TWalletConnectionPhase;
  actionFunction: () => void;
  pressedOnInstall?: boolean;
}

const useStyles = makeStyles((theme) => ({
  noEthereumProviderSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    // justifyContent: "space-between",
    padding: "2em",
    backgroundColor: "rgba(0,0,0, 0.2)",
    borderRadius: "5%",
    // width: "clamp(20%, 40em, 100%)",
    width: "fit-content",
    maxWidth: "90%",
    boxSizing: "border-box",
    // height: "clamp(max(25%, 200px), 8em, 50%)",
  },
}));

export const NoEthereumProviderSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { walletConnectionPhase, actionFunction, pressedOnInstall } = props;

  const [tickerValue, setTickerValue] = useState(false);

  // Display flags
  const {
    shouldDisplayLegalTicker,
    isInstall,
    buttonIsEnabled,
  } = useMemo(() => {
    const shouldDisplayLegalTicker = walletConnectionPhase === "connect";

    return {
      shouldDisplayLegalTicker,
      buttonIsEnabled: !shouldDisplayLegalTicker || tickerValue,
      isInstall: walletConnectionPhase === "install",
    };
  }, [tickerValue, walletConnectionPhase]);

  // Display texts
  const { titleText, buttonText, subTitleText } = useMemo(() => {
    return {
      titleText: isInstall ? "No Ethereum provider detected" : "Please connect",
      subTitleText: isInstall
        ? "you should install MetaMask and refresh the page"
        : "To begin, connect your wallet",
      buttonText: walletConnectionPhase === "install" ? "Install" : "Connect",
    };
  }, [isInstall, walletConnectionPhase]);

  return (
    <div className={classes.noEthereumProviderSection}>
      <Typography style={{ marginBottom: "0.5rem" }} variant={"h4"}>
        {titleText}
      </Typography>
      <Typography style={{ marginBottom: "1rem" }}>{subTitleText}</Typography>
      <Button
        variant={"outlined"}
        onClick={actionFunction}
        disabled={!buttonIsEnabled}
      >
        {buttonText}
      </Button>

      {/* Legal Ticker */}
      {shouldDisplayLegalTicker && (
        <LegalTicker value={tickerValue} onValueChange={setTickerValue} />
      )}
    </div>
  );
});
