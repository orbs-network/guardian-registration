import React, { useMemo } from "react";
import { fromUnixTime } from "date-fns";
import {
  TGuardianInfo,
  TGuardianContractInteractionTimes,
} from "../../store/OrbsAccountStore";
import { GuardiansDetailsForm } from "./forms/GuradiansDetailsForm";
import { TGuardianUpdatePayload } from "../../services/guardiansV2Service/IGuardiansV2Service";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { RewardsDistributionFrequencyForm } from "./forms/RewardsDistributionFrequencyForm";
import { makeStyles } from "@material-ui/core/styles";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { UnregisterForm } from "./forms/UnregisterForm";

interface IProps {
  unregisterGuardian: () => void;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const UnregisterSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { unregisterGuardian } = props;
  return (
    <>
      <Avatar className={classes.avatar}>
        <HighlightOffIcon />
      </Avatar>
      <Typography variant={"h5"}>Guardian Unregistering</Typography>
      <br />
      <UnregisterForm unregisterGuardian={unregisterGuardian} />
    </>
  );
});
