import React, { useMemo } from "react";
import { fromUnixTime } from "date-fns";
import {
  TGuardianInfo,
  TGuardianContractInteractionTimes,
} from "../../../store/OrbsAccountStore";
import { GuardiansDetailsForm } from "../forms/GuradiansDetailsForm";
import { Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import { Transition } from "react-spring/renderprops-universal";
import { TGuardianUpdatePayload } from "@orbs-network/contracts-js";

interface IProps {
  guardianAddress: string;
  // Props for Guardian info
  guardianInfo: TGuardianInfo;
  updateGuardianDetails: (
    guardianRegistrationPayload: TGuardianUpdatePayload
  ) => void;
  guardianContractInteractionTimes: TGuardianContractInteractionTimes;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const EditGuardianInfoSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    guardianInfo,
    guardianAddress,
    updateGuardianDetails,
    guardianContractInteractionTimes,
  } = props;

  const { lastUpdateTime, registrationTime } = guardianContractInteractionTimes;

  const registrationDate = useMemo(() => {
    return fromUnixTime(registrationTime);
  }, [registrationTime]);

  const lastUpdateDate = useMemo(() => {
    return fromUnixTime(lastUpdateTime);
  }, [lastUpdateTime]);

  return (
    <>
      <Avatar className={classes.avatar}>
        <EditIcon />
      </Avatar>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        <Typography variant={"h5"}>Guardian details update</Typography>
        <Typography
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {guardianAddress}
        </Typography>
      </div>
      <GuardiansDetailsForm
        guardianAddress={guardianAddress}
        submitInfo={updateGuardianDetails}
        guardianInitialInfo={guardianInfo}
        actionButtonTitle={"Update"}
      />
      <br />
      {/*<Typography variant={"h6"}>*/}
      {/*  Guardian registered: {registrationDate.toLocaleString()}*/}
      {/*</Typography>*/}
      <Transition
        items={lastUpdateDate}
        // config={config.gentle}
        // immediate={DISABLE_ANIMATIONS}

        from={{
          // position: "absolute",
          opacity: 0,
          // transform: "translateX(1%)",
        }}
        enter={{
          opacity: 1,
          // transform: "translateX(0%)",
        }}
        leave={{
          opacity: 0,
          // transform: "translateX(1%)",
          // position: "absolute",
          display: "none",
        }}
        update={{
          opacity: 1,
        }}
      >
        {(toggle) => (props) => (
          <Typography variant={"h6"} style={props}>
            Details Last updated: {lastUpdateDate.toLocaleString()}
          </Typography>
        )}
      </Transition>
      <br />
    </>
  );
});
