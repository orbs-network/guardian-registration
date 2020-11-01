import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { RewardsDistributionFrequencyForm } from "../../forms/RewardsDistributionFrequencyForm";
import { makeStyles } from "@material-ui/core/styles";
import TimelapseIcon from "@material-ui/icons/Timelapse";

interface IProps {
  currentFrequencyInHours: number;
  updateRewardsFrequency: (frequencyInHours: number) => void;
  isUsingDefaultValue?: boolean;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const EditRewardsDistributionSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    isUsingDefaultValue,
    currentFrequencyInHours,
    updateRewardsFrequency,
  } = props;
  return (
    <>
      <Avatar className={classes.avatar}>
        <TimelapseIcon />
      </Avatar>
      <Typography variant={"h5"}>Rewards Distribution Frequency</Typography>
      <RewardsDistributionFrequencyForm
        currentFrequencyInHours={currentFrequencyInHours}
        updateRewardsFrequency={updateRewardsFrequency}
        isUsingDefaultValue={isUsingDefaultValue}
      />
    </>
  );
});