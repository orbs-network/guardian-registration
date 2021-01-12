import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: "1.5rem",
    maxWidth: "100%",
    overflow: "hidden",
    width: "30rem",
    transition: "0.7s",
    border: "2px dashed rgba(0,0,0,0)",
    "&:focus-within, &:hover": {
      border: `2px dashed ${theme.palette.secondary.dark}`,
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
