import React from "react";
import { Container, ContainerProps, useMediaQuery } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const ContentContainer = React.memo<ContainerProps>((props) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      className={classes.centeredContainer}
      component={"main"}
      disableGutters={smallOrSmaller}
      {...props}
    />
  );
});
