import React, { DetailedHTMLProps, useMemo } from "react";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { PaperProps } from "@material-ui/core/Paper/Paper";
import { InTextLink } from "../../../components/InTextLink";
import { DETAILS_REQUIREMENTS_LINK } from "./sections/EditDelegatorsCertificateSection";
import {
  useDomainTranslations,
  useGuardianDataFormsTranslations,
} from "../../../translations/translationsHooks";
import { TitleValuePair } from "../../../components/titleValuePair/TitleValuePair";
import {
  EGuardianFormActivePart,
  FullGuardianForm,
} from "../forms/FullGuradianForm";
import { observer } from "mobx-react";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../../store/storeHooks";
import { TGuardianRegistrationPayload } from "@orbs-network/contracts-js";

export interface IDefaultableValue<T> {
  isUsingDefaultValue: boolean;
  defaultValue: T;
  value?: T;
}

interface IProps {
  /// **** What to show ****
  activePart?: EGuardianFormActivePart;
  actionButtonTitle: string;

  /// **** General info ***
  guardianAddress: string;
  guardianInfo: TGuardianInfo;
  submitGeneralInfo: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;

  /// **** Delegators share ***
  delegatorsShare: IDefaultableValue<number> & { maxValue: number };
  updateDelegatorsCut: (delegatorsCut: number) => void;

  /// **** Guardian details url ***
  guardianCertificationUrl: {
    currentGuardianDetailsUrl: string;
    hasGuardianDetailsUrl?: boolean;
  };
  updateGuardianDetailsUrl: (guardianDetailsUrl: string) => void;

