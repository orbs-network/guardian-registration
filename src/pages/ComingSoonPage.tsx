import React, { useCallback } from "react";
import { CssBaseline, Typography, useTheme } from "@material-ui/core";
import { NoEthereumProviderSection } from "./NoEthereumProviderSection";
import { useBoolean } from "react-hanger";
import { ContentContainer } from "../components/structure/ContentContainer";
import { Background } from "../components/structure/Background";
import { Header } from "../components/structure/Header";
import { Page } from "../components/structure/Page";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.secondary.light,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));

export const ComingSoonPage = React.memo<IProps>((props) => {
  const classes = useStyles();

  return (
    <>
      {/*<Header />*/}
      <main className="App" style={{ height: "100%" }}>
        <Background />
        <ContentContainer id={"appContainer"}>
          <Page>
            <Typography variant={"h3"}>Coming Soon !</Typography>
            <Typography variant={"h4"}>Stay tuned :) </Typography>
            <br />
            <Typography>
              For now, please visit{" "}
              <a
                className={classes.link}
                href={"https://orbs-network.github.io/voting/"}
              >
                Hedron
              </a>
            </Typography>
          </Page>
        </ContentContainer>
        <CssBaseline />
      </main>
    </>
  );
});
