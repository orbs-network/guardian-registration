import React from "react";
import { Container, ContainerProps, useMediaQuery } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";

export const ContentContainer = React.memo<ContainerProps>((props) => {
  const theme = useTheme();
  const smallOrSmaller = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container component={"main"} disableGutters={smallOrSmaller} {...props} />
  );
});
