import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";

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

export const Page = React.memo<IProps>((props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.page}>
      {/* DEV_NOTE : Adding 'toolbar' to keep with the tile */}
      <Toolbar />
      {children}
    </div>
  );
});
