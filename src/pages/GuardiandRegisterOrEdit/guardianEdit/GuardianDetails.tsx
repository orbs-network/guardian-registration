import React, { DetailedHTMLProps } from "react";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

export interface IDefaultableValue<T> {
  isUsingDefaultValue: boolean;
  defaultValue: T;
  value?: T;
}

interface IProps {
  guardianAddress: string;
  guardianInfo: TGuardianInfo;
  delegatorsShare: IDefaultableValue<number> & { maxValue: number };
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
  value: {},
}));

export const GuardianDetails = React.memo<
  IProps &
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props) => {
  const classes = useStyles();
  const { guardianAddress, guardianInfo, delegatorsShare, ...rest } = props;

  const delegatorsShareUsingDefaultMessage = delegatorsShare.isUsingDefaultValue
    ? " (using default value)"
    : null;

  return (
    <div {...rest}>
      <Typography className={classes.title}>Name : </Typography>
      <Typography>{guardianInfo.name}</Typography>
      <Typography className={classes.title}>website : </Typography>
      <Typography>{guardianInfo.website}</Typography>
      <Typography className={classes.title}>IP : </Typography>
      <Typography>{guardianInfo.ip}</Typography>
      <Typography className={classes.title}>Orbs Node Address : </Typography>
      <Typography>{guardianInfo.orbsAddr}</Typography>

      <Typography className={classes.title}>
        Delegators share{delegatorsShareUsingDefaultMessage} :
      </Typography>
      <Typography>
        {delegatorsShare.isUsingDefaultValue
          ? delegatorsShare.defaultValue
          : delegatorsShare.value}{" "}
        %
      </Typography>
    </div>
  );
});
