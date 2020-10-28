import React, { DetailedHTMLProps } from "react";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { Typography } from "@material-ui/core";

interface IProps {
  guardianAddress: string;
  guardianInfo: TGuardianInfo;
}

export const GuardianDetails = React.memo<
  IProps &
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props) => {
  const { guardianAddress, guardianInfo, ...rest } = props;

  return (
    <div {...rest}>
      <Typography>{guardianInfo.name}</Typography>
      <Typography>{guardianInfo.website}</Typography>
      <Typography>{guardianInfo.ip}</Typography>
      <Typography>{guardianInfo.orbsAddr}</Typography>
    </div>
  );
});
