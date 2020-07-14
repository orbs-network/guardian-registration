import React from "react";
import { TGuardianRegistrationPayload } from "../../services/guardiansV2Service/IGuardiansV2Service";
import { GuardiansDetailsForm } from "./forms/GuradiansDetailsForm";
import { TGuardianInfo } from "../../store/OrbsAccountStore";
import { Typography } from "@material-ui/core";

interface IProps {
  guardianAddress: string;
  registerGuardian: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
}

export const RegisterGuardianSection = React.memo<IProps>((props) => {
  const { guardianAddress, registerGuardian } = props;

  const demoInitialInfo: TGuardianInfo = {
    orbsAddr: "0xe30a30069209aa4e7e7b07ab391966a0f071afd9",
    ip: "12.114.252.82",
    contact: "A's contact info",
    website: "a.com",
    name: "A",
  };

  return (
    <>
      <div
        style={{
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant={"h5"}>Guardian Registration</Typography>
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
        submitInfo={registerGuardian}
        guardianInitialInfo={demoInitialInfo}
        actionButtonTitle={"Register"}
      />
    </>
  );
});
