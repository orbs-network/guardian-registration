import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { InTextLink } from "../../../components/InTextLink";
import { GuardiansDetailsUrlForm } from "../forms/GuardiansDetailsUrlForm";

interface IProps {
  currentGuardianDetailsUrl?: string;
  updateGuardianDetailsUrl: (delegatorsCertificateUrl: string) => void;
  hasGuardianDetailsUrl?: boolean;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const DETAILS_REQUIREMENTS_LINK =
  "https://github.com/orbs-network/validator-instructions/blob/master/public/certified_committee.md";

export const EditDelegatorsCertificateSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    currentGuardianDetailsUrl,
    hasGuardianDetailsUrl,
    updateGuardianDetailsUrl,
  } = props;
  return (
    <>
      <Avatar className={classes.avatar}>
        <VerifiedUserIcon />
      </Avatar>
      <Typography variant={"h5"}>
        Guardian’s Information{" "}
        <InTextLink text={"( ? )"} href={DETAILS_REQUIREMENTS_LINK} />
      </Typography>
      <GuardiansDetailsUrlForm
        currentGuardianDetailsUrl={currentGuardianDetailsUrl}
        hasGuardianDetailsUrl={hasGuardianDetailsUrl}
        updateGuardianDetailsUrl={updateGuardianDetailsUrl}
        detailsRequirementsLink={DETAILS_REQUIREMENTS_LINK}
      />
    </>
  );
});
