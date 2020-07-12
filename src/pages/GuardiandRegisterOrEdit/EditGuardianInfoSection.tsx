import React, { useMemo } from "react";
import { fromUnixTime } from "date-fns";
import {
  TGuardianInfo,
  TGuardianContractInteractionTimes,
} from "../../store/OrbsAccountStore";
import { GuardiansDetailsForm } from "./GuradiansDetailsForm";
import { TGuardianUpdatePayload } from "../../services/guardiansV2Service/IGuardiansV2Service";

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
      <GuardiansDetailsForm
        guardianAddress={guardianAddress}
        submitInfo={updateGuardianDetails}
        guardianInitialInfo={guardianInfo}
        actionButtonTitle={"Update"}
      />
      <br />
      <div>Registered: {registrationDate.toLocaleString()}</div>
      <br />
      <div>Last updated: {lastUpdateDate.toLocaleString()}</div>
      <br />
      <br />
    </>
  );
});
