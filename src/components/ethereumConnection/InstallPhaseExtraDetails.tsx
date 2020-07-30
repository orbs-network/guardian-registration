import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "start",
    padding: "0.5em",
  },
  boldText: {
    fontWeight: "bold",
    display: "inline",
  },
  textsList: {
    listStylePosition: "outside",
    paddingLeft: "1.5rem",

    "& li": {
      margin: "0 0 0.2rem 0",
    },
    "& li:last-child": {
      margin: 0,
    },
  },
}));

export const InstallPhaseExtraDetails = React.memo<IProps>((props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography>
        The{" "}
        <Typography className={classes.boldText}>Guardian Address</Typography>
      </Typography>
      <ul className={classes.textsList}>
        <li>Represent the Guardian in the Guardians list</li>
        <li>Used by Delegators to delegate to the Guardian</li>
        <li>Holds the Guardian's self-delegated stake</li>
        <li>Receives the Guardians rewards</li>
      </ul>
    </div>
  );
});
