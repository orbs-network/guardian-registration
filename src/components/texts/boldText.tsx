import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: "bold",
    display: "inline",
  },
}));

export const BoldText = React.memo<IProps>((props) => {
  const { children } = props;
  const classes = useStyles();
  return <div className={classes.boldText}>{children}</div>;
});
