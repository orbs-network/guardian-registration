import React, { useMemo } from "react";
import { fromUnixTime } from "date-fns";
import {
  TGuardianInfo,
  TGuardianContractInteractionTimes,
} from "../../store/OrbsAccountStore";
import { GuardiansDetailsForm } from "./forms/GuradiansDetailsForm";
import { TGuardianUpdatePayload } from "../../services/guardiansV2Service/IGuardiansV2Service";
import { Paper, Typography } from "@material-ui/core";

interface IProps {
  guardianAddress: string;
  // Props for Guardian info
  guardianInfo: TGuardianInfo;
  updateGuardianDetails: (
    guardianRegistrationPayload: TGuardianUpdatePayload
  ) => void;
  guardianContractInteractionTimes: TGuardianContractInteractionTimes;
}

export const EditGuardianInfoSection = React.memo<IProps>((props) => {
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
      <div
        style={{
          maxWidth: "100%",
          textAlign: "center",
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
      <Typography variant={"h6"}>
        Details Last updated: {lastUpdateDate.toLocaleString()}
      </Typography>
      <br />
    </>
  );
});
