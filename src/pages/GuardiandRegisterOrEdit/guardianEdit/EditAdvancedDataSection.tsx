import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { RewardsDistributionFrequencyForm } from "../forms/RewardsDistributionFrequencyForm";
import { makeStyles } from "@material-ui/core/styles";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import { AdvancedFeaturesForm } from "../forms/AdvancedFeaturesForm";

interface IProps {
  delegatorsCut?: number;
  idFromUrl?: string;
  updateAdvancedDetails: () => void;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const EditAdvancedDataSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { idFromUrl, delegatorsCut, updateAdvancedDetails } = props;
  return (
    <>
      <Avatar className={classes.avatar}>
        <TimelapseIcon />
      </Avatar>
      <Typography variant={"h5"}>Advanced Features</Typography>
      <AdvancedFeaturesForm
        updateAdvancedDetails={updateAdvancedDetails}
        idFromUrl={idFromUrl}
        delegatorsCut={delegatorsCut}
      />
    </>
  );
});
