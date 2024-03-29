import React, { DetailedHTMLProps } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import { Footer } from "./Footer";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // border: "1px solid black",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "2em",
    height: "100%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const Page = React.memo<
  IProps &
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props) => {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={classes.page} {...rest}>
      {/* DEV_NOTE : Adding 'toolbar' to keep with the tile */}
      <Toolbar />
      {children}
    </div>
  );
});
