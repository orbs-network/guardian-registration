import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  errorVariant?: boolean;
  warningVariant?: boolean;
}

const useStyles = makeStyles((theme) => ({
  actionButton: {
    color: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.main,
    transition: "background-color 0.4s linear, color 0.2s linear",
    backgroundColor: "#0D0D0D",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.getContrastText(theme.palette.secondary.light),
      borderColor: theme.palette.getContrastText(theme.palette.secondary.light),
    },
  },
  actionButtonError: {
    color: theme.palette.error.light,
    borderColor: theme.palette.error.main,
    transition: "background-color 0.4s linear, color 0.2s linear",
    "&:hover": {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.getContrastText(theme.palette.error.light),
      borderColor: theme.palette.getContrastText(theme.palette.error.light),
    },
  },

  actionButtonWarning: {
    color: theme.palette.warning.light,
    borderColor: theme.palette.warning.main,
    transition: "background-color 0.4s linear, color 0.2s linear",
    "&:hover": {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.getContrastText(theme.palette.warning.light),
      borderColor: theme.palette.getContrastText(theme.palette.warning.light),
    },
  },
}));

const ActionButton = React.memo<IProps & ButtonProps>((props) => {
  const { children, fullWidth, errorVariant, warningVariant, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      className={
        errorVariant
          ? classes.actionButtonError
          : warningVariant
          ? classes.actionButtonWarning
          : classes.actionButton
      }
      variant={"outlined"}
      fullWidth={fullWidth === undefined ? true : fullWidth}
      type={"submit"}
      {...rest}
    >
      {children}
    </Button>
  );
});

export default ActionButton;