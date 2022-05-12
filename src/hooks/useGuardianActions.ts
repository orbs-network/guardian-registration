import { TGuardianRegistrationPayload } from "@orbs-network/contracts-js";
import { MobXProviderContext } from "mobx-react";
import { useSnackbar } from "notistack";
import { useCallback, useContext } from "react";
import { REGISTER_CHAIN_PARAM, UNREGISTER_CHAIN_PARAM } from "../constants";
import { useOrbsAccountStore } from "../store/storeHooks";
import { useModalsTranslations } from "../translations/translationsHooks";

function useGuardianActions() {
  const orbsAccountStore = useOrbsAccountStore();
  const { enqueueSnackbar } = useSnackbar();
  const { chainId } = useContext(MobXProviderContext);

  const modalsTranslations = useModalsTranslations();
  const unregisterGuardian = useCallback(async (callback?: () => void) => {
    try {
      const txRes = await orbsAccountStore.unregisterGuardian();

      if (txRes) {
        enqueueSnackbar(modalsTranslations("successMessage_unregister"), {
          variant: "success",
        });

        const withoutCurrentChain = orbsAccountStore.registeredChains.filter(
          (m) => m !== Number(chainId)
        );

        if (withoutCurrentChain.length > 0) {
          window.location.replace(
            `/?${UNREGISTER_CHAIN_PARAM}=${withoutCurrentChain[0]}`
          );
        } else {
          window.history.replaceState(null, "/", window.location.pathname);
          if(callback){
            callback()
          }
        }
      }
    } catch (e: any) {
      enqueueSnackbar(
        modalsTranslations("errorMessage_unregister", {
          errorMessage: e.message,
        }),
        {
          variant: "error",
        }
      );
    }
  }, [enqueueSnackbar, modalsTranslations, orbsAccountStore, chainId]);

  const registerGuardian = useCallback(
    async (guardianRegistrationPayload: TGuardianRegistrationPayload, callback?: () => void) => {
      const { ip, orbsAddr, name, website } = guardianRegistrationPayload;
      try {
        const txRes = await orbsAccountStore.registerGuardian(
          guardianRegistrationPayload
        );
        if (txRes) {
          enqueueSnackbar(modalsTranslations("successMessage_register"), {
            variant: "success",
          });
          const withoutCurrentChain =
            orbsAccountStore.unregisteredChains.filter(
              (m) => m !== Number(chainId)
            );
          if (withoutCurrentChain.length > 0) {
            window.location.replace(
              `/?${REGISTER_CHAIN_PARAM}=${withoutCurrentChain[0]}&ip=${ip}&orbsAddr=${orbsAddr}&name=${name}&website=${website}`
            );
          } else {
            window.history.replaceState(null, "/", window.location.pathname);
            if(callback){
              callback()
            }
          }
        }
      } catch (e: any) {
        enqueueSnackbar(`Error in 'Guardian Registration' TX ${e.message}`, {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, modalsTranslations, orbsAccountStore, chainId]
  );

  return { unregisterGuardian, registerGuardian };
}

export default useGuardianActions;
