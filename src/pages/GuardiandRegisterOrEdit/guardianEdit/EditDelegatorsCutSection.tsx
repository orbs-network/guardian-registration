import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { RewardsDistributionFrequencyForm } from "../forms/RewardsDistributionFrequencyForm";
import { makeStyles } from "@material-ui/core/styles";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import MoneyIcon from "@material-ui/icons/Money";
import { DelegatorsCutForm } from "../forms/DelegatorsCutForm";

interface IProps {
  delegatorsCut?: number;
  updateDelegatorsCut: (delegatorsCut: number) => void;
  isUsingDefaultValue?: boolean;

  // Configs
  delegatorsCutMaxValue: number;
  delegatorsCutDefaultValue: number;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const EditDelegatorsCutSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    delegatorsCut,
    updateDelegatorsCut,
    isUsingDefaultValue,
    delegatorsCutMaxValue,
    delegatorsCutDefaultValue,
  } = props;
  return (
    <>
      <Avatar className={classes.avatar}>
        <MoneyIcon />
      </Avatar>
      <Typography variant={"h5"}>Delegators cut</Typography>
      <DelegatorsCutForm
        updateDelegatorsCut={updateDelegatorsCut}
        currentDelegatorsCut={delegatorsCut}
        isUsingDefaultValue={isUsingDefaultValue}
        delegatorsCutDefaultValue={delegatorsCutDefaultValue}
        delegatorsCutMaxValue={delegatorsCutMaxValue}
      />
    </>
  );
});
