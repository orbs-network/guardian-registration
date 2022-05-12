import { MobXProviderContext, observer } from "mobx-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ActionConfirmationModal } from "../components/shared/modals/ActionConfirmationModal";
import configs from "../configs";
import { REGISTER_CHAIN_PARAM, UNREGISTER_CHAIN_PARAM } from "../constants";
import useGuardianActions from "../hooks/useGuardianActions";
import LoadingModal from "../pages/GuardiandRegisterOrEdit/guardianRegister/LoadingModal";
import { useOrbsAccountStore } from "../store/storeHooks";
import { getParamsFromUrl } from "../utils/utils";
import { triggerNetworkChange } from "../utils/web3";

const getChainName = (chain?: string) => {
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


  const onClick = () => {
    window.history.replaceState(null, '/', '/?test=123');
  }

  return (
    <>
    <button style={{marginTop: '200px'}} onClick={onClick}>test</button>
      {orbsAccountStore.txPending && (
        <LoadingModal chain={chainId} txHash={orbsAccountStore.txHash} />
      )}

      <ActionConfirmationModal
        title={`Please unregister from ${chainName}`}
        contentText=""
        instructionText=""
        open={showUnregisterPopup}
        acceptText={needToSwitchChain ? `Switch to ${chainName}` : "Proceed"}
        onAccept={onUnregisterAccept}
      />
      <ActionConfirmationModal
        title={`Please register to ${chainName}`}
        contentText=""
        instructionText=""
        open={showRegisterPopup}
        acceptText={needToSwitchChain ? `Switch to ${chainName}` : "Proceed"}
        cancelText="no"
        onAccept={onRegisterClick}
      />
    </>
  );
});

export default RegisterAndUnregister;
