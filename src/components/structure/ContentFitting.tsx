import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}
const useStyles = makeStyles((theme) => ({
  contentFitter: {
    height: "100%",
    width: "fit-content",
    maxWidth: "100%",
  },
}));

export const ContentFitting = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { children } = props;
  return <div className={classes.contentFitter}>{children}</div>;
});
