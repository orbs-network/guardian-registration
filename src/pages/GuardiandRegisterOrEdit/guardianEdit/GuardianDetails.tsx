import React from "react";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";

interface IProps {
  guardianAddress: string;
  guardianInitialInfo: TGuardianInfo;
}

export const GuardianDetails = React.memo<IProps>((props) => {
  return <div>GuardianDetails</div>;
});
