import { MobXProviderContext, observer } from "mobx-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ActionConfirmationModal } from "../components/shared/modals/ActionConfirmationModal";
import configs from "../configs";
import { REGISTER_CHAIN_PARAM, UNREGISTER_CHAIN_PARAM } from "../constants";
import useGuardianActions from "../hooks/useGuardianActions";
import LoadingModal from "../pages/GuardiandRegisterOrEdit/guardianRegister/LoadingModal";
import { useOrbsAccountStore } from "../store/storeHooks";
import {
  useGuardianEditPageTranslations,
  useRegisterGuardianSectionTranslations,
} from "../translations/translationsHooks";
import { getParamsFromUrl } from "../utils/utils";
import { triggerNetworkChange } from "../utils/web3";

const getChainName = (chain?: string | number) => {
  if (!chain) {
    return;
  }
  return configs.networks[chain].name;
};

const RegisterAndUnregister = observer(() => {
  const { chainId } = useContext(MobXProviderContext);
  const [showUnregisterPopup, setShowUnregisterPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [actionChain, setActionChain] = useState("");
  const orbsAccountStore = useOrbsAccountStore();
  const { unregisterGuardian, registerGuardian } = useGuardianActions();
  const needToSwitchChain = chainId !== actionChain;
  const chainName = useMemo(() => getChainName(actionChain), [actionChain]);
  const guardianEditPageTranslations = useGuardianEditPageTranslations();
  const registerGuardianSectionTranslations =
    useRegisterGuardianSectionTranslations();

  useEffect(() => {
    const unregisterChain = getParamsFromUrl(UNREGISTER_CHAIN_PARAM);
    const registerChain = getParamsFromUrl(REGISTER_CHAIN_PARAM);
    if (unregisterChain) {
      setShowUnregisterPopup(true);
      setActionChain(unregisterChain);
    } else if (registerChain) {
      setShowRegisterPopup(true);
      setActionChain(registerChain);
    }
  }, [chainId]);

  const switchNetwork = () => {
    const network = configs.networks[actionChain];
    if (!network) {
      return;
    }
    const {
      nativeCurrency,
      rpcUrls,
      blockExplorerUrls,
      name: chainName,
    } = network;
    triggerNetworkChange(actionChain, {
      chainName,
      nativeCurrency,
      rpcUrls,
      blockExplorerUrls,
    });
  };

  const onUnregisterAccept = () => {
    if (needToSwitchChain) {
      switchNetwork();
    } else {
      unregisterGuardian(() => setShowUnregisterPopup(false));
    }
  };

  const onRegisterClick = () => {
    if (needToSwitchChain) {
      switchNetwork();
    } else {
      const data = {
        ip: getParamsFromUrl("ip")!!,
        website: getParamsFromUrl("website")!!,
        orbsAddr: getParamsFromUrl("orbsAddr")!!,
        name: getParamsFromUrl("name")!!,
      };
      registerGuardian(data, () => setShowRegisterPopup(false));
    }
  };

  return (
    <>
      {orbsAccountStore.txPending && (
        <LoadingModal chain={chainId} txHash={orbsAccountStore.txHash} />
      )}

      <ActionConfirmationModal
        title={
          <>
            {needToSwitchChain ? (
              <>
                {guardianEditPageTranslations(
                  "you_have_successfully_unregistered_on",
                  { network: getChainName(chainId) }
                )}
                . <br />
                {guardianEditPageTranslations("proceed_to_unregistering_on", {
                  network: getChainName(orbsAccountStore.registeredChains[0]),
                })}
                .
              </>
            ) : (
              `${guardianEditPageTranslations("proceed_to_unregistering_on", {
                network: getChainName(chainId),
              })}.`
            )}
          </>
        }
        contentText=""
        instructionText=""
        open={showUnregisterPopup}
        acceptText={
          needToSwitchChain
            ? `${guardianEditPageTranslations("switch_to", {
                network: chainName,
              })}`
            : guardianEditPageTranslations("proceed")
        }
        onAccept={onUnregisterAccept}
      />
      <ActionConfirmationModal
        title={
          needToSwitchChain ? (
            <>
              {guardianEditPageTranslations(
                "you_have_successfully_unregistered_on",
                { network: getChainName(chainId) }
              )}
              .
              <br />
              {registerGuardianSectionTranslations('proceed_registering_on', {network: getChainName(orbsAccountStore.unregisteredChains[0])})}
              
            </>
          ) : (
            `${registerGuardianSectionTranslations("proceed_registering_on", {
              network: getChainName(chainId),
            })}.`
          )
        }
        contentText=""
        instructionText=""
        open={showRegisterPopup}
        acceptText={
          needToSwitchChain
            ? `${guardianEditPageTranslations("switch_to", {
                network: chainName,
              })}`
            : guardianEditPageTranslations("proceed")
        }
        cancelText="no"
        onAccept={onRegisterClick}
      />
    </>
  );
});

export default RegisterAndUnregister;
