import React from "react";
import { Button, Typography, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    justifyContent: "space-around",
    padding: "0.5em",
    backgroundColor: "rgba(0,0,0, 0.2)",
    borderRadius: "5%",
    width: "clamp(20%, 40em, 100%)",
    height: "clamp(max(25%, 200px), 8em, 50%)",
  },
}));

export const NoEthereumProviderSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { walletConnectionPhase, actionFunction, pressedOnInstall } = props;

  const shouldDisplayLegalTicker = walletConnectionPhase === "connect";

  const isInstall = walletConnectionPhase === "install";

  const titleText = isInstall
    ? "No Ethereum provider detected"
    : "Please connect";
  const subTitleText = isInstall
    ? "you should install MetaMask and refresh the page"
    : "To begin, connect your wallet";
  const buttonText =
    walletConnectionPhase === "install" ? "Install" : "Connect";

  return (
    <div className={classes.noEthereumProviderSection}>
      <Typography variant={"h4"}>{titleText}</Typography>
      <Typography>{subTitleText}</Typography>
      <Button variant={"outlined"} onClick={actionFunction}>
        {buttonText}
      </Button>
    </div>
  );
});
