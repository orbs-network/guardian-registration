import React, { useCallback } from "react";
import { useTheme } from "@material-ui/core";
import { NoEthereumProviderSection } from "./NoEthereumProviderSection";
import { useBoolean } from "react-hanger";

type TWalletConnectionPhase = "install" | "connect";

interface IProps {}

export const NoEthereumProviderPage = React.memo<IProps>((props) => {
  const theme = useTheme();
  const hasPressed = useBoolean(false);

  const installMetaMask = useCallback(() => {
    window.open("https://metamask.io/", "_blank");
    hasPressed.setTrue();
  }, [hasPressed]);

  return (
    <div style={{ backgroundColor: "gray" }}>
      <NoEthereumProviderSection
        walletConnectionPhase={"install"}
        actionFunction={installMetaMask}
      />
    </div>
  );
});
