import React, { useCallback } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useStateful } from "react-hanger";
import {
  TGuardianInfoResponse,
  TGuardianRegistrationPayload,
} from "../../services/guardiansV2Service/IGuardiansV2Service";
import { GuardiansDetailsForm } from "./GuradiansDetailsForm";
import { TGuardianInfo } from "../../store/OrbsAccountStore";

interface IProps {
  guardianAddress: string;
  registerGuardian: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
}

export const RegisterGuardianSection = React.memo<IProps>((props) => {
  const { guardianAddress, registerGuardian } = props;
  const name = useStateful("A");
  const website = useStateful("a.com");

  const demoInitialInfo: TGuardianInfo = {
    orbsAddr: "0xe30a30069209aa4e7e7b07ab391966a0f071afd9",
    ip: "0x0b16212c",
    contact: "A's contact info",
    website: "a.com",
    name: "A",
  };

  return (
    <GuardiansDetailsForm
      guardianAddress={guardianAddress}
      submitInfo={registerGuardian}
      guardianInitialInfo={demoInitialInfo}
    />
  );
});
