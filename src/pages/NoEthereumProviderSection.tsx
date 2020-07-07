import React from "react";
import { Button, useTheme } from "@material-ui/core";

type TWalletConnectionPhase = "install" | "connect";

interface IProps {
  walletConnectionPhase: TWalletConnectionPhase;
  actionFunction: () => void;
  pressedOnInstall?: boolean;
}

export const NoEthereumProviderSection = React.memo<IProps>((props) => {
  const theme = useTheme();
  const { walletConnectionPhase, actionFunction, pressedOnInstall } = props;

  const shouldDisplayLegalTicker = walletConnectionPhase === "connect";

  const buttonText =
    walletConnectionPhase === "install" ? "Install" : "Connect";

  return (
    <div>
      NoEthereumProviderSection
      <Button onClick={actionFunction}>{buttonText}</Button>
    </div>
  );
});
