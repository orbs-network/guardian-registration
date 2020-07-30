import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { BoldText } from "../texts/boldText";

interface IProps {
  conceptName: string;
  details: React.ReactNode[];
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "start",
    padding: "0.5em",
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

export const DetailsList = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { conceptName, details } = props;

  return (
    <div className={classes.container}>
      <Typography>
        Your <BoldText>{conceptName}:</BoldText>
      </Typography>
      <ul className={classes.textsList}>
        {details.map((detail) => (
          <li>{detail}</li>
        ))}
        {/*<li>Represents the Guardian in the Guardians list</li>*/}
        {/*<li>Used by Delegators to delegate to the Guardian</li>*/}
        {/*<li>Holds the Guardian's self-delegated stake</li>*/}
        {/*<li>Receives the Guardians rewards</li>*/}
      </ul>
    </div>
  );
});
