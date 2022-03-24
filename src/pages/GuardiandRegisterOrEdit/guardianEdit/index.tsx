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
  title: {
    transition: "0.5s",
    fontWeight: "bold",
  },
  titleHighlight: {
    color: theme.palette.secondary.main,
  },
  titleFade: {
    color: theme.palette.text.disabled,
  },
  value: {
    transition: "0.5s",
  },
  valueHighlight: {
    color: theme.palette.secondary.main,
  },
  valueFade: {
    color: theme.palette.text.disabled,
  },
}));

export const GuardianDetails = React.memo<IProps & PaperProps>((props) => {
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
    <Paper
      elevation={3}
      {...rest}
      style={{
        padding: "1.5rem",
        maxWidth: "100%",
        width: "30rem",
        overflow: "hidden",
      }}
    >
      <TitleValuePair
        title={domainTranslations("conceptName_guardianAddress") + " :"}
        value={guardianAddress}
        shouldfade={shouldFadeOthers}
      />
      <br />
      <TitleValuePair
        title={guardianDataFormsTranslations("fieldLabel_guardianName") + " :"}
        value={guardianInfo.name}
        shouldHighlight={highlightInfo}
        shouldfade={!highlightInfo && shouldFadeOthers}
      />
      <br />
      <TitleValuePair
        title={
          guardianDataFormsTranslations("fieldLabel_guardianWebsite") + " :"
        }
        value={
          <InTextLink
            text={guardianInfo.website}
            href={guardianInfo.website}
            shouldfade={!highlightInfo && shouldFadeOthers}
          />
        }
        shouldHighlight={highlightInfo}
        shouldfade={!highlightInfo && shouldFadeOthers}
      />
      <br />
      <TitleValuePair
        title={guardianDataFormsTranslations("fieldLabel_nodeIpAddress") + " :"}
        value={guardianInfo.ip}
        shouldHighlight={highlightInfo}
        shouldfade={!highlightInfo && shouldFadeOthers}
      />

      <br />
      <TitleValuePair
        title={
          guardianDataFormsTranslations("fieldLabel_nodeEthereumAddress") + " :"
        }
        value={guardianInfo.orbsAddr}
        shouldHighlight={highlightInfo}
        shouldfade={!highlightInfo && shouldFadeOthers}
      />
      <br />
      <TitleValuePair
        title={`${guardianDataFormsTranslations(
          "fieldLabel_delegatorsShare"
        )}${delegatorsShareUsingDefaultMessage} : `}
        value={`${
          delegatorsShare.isUsingDefaultValue
            ? delegatorsShare.defaultValue
            : delegatorsShare.value
        } %`}
        shouldHighlight={highlightDelegatorsShare}
        shouldfade={!highlightDelegatorsShare && shouldFadeOthers}
      />
      <br />

      <TitleValuePair
        title={
          <>
            {guardianDataFormsTranslations("fieldLabel_guardianDetailsUrl")} (
            <InTextLink
              text={guardianDataFormsTranslations(
                "fieldValueNote_certifiedCommittee"
              )}
              href={DETAILS_REQUIREMENTS_LINK}
              shouldfade={!highlightCertificateUrl && shouldFadeOthers}
            />
            ) :
          </>
        }
        value={guardianCertificateUrlDataText}
        shouldHighlight={highlightCertificateUrl}
        shouldfade={!highlightCertificateUrl && shouldFadeOthers}
      />
    </Paper>
  );
});

interface ITitleValuePairProps {
  title: string | JSX.Element;
  value: string | JSX.Element;
  shouldHighlight?: boolean;
  shouldfade?: boolean;
}

const TitleValuePair = React.memo<ITitleValuePairProps>((props) => {
  const { title, value, shouldHighlight, shouldfade } = props;
  const classes = useStyles();

  return (
    <>
      <Typography
        className={clsx(
          classes.title,
          shouldHighlight ? classes.titleHighlight : null,
          shouldfade ? classes.titleFade : null
        )}
      >
        {title}
      </Typography>
      <Typography
        className={clsx(
          classes.value,
          shouldHighlight ? classes.valueHighlight : null,
          shouldfade ? classes.valueFade : null
        )}
      >
        {value}
      </Typography>
    </>
  );
});
