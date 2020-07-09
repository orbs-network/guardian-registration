import React from "react";
import {
  TGuardianInfo,
  TGuardianContractInteractionTimes,
} from "../../store/OrbsAccountStore";
import { GuardiansDetailsForm } from "./GuradiansDetailsForm";
import {
  TGuardianRegistrationPayload,
  TGuardianUpdatePayload,
} from "../../services/guardiansV2Service/IGuardiansV2Service";

interface IProps {
  guardianAddress: string;
  guardianInfo: TGuardianInfo;
  updateGuardianDetails: (
    guardianRegistrationPayload: TGuardianUpdatePayload
  ) => void;
  guardianRegistrationTimeInfo: TGuardianContractInteractionTimes;
}

export const EditGuardianInfoSection = React.memo<IProps>((props) => {
  const {
    guardianInfo,
    guardianAddress,
    updateGuardianDetails,
    guardianRegistrationTimeInfo,
  } = props;
  // TODO : ORL : Add last update time
  return (
    <>
      <GuardiansDetailsForm
        guardianAddress={guardianAddress}
        submitInfo={updateGuardianDetails}
        guardianInitialInfo={guardianInfo}
        actionButtonTitle={"Update"}
      />
      <br />
      {/* TODO : ORL : Timestamp is GMT, account for that */}
      <div>
        Registered:{" "}
        {new Date(
          guardianRegistrationTimeInfo.registrationTime
        ).toLocaleString()}
      </div>
      <br />
      <div>
        Last updated:{" "}
        {new Date(guardianRegistrationTimeInfo.lastUpdateTime).toLocaleString()}
      </div>
    </>
  );
});
