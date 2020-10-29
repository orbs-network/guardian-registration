import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    padding: "1.5rem",
    maxWidth: "100%",
    width: "30rem",
  },
}));

export const FormWrapper = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { children } = props;
  return (
    <Paper elevation={3} className={classes.formWrapper}>
      {children}
    </Paper>
  );
});
