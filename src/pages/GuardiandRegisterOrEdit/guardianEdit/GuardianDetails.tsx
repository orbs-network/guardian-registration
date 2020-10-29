import React, { DetailedHTMLProps } from "react";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { PaperProps } from "@material-ui/core/Paper/Paper";

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

export const GuardianDetails = React.memo<IProps & PaperProps>((props) => {
  const classes = useStyles();
  const { guardianAddress, guardianInfo, delegatorsShare, ...rest } = props;

  const delegatorsShareUsingDefaultMessage = delegatorsShare.isUsingDefaultValue
    ? " (using default value)"
    : null;

  return (
    <Paper
      elevation={3}
      {...rest}
      style={{ padding: "1.5rem", maxWidth: "100%", width: "30rem" }}
    >
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
    </Paper>
  );
});
