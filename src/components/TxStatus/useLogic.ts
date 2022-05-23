import { useState, useEffect, useRef } from "react";
import useInterval from "../../hooks/useInterval";
import transactionService from "../../services/TransactionService";
import { useOrbsAccountStore } from "../../store/storeHooks";
const AMOUNT_OF_ATTEMPTS = 150;

function useLogic() {
  const [show, setShow] = useState(false);
  const { set, clear } = useInterval(1500);
  const { txHash } = useOrbsAccountStore();
  const attempts = useRef(0);
  const checkIfTransationPending = async (hash: string) => {
    const isPending = await transactionService.getIsTransactionPending(hash);
    if (!isPending || AMOUNT_OF_ATTEMPTS === attempts.current) {
      clearHash();
    }
    attempts.current++;
  };

  useEffect(() => {
    if (show && txHash) {
      clearHash();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash]);

  const clearHash = () => {
    setShow(false);
    transactionService.clearTransactionHash();
    clear();
  };

  useEffect(() => {
    const hash = transactionService.getTransactionHash();
    if (hash) {
      setShow(true);
      set(checkIfTransationPending.bind(null, JSON.parse(hash)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return show;
}

export default useLogic;
