import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button, ButtonProps } from "@material-ui/core";
import clsx from "clsx";

interface IProps {
  errorVariant?: boolean;
}

const useStyles = makeStyles((theme) => ({
  actionButton: {
    color: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.main,
    transition: "background-color 0.4s linear, color 0.2s linear",
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
}));

export const ActionButton = React.memo<IProps & ButtonProps>((props) => {
  const { children, fullWidth, errorVariant, ...rest } = props;
  const classes = useStyles();

  return (
    <Button
      className={
        errorVariant ? classes.actionButtonError : classes.actionButton
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
