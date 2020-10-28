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
import { GuardianDetails } from "./GuardianDetails";
import { ActionButton } from "../../../components/shared/ActionButton/ActionButton";
import { useBoolean } from "react-hanger";

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

  const isEditingData = useBoolean(false);

  console.log({ isEditingData: isEditingData.value });
  const { lastUpdateTime, registrationTime } = guardianContractInteractionTimes;

  const registrationDate = useMemo(() => {
    return fromUnixTime(registrationTime);
  }, [registrationTime]);

  const lastUpdateDate = useMemo(() => {
    return fromUnixTime(lastUpdateTime);
  }, [lastUpdateTime]);

  // @ts-ignore
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        width: "min-content",
        alignItems: "center",
      }}
    >
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
      <div
        style={{
          maxWidth: "100%",
          width: "100%",
          // minHeight: "20rem",
          position: "relative",
        }}
      >
        <Transition
          items={isEditingData.value}
          // config={config.gentle}
          // immediate={DISABLE_ANIMATIONS}

          from={{
            // position: "absolute",
            // display: "inline-block",
            top: 0,
            opacity: 0,
            width: "100%",
            // transform: "translateX(1%)",
          }}
          enter={{
            opacity: 1,
          }}
          leave={{
            // TODO : O.L : this 'none' is because we could not figure out how to properly use 'absolute' and 'relative' here,
            display: "none",
            opacity: 0,
          }}
        >
          {(toggle) =>
            toggle
              ? (props) => (
                  //@ts-ignore
                  <div style={{ ...props }}>
                    <GuardiansDetailsForm
                      submitInfo={updateGuardianDetails}
                      guardianInitialInfo={guardianInfo}
                      actionButtonTitle={"Update"}
                    />
                    <ActionButton onClick={isEditingData.setFalse}>
                      Cancel
                    </ActionButton>
                    <br />
                    <br />
                    <Typography variant={"h6"}>
                      Details Last updated: {lastUpdateDate.toLocaleString()}
                    </Typography>
                  </div>
                )
              : (props) => (
                  //@ts-ignore
                  <div style={{ ...props }}>
                    <GuardianDetails
                      guardianAddress={guardianAddress}
                      guardianInfo={guardianInfo}
                    />
                    <ActionButton onClick={isEditingData.setTrue}>
                      Edit
                    </ActionButton>
                  </div>
                )
          }
        </Transition>
      </div>
    </div>
  );
});
