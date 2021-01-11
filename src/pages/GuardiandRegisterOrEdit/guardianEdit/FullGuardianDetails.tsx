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

export interface IDefaultableValue<T> {
  isUsingDefaultValue: boolean;
  defaultValue: T;
  value?: T;
}

interface IProps {
  guardianAddress: string;
  guardianInfo: TGuardianInfo;
  delegatorsShare: IDefaultableValue<number> & { maxValue: number };
  guardianCertificationUrl: {
    currentGuardianDetailsUrl: string;
    hasGuardianDetailsUrl?: boolean;
  };
  highlightInfo?: boolean;
  highlightDelegatorsShare?: boolean;
  highlightCertificateUrl?: boolean;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1.5rem",
    maxWidth: "100%",
    width: "30rem",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const FullGuardianDetails = React.memo<IProps & PaperProps>((props) => {
  const classes = useStyles();
  const {
    guardianAddress,
    guardianInfo,
    delegatorsShare,
    guardianCertificationUrl,

    highlightInfo,
    highlightDelegatorsShare,
    highlightCertificateUrl,

    ...rest
  } = props;

  const shouldFadeOthers =
    highlightInfo || highlightDelegatorsShare || highlightCertificateUrl;

  const guardianDataFormsTranslations = useGuardianDataFormsTranslations();
  const domainTranslations = useDomainTranslations();

  const delegatorsShareUsingDefaultMessage = delegatorsShare.isUsingDefaultValue
    ? ` (${guardianDataFormsTranslations("fieldValueNote_usingDefaultValue")})`
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
});
