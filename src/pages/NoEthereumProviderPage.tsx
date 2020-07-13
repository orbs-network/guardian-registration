import React, { useCallback } from "react";
import { CssBaseline, useTheme } from "@material-ui/core";
import { NoEthereumProviderSection } from "./NoEthereumProviderSection";
import { useBoolean } from "react-hanger";
import { ContentContainer } from "../components/structure/ContentContainer";
import { Background } from "../components/structure/Background";
import { Header } from "../components/structure/Header";

type TWalletConnectionPhase = "install" | "connect";

interface IProps {}

export const NoEthereumProviderPage = React.memo<IProps>((props) => {
  const hasPressed = useBoolean(false);

  const installMetaMask = useCallback(() => {
    window.open("https://metamask.io/", "_blank");
    hasPressed.setTrue();
  }, [hasPressed]);

  return (
    <main className="App" style={{ height: "100%" }}>
      <Background prismVersion={"0.5"} />
      <Header />
      <ContentContainer id={"appContainer"}>
        <NoEthereumProviderSection
          walletConnectionPhase={"install"}
          actionFunction={installMetaMask}
        />
      </ContentContainer>
      <CssBaseline />
    </main>
  );
});
