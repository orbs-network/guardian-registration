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
import { InstallPhaseExtraDetails } from "./InstallPhaseExtraDetails";
import { DetailsList } from "../detailsList/Detailslist";
import { GUARDIAN_ADDRESS_DETAILS_TEXTS } from "../../constants/explainingTexts";
import { BoldText } from "../texts/boldText";
import { CountryLegalTicker } from "./CountryLegalTicker";
import ActionButton from "@bit/orbs-network.commons.action-button";
import { useAccountConnectionSectionTranslations } from "../../translations/translationsHooks";
type TWalletConnectionPhase = "install" | "connect";
const INSTALL_PHASE: TWalletConnectionPhase = "install";
const CONNECT_PHASE: TWalletConnectionPhase = "connect";

interface IProps {
  walletConnectionPhase: TWalletConnectionPhase;
  actionFunction: () => void;
  pressedOnInstall?: boolean;
  isMetaMaskProvider?: boolean;
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
  const {
    walletConnectionPhase,
    actionFunction,
    pressedOnInstall,
    isMetaMaskProvider,
  } = props;
  const accountConnectionSectionTranslations = useAccountConnectionSectionTranslations();

  const [legalTickerValue, setLegalTickerValue] = useState(false);
  const [countryTickerValue, setCountryTickerValue] = useState(false);

  const isConnectPhase = walletConnectionPhase === "connect";

  const allTickersChecked = legalTickerValue && countryTickerValue;

  // Display flags
  const {
    shouldDisplayLegalTicker,
    isInstall,
    buttonIsEnabled,
    hasExtraDetailsSection,
  } = useMemo(() => {
    const shouldDisplayLegalTicker = isConnectPhase;

    return {
      shouldDisplayLegalTicker,
      hasExtraDetailsSection: isConnectPhase,
      buttonIsEnabled: !shouldDisplayLegalTicker || allTickersChecked,
      isInstall: walletConnectionPhase === INSTALL_PHASE,
    };
  }, [isConnectPhase, allTickersChecked, walletConnectionPhase]);

  // Display texts
  const { titleText, buttonText, subTitleText } = useMemo(() => {
    // const ethereumProviderName = isMetaMaskProvider ? "MetaMask" : "Account";

    return {
      titleText: isInstall
        ? "No Ethereum provider detected"
        : `Account connection required`,
      subTitleText: isInstall ? (
        "you should install MetaMask and refresh the page"
      ) : (
        <>
          To begin, please connect with your{" "}
          <BoldText>Guardian address.</BoldText>
        </>
      ),
      buttonText:
        walletConnectionPhase === INSTALL_PHASE ? "Install" : "Connect",
    };
  }, [isInstall, walletConnectionPhase]);

  return (
    <div className={classes.noEthereumProviderSection}>
      <Typography style={{ marginBottom: "0.5rem" }} variant={"h4"}>
        {titleText}
      </Typography>
      <Typography style={{ marginBottom: "1rem" }}>{subTitleText}</Typography>

      {/*{hasExtraDetailsSection && <InstallPhaseExtraDetails />}*/}
      {hasExtraDetailsSection && (
        <DetailsList
          conceptName={"Guardian Address"}
          details={GUARDIAN_ADDRESS_DETAILS_TEXTS}
        />
      )}

      <ActionButton
        fullWidth={false}
        onClick={actionFunction}
        disabled={!buttonIsEnabled}
      >
        {buttonText}
      </ActionButton>

      {/* Legal Tickers */}
      <div
        style={{
          width: "min(30rem, 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {shouldDisplayLegalTicker && (
          <LegalTicker
            value={legalTickerValue}
            onValueChange={setLegalTickerValue}
          />
        )}

        {shouldDisplayLegalTicker && (
          <CountryLegalTicker
            value={countryTickerValue}
            onValueChange={setCountryTickerValue}
          />
        )}
      </div>
    </div>
  );
});
