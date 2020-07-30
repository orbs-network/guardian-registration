import React, { useCallback } from "react";
import { CssBaseline, useTheme } from "@material-ui/core";
import { NoEthereumProviderSection } from "../components/ethereumConnection/NoEthereumProviderSection";
import { useBoolean } from "react-hanger";
import { ContentContainer } from "../components/structure/ContentContainer";
import { Background } from "../components/structure/Background";
import { Header } from "../components/structure/Header";
import { Page } from "../components/structure/Page";

type TWalletConnectionPhase = "install" | "connect";

interface IProps {}

export const NoEthereumProviderPage = React.memo<IProps>((props) => {
  const hasPressed = useBoolean(false);

  const installMetaMask = useCallback(() => {
    window.open("https://metamask.io/", "_blank");
    hasPressed.setTrue();
  }, [hasPressed]);

  return (
    <>
      <Header />
      <main className="App" style={{ height: "100%" }}>
        <Background />
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
