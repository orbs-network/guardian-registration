import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Typography,
  useTheme,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useBoolean } from "react-hanger";
import { renderToString } from "react-dom/server";
import { InTextLink } from "../components/InTextLink";

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

  const tickerValue = useBoolean(false);

  const shouldDisplayLegalTicker = walletConnectionPhase === "connect";
  const buttonIsEnabled = !shouldDisplayLegalTicker || tickerValue.value;

  const isInstall = walletConnectionPhase === "install";

  const titleText = isInstall
    ? "No Ethereum provider detected"
    : "Please connect";
  const subTitleText = isInstall
    ? "you should install MetaMask and refresh the page"
    : "To begin, connect your wallet";
  const buttonText =
    walletConnectionPhase === "install" ? "Install" : "Connect";

  const innerHtmlForLegalAgreement = renderToString(
    <Typography>
      I agree to the <InTextLink text={"Terms of Use"} /> and{" "}
      <InTextLink href="" text={"Privacy Policy"} />
    </Typography>
  );

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
      {shouldDisplayLegalTicker && (
        <FormControlLabel
          style={{
            marginTop: "0.5rem",
          }}
          control={
            <Checkbox
              checked={tickerValue.value}
              onChange={(e) => tickerValue.setValue(e.target.checked)}
              name={"legalTicker"}
            />
          }
          label={
            <Typography
              onClick={(e) => e.preventDefault()}
              dangerouslySetInnerHTML={{ __html: innerHtmlForLegalAgreement }}
            />
          }
        />
      )}
    </div>
  );
});
