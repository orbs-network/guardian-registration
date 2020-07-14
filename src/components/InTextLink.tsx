import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  text: string;
  href?: string;
}

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.light,
  },
}));

export const InTextLink = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { text, href } = props;
  return (
    <a
      className={classes.link}
      href={href || ""}
      target={"_blank"}
      rel={"noopener noreferrer"}
    >
      {text}
    </a>
  );
});
