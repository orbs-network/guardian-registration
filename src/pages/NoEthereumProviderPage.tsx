import React, { useCallback } from "react";
import { CssBaseline, useTheme } from "@material-ui/core";
import { NoEthereumProviderSection } from "../components/ethereumConnection/NoEthereumProviderSection";
import { useBoolean } from "react-hanger";
import { ContentContainer } from "../components/structure/ContentContainer";
import { Background } from "../components/structure/Background";
import { Header } from "../components/structure/Header";
import { Page } from "../components/structure/Page";
import { makeStyles } from "@material-ui/core/styles";

type TWalletConnectionPhase = "install" | "connect";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  app: {
    minHeight: `100%`,
    flex: 1,
    backgroundColor: "#06142e",
    backgroundRepeat: "repeat-y",
    backgroundImage:
      "url(https://www.orbs.com/wp-content/uploads/2019/02/technology-background1.png)",
    backgroundAttachment: "scroll",
    backgroundPosition: "top center",
  },
}));

export const NoEthereumProviderPage = React.memo<IProps>((props) => {
  const classes = useStyles();
  const hasPressed = useBoolean(false);

  const installMetaMask = useCallback(() => {
    window.open("https://metamask.io/", "_blank");
    hasPressed.setTrue();
  }, [hasPressed]);

  return (
    <>
      <Header />
      <main className={classes.app}>
        <ContentContainer id={"appContainer"}>
          <Page>
            <NoEthereumProviderSection
              walletConnectionPhase={"install"}
              actionFunction={installMetaMask}
            />
          </Page>
        </ContentContainer>
        <CssBaseline />
      </main>
    </>
  );
});
