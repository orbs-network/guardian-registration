import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    padding: "1.5rem",
    maxWidth: "100%",
    width: "30rem",
    border: "2px dashed rgba(0,0,0,0)",
    "&:focus-within, &:hover": {
      border: `2px dashed ${theme.palette.secondary.main}`,
    },
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
