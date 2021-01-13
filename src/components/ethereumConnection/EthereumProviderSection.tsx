import React, { useMemo, useState } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LegalTicker } from "./LegalTicker";
import { DetailsList } from "../detailsList/Detailslist";
import { BoldText } from "../texts/boldText";
import { CountryLegalTicker } from "./CountryLegalTicker";
import ActionButton from "@bit/orbs-network.commons.action-button";
import {
  useAccountConnectionSectionTranslations,
  useDomainTranslations,
  useNoEthereumProviderSectionTranslations,
} from "../../translations/translationsHooks";
import { useGuardiansAddressDetailsTexts } from "../../pages/GuardianFormDetailsList";
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

export const EthereumProviderSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    walletConnectionPhase,
    actionFunction,
    pressedOnInstall,
    isMetaMaskProvider,
  } = props;
  const accountConnectionSectionTranslations = useAccountConnectionSectionTranslations();
  const noEthereumProviderSectionTranslations = useNoEthereumProviderSectionTranslations();
  const domainTranslations = useDomainTranslations();
  const guardiansAddressDetailsTexts = useGuardiansAddressDetailsTexts();

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
        ? noEthereumProviderSectionTranslations(
            "title_noEthereumProviderDetected"
          )
        : accountConnectionSectionTranslations(
            "title_accountConnectionRequired"
          ),
      subTitleText: isInstall
        ? noEthereumProviderSectionTranslations(
            "subTitle_pleaseInstallMetamaskAndRefresh"
          )
        : // TODO : O.L : Add BoldText for the 'Guardian address concept'
          accountConnectionSectionTranslations(
            "subTitle_pleaseConnectWithYourGuardianAddress",
            {
              conceptGuardianAddress: domainTranslations(
                "conceptName_guardianAddress"
              ),
            }
          ),
      // <>
      //   To begin, please connect with your{" "}
      //   <BoldText>Guardian address.</BoldText>
      // </>
      buttonText:
        walletConnectionPhase === INSTALL_PHASE
          ? noEthereumProviderSectionTranslations("action_install")
          : accountConnectionSectionTranslations("action_connect"),
    };
  }, [
    accountConnectionSectionTranslations,
    domainTranslations,
    isInstall,
    noEthereumProviderSectionTranslations,
    walletConnectionPhase,
  ]);

  return (
    <div className={classes.noEthereumProviderSection}>
      <Typography style={{ marginBottom: "0.5rem" }} variant={"h4"}>
        {titleText}
      </Typography>
      <Typography style={{ marginBottom: "1rem" }}>{subTitleText}</Typography>

      {/*{hasExtraDetailsSection && <InstallPhaseExtraDetails />}*/}
      {hasExtraDetailsSection && (
        <DetailsList
          conceptName={guardiansAddressDetailsTexts.conceptName}
          details={guardiansAddressDetailsTexts.texts}
          style={{ width: "100%" }}
        />
      )}
      <br />

      <ActionButton
        fullWidth={true}
        onClick={actionFunction}
        disabled={!buttonIsEnabled}
        style={
          {
            // backgroundColor: "#0D0D0D",
          }
        }
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