  /// **** Others ***
  highlightInfo?: boolean;
  highlightDelegatorsShare?: boolean;
  highlightCertificateUrl?: boolean;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1.5rem",
    maxWidth: "100%",
    width: "40rem",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

// export const FullGuardianDetails = React.memo<IProps & PaperProps>((props) => {
export const FullGuardianDetails = observer<React.FunctionComponent<IProps>>(
  (props) => {
    const classes = useStyles();
    const {
      activePart,
      actionButtonTitle,
      guardianAddress,
      guardianInfo,
      submitGeneralInfo,
      updateDelegatorsCut,
      delegatorsShare,
      guardianCertificationUrl,
      updateGuardianDetailsUrl,

      highlightInfo,
      highlightDelegatorsShare,
      highlightCertificateUrl,

      ...rest
    } = props;

    const shouldFadeOthers =
      highlightInfo || highlightDelegatorsShare || highlightCertificateUrl;

    const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
    const orbsAccountStore = useOrbsAccountStore();

    const guardianDataFormsTranslations = useGuardianDataFormsTranslations();
    const domainTranslations = useDomainTranslations();

    const delegatorsShareUsingDefaultMessage = delegatorsShare.isUsingDefaultValue
      ? ` (${guardianDataFormsTranslations(
          "fieldValueNote_usingDefaultValue"
        )})`
      : null;

    const guardianCertificateUrlDataText = useMemo(() => {
      return guardianCertificationUrl.hasGuardianDetailsUrl ? (
        <Typography component={"span"}>
          <InTextLink
            href={
              guardianCertificationUrl.currentGuardianDetailsUrl?.startsWith(
                "http"
              )
                ? guardianCertificationUrl.currentGuardianDetailsUrl
                : "http://" + guardianCertificationUrl.currentGuardianDetailsUrl
            }
            text={guardianCertificationUrl.currentGuardianDetailsUrl!}
            shouldfade={!highlightCertificateUrl && shouldFadeOthers}
          />
        </Typography>
      ) : (
        guardianDataFormsTranslations(
          "fieldValueNote_youHaveNotSetYourDetailsPageUrl"
        )
      );
    }, [
      guardianCertificationUrl.currentGuardianDetailsUrl,
      guardianCertificationUrl.hasGuardianDetailsUrl,
      guardianDataFormsTranslations,
      highlightCertificateUrl,
      shouldFadeOthers,
    ]);

    return (
      <Paper elevation={3} {...rest} className={classes.paper}>
        <Typography>Guardian Address:</Typography>
        <Typography color={"secondary"} style={{ fontWeight: "bold" }}>
          {guardianAddress}
        </Typography>

        <br />
        <FullGuardianForm
          activePart={activePart}
          /// **** Guardian General info ****
          actionButtonTitle={actionButtonTitle}
          guardianInitialInfo={guardianInfo}
          submitInfo={submitGeneralInfo}
          disableSubmit={false}
          messageForSubmitButton={"Message for submit button"}
          /// **** Delegators share ****
          currentDelegatorsCut={delegatorsShare.value}
          updateDelegatorsCut={updateDelegatorsCut}
          delegatorsCutMaxValue={
            orbsAccountStore.rewardsContractSettings
              .maxDelegatorsStakingRewardsPercent
          }
          delegatorsCutDefaultValue={
            orbsAccountStore.rewardsContractSettings
              .defaultDelegatorsStakingRewardsPercent
          }
          // isUsingDefaultValue
          /// **** Guardian details url ****
          currentGuardianDetailsUrl={
            guardianCertificationUrl.currentGuardianDetailsUrl
          }
          updateGuardianDetailsUrl={updateGuardianDetailsUrl}
          hasGuardianDetailsUrl={guardianCertificationUrl.hasGuardianDetailsUrl}
        />

        {/*<TitleValuePair*/}
        {/*  title={domainTranslations("conceptName_guardianAddress") + " :"}*/}
        {/*  value={guardianAddress}*/}
        {/*  shouldfade={shouldFadeOthers}*/}
        {/*/>*/}
        {/*<br />*/}
        {/*<TitleValuePair*/}
        {/*  title={guardianDataFormsTranslations("fieldLabel_guardianName") + " :"}*/}
        {/*  value={guardianInfo.name}*/}
        {/*  shouldHighlight={highlightInfo}*/}
        {/*  shouldfade={!highlightInfo && shouldFadeOthers}*/}
        {/*/>*/}
        {/*<br />*/}
        {/*<TitleValuePair*/}
        {/*  title={*/}
        {/*    guardianDataFormsTranslations("fieldLabel_guardianWebsite") + " :"*/}
        {/*  }*/}
        {/*  value={*/}
        {/*    <InTextLink*/}
        {/*      text={guardianInfo.website}*/}
        {/*      href={guardianInfo.website}*/}
        {/*      shouldfade={!highlightInfo && shouldFadeOthers}*/}
        {/*    />*/}
        {/*  }*/}
        {/*  shouldHighlight={highlightInfo}*/}
        {/*  shouldfade={!highlightInfo && shouldFadeOthers}*/}
        {/*/>*/}
        {/*<br />*/}
        {/*<TitleValuePair*/}
        {/*  title={guardianDataFormsTranslations("fieldLabel_nodeIpAddress") + " :"}*/}
        {/*  value={guardianInfo.ip}*/}
        {/*  shouldHighlight={highlightInfo}*/}
        {/*  shouldfade={!highlightInfo && shouldFadeOthers}*/}
        {/*/>*/}

        {/*<br />*/}
        {/*<TitleValuePair*/}
        {/*  title={*/}
        {/*    guardianDataFormsTranslations("fieldLabel_nodeEthereumAddress") + " :"*/}
        {/*  }*/}
        {/*  value={guardianInfo.orbsAddr}*/}
        {/*  shouldHighlight={highlightInfo}*/}
        {/*  shouldfade={!highlightInfo && shouldFadeOthers}*/}
        {/*/>*/}
        {/*<br />*/}
        {/*<TitleValuePair*/}
        {/*  title={`${guardianDataFormsTranslations(*/}
        {/*    "fieldLabel_delegatorsShare"*/}
        {/*  )}${delegatorsShareUsingDefaultMessage} : `}*/}
        {/*  value={`${*/}
        {/*    delegatorsShare.isUsingDefaultValue*/}
        {/*      ? delegatorsShare.defaultValue*/}
        {/*      : delegatorsShare.value*/}
        {/*  } %`}*/}
        {/*  shouldHighlight={highlightDelegatorsShare}*/}
        {/*  shouldfade={!highlightDelegatorsShare && shouldFadeOthers}*/}
        {/*/>*/}
        {/*<br />*/}

        {/*<TitleValuePair*/}
        {/*  title={*/}
        {/*    <>*/}
        {/*      {guardianDataFormsTranslations("fieldLabel_guardianDetailsUrl")} (*/}
        {/*      <InTextLink*/}
        {/*        text={guardianDataFormsTranslations(*/}
        {/*          "fieldValueNote_certifiedCommittee"*/}
        {/*        )}*/}
        {/*        href={DETAILS_REQUIREMENTS_LINK}*/}
        {/*        shouldfade={!highlightCertificateUrl && shouldFadeOthers}*/}
        {/*      />*/}
        {/*      ) :*/}
        {/*    </>*/}
        {/*  }*/}
        {/*  value={guardianCertificateUrlDataText}*/}
        {/*  shouldHighlight={highlightCertificateUrl}*/}
        {/*  shouldfade={!highlightCertificateUrl && shouldFadeOthers}*/}
        {/*/>*/}
      </Paper>
    );
  }
);
