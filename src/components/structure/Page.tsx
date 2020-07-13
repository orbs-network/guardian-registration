import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  page: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // border: "1px solid black",
    width: "fit-content",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: "2em",
    // paddingTop: 0,
    // paddingBottom: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const Page = React.memo<IProps>((props) => {
  const { children } = props;
  const classes = useStyles();

  return <div className={classes.page}>{children}</div>;
});
