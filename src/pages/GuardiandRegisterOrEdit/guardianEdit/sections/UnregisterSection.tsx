import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { UnregisterForm } from "../../forms/UnregisterForm";

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
