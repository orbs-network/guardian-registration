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
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid black",
    width: "fit-content",
    textAlign: "center",
    padding: "2em",
  },
}));

export const NoEthereumProviderSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { walletConnectionPhase, actionFunction, pressedOnInstall } = props;

  const shouldDisplayLegalTicker = walletConnectionPhase === "connect";

  const isInstall = walletConnectionPhase === "install";

  const titleText = isInstall
    ? "No Ethereum provider detected"
    : "Please connect";
  const subTitleText = isInstall
    ? "you should install MetaMask and refresh the page"
    : 'Press "Connect" and approve';
  const buttonText =
    walletConnectionPhase === "install" ? "Install" : "Connect";

  return (
    <div className={classes.paper} style={{ backgroundColor: "darkGray" }}>
      <Typography variant={"h4"}>{titleText}</Typography>
      <Typography>{subTitleText}</Typography>
      <Button onClick={actionFunction}>{buttonText}</Button>
    </div>
  );
});
