import React, { DetailedHTMLProps, useMemo } from "react";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { PaperProps } from "@material-ui/core/Paper/Paper";
import { InTextLink } from "../../../components/InTextLink";

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
    fontWeight: "bold",
  },
  titleHighlight: {
    fontWeight: "bold",
    color: theme.palette.secondary.light,
  },
  value: {},
  valueHighlight: {
    color: theme.palette.secondary.main,
  },
}));

export const GuardianDetails = React.memo<IProps & PaperProps>((props) => {
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

  const delegatorsShareUsingDefaultMessage = delegatorsShare.isUsingDefaultValue
    ? " (using default value)"
    : null;

  const guardianCertificateUrlDataText = useMemo(() => {
    return guardianCertificationUrl.hasGuardianDetailsUrl ? (
      <Typography component={"span"}>
        Your details page :{" "}
        <InTextLink
          href={
            guardianCertificationUrl.currentGuardianDetailsUrl?.startsWith(
              "http"
            )
              ? guardianCertificationUrl.currentGuardianDetailsUrl
              : "http://" + guardianCertificationUrl.currentGuardianDetailsUrl
          }
          text={guardianCertificationUrl.currentGuardianDetailsUrl!}
        />
      </Typography>
    ) : (
      `You have not set your details page URL`
    );
  }, [
    guardianCertificationUrl.currentGuardianDetailsUrl,
    guardianCertificationUrl.hasGuardianDetailsUrl,
  ]);

  return (
    <Paper
      elevation={3}
      {...rest}
      style={{ padding: "1.5rem", maxWidth: "100%", width: "30rem" }}
    >
      <TitleValuePair
        title={"Name : "}
        value={guardianInfo.name}
        shouldHighlight={highlightInfo}
      />
      <br />
      <TitleValuePair
        title={"website : "}
        value={guardianInfo.website}
        shouldHighlight={highlightInfo}
      />
      <br />
      <TitleValuePair
        title={"IP : "}
        value={guardianInfo.ip}
        shouldHighlight={highlightInfo}
      />

      <br />
      <TitleValuePair
        title={"Orbs Node Address : "}
        value={guardianInfo.orbsAddr}
        shouldHighlight={highlightInfo}
      />
      <br />
      <TitleValuePair
        title={`Delegators share${delegatorsShareUsingDefaultMessage} : `}
        value={`${
          delegatorsShare.isUsingDefaultValue
            ? delegatorsShare.defaultValue
            : delegatorsShare.value
        } %`}
        shouldHighlight={highlightDelegatorsShare}
      />
      <br />

      <TitleValuePair
        title={"Guardian's details page URL:"}
        value={guardianCertificateUrlDataText}
        shouldHighlight={highlightCertificateUrl}
      />
    </Paper>
  );
});

interface ITitleValuePairProps {
  title: string;
  value: string | JSX.Element;
  shouldHighlight?: boolean;
}

const TitleValuePair = React.memo<ITitleValuePairProps>((props) => {
  const { title, value, shouldHighlight } = props;
  const classes = useStyles();
  return (
    <>
      <Typography
        className={shouldHighlight ? classes.titleHighlight : classes.title}
      >
        {title}
      </Typography>
      <Typography
        className={shouldHighlight ? classes.valueHighlight : classes.value}
      >
        {value}
      </Typography>
    </>
  );
});
