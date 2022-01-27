import { useEffect } from "react";
import React from "react";
import { useSnackbar } from "notistack";
import { useCryptoWalletConnectionService } from "../services/servicesHooks";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../store/storeHooks";
import { useModalsTranslations } from "../translations/translationsHooks";

function useLogic() {
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
  const cryptoWalletConnectionService = useCryptoWalletConnectionService();
  const orbsAccountStore = useOrbsAccountStore();
  const { enqueueSnackbar } = useSnackbar();

  const isConnected = cryptoWalletIntegrationStore.isConnectedToWallet;
  const modalsTranslations = useModalsTranslations();

  // Alert about TX error if happened
  const txHadError = orbsAccountStore.txHadError;
  useEffect(() => {
    if (txHadError) {
      enqueueSnackbar("Error in Transaction", {
        variant: "error",
        autoHideDuration: 7000,
      });
    }
  }, [enqueueSnackbar, txHadError]);

  // Alert about TX cancelation  if happened
  const txCanceled = orbsAccountStore.txCanceled;
  useEffect(() => {
    if (txCanceled) {
      enqueueSnackbar(modalsTranslations("message_txCanceled"), {
        variant: "info",
      });
    }
  }, [enqueueSnackbar, modalsTranslations, txCanceled]);

  return {cryptoWalletIntegrationStore,cryptoWalletConnectionService, isConnected };
}

export default useLogic;
