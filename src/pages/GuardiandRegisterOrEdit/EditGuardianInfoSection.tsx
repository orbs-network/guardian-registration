import React from "react";
import { TGuardianInfo } from "../../store/OrbsAccountStore";
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
}

export const EditGuardianInfoSection = React.memo<IProps>((props) => {
  const { guardianInfo, guardianAddress, updateGuardianDetails } = props;
  return (
    <>
      <GuardiansDetailsForm
        guardianAddress={guardianAddress}
        submitInfo={updateGuardianDetails}
        guardianInitialInfo={guardianInfo}
        actionButtonTitle={"Update"}
      />
    </>
  );
});
