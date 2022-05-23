import { TGuardianRegistrationPayload } from "@orbs-network/contracts-js";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useNetwork } from "../../../hooks/useWeb3";
import { useCryptoWalletConnectionService } from "../../../services/servicesHooks";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../../store/storeHooks";
import { useModalsTranslations } from "../../../translations/translationsHooks";

function useLogic() {
  const { enqueueSnackbar } = useSnackbar();
  const cryptoWalletIntegrationService = useCryptoWalletConnectionService();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
  const orbsAccountStore = useOrbsAccountStore();
  const chain = useNetwork();
  const modalsTranslations = useModalsTranslations();
  const registerGuardian = useCallback(
    async (guardianRegistrationPayload: TGuardianRegistrationPayload) => {
      try {
        const txRes = await orbsAccountStore.registerGuardian(
          guardianRegistrationPayload
        );
        if (txRes) {
          enqueueSnackbar(
            modalsTranslations("successMessage_register"),
            {
              variant: "success",
            }
          );
        }
      } catch (e: any) {
        enqueueSnackbar(`Error in 'Guardian Registration' TX ${e.message}`, {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, modalsTranslations, orbsAccountStore]
  );

  const unDelegate = useCallback(async () => {
    try {
      await orbsAccountStore.unDelegateCurrentDelegation();
    } catch (e: any) {
      enqueueSnackbar(`Error in 'un-delegating' TX ${e.message}`, {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, orbsAccountStore]);
  return {
    unDelegate,
    registerGuardian,
    cryptoWalletIntegrationService,
    cryptoWalletIntegrationStore,
    orbsAccountStore,
    chain,
  };
}

export default useLogic;
