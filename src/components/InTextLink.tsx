import React, { DetailedHTMLProps } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

interface IProps {
  text: string;
  href?: string;
  shouldfade?: boolean;
}

const useStyles = makeStyles((theme) => ({
  link: {
    transition: "0.5s",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  linkFaded: {
    color: theme.palette.text.disabled,
  },
}));

export const InTextLink = React.memo<
  IProps &
    DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
>((props) => {
  const classes = useStyles();
  const { text, href, shouldfade, ...others } = props;
  return (
    <a
      className={clsx(classes.link, shouldfade ? classes.linkFaded : null)}
      href={href || ""}
      target={"_blank"}
      rel={"noopener noreferrer"}
      // style={{ display: "inline" }}
      {...others}
    >
      {text}
    </a>
  );
});
