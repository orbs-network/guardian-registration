import React from "react";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  title: string | JSX.Element;
  value: string | JSX.Element;
  shouldHighlight?: boolean;
  shouldfade?: boolean;
}

const useStyles = makeStyles((theme) => ({
  title: {
    transition: "0.5s",
    fontWeight: "bold",
  },
  titleHighlight: {
    color: theme.palette.secondary.light,
  },
  titleFade: {
    color: theme.palette.text.disabled,
  },
  value: {
    transition: "0.5s",
  },
  valueHighlight: {
    color: theme.palette.secondary.main,
  },
  valueFade: {
    color: theme.palette.text.disabled,
  },
}));

export const TitleValuePair = React.memo<IProps>((props) => {
  const { title, value, shouldHighlight, shouldfade } = props;
  const classes = useStyles();

  return (
    <>
      <Typography
        className={clsx(
          classes.title,
          shouldHighlight ? classes.titleHighlight : null,
          shouldfade ? classes.titleFade : null
        )}
      >
        {title}
      </Typography>
      <Typography
        className={clsx(
          classes.value,
          shouldHighlight ? classes.valueHighlight : null,
          shouldfade ? classes.valueFade : null
        )}
      >
        {value}
      </Typography>
    </>
  );
});
