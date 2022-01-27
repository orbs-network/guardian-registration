import Web3 from "web3";
import { delay } from "../utils/utils";
export const TX_HASH_LOCAL_STORAGE = "TX_HASH";
class TransactionService {
  async getTransaction(hash: string) {
    try {
      const web3 = new Web3(Web3.givenProvider);

      return web3.eth.getTransactionReceipt(hash);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getIsTransactionPending(hash: string) {
    try {
      const isDone = await this.getTransaction(hash);
      return !isDone ? true : false;
    } catch (error) {}
  }

  setTransactionHash(hash: string) {
    localStorage.setItem(TX_HASH_LOCAL_STORAGE, JSON.stringify(hash));
  }

  getTransactionHash() {
    return localStorage.getItem(TX_HASH_LOCAL_STORAGE) || undefined;
  }

  clearTransactionHash() {
    localStorage.removeItem(TX_HASH_LOCAL_STORAGE);
  }

  onReceiptConfirmation = async (confirmationBlock: number) => {
    let stopped = false;
    const web3 = new Web3(Web3.givenProvider);
    // infinite loop
    while (!stopped) {
      await delay(1000);
      const latestBlock = await web3.eth.getBlockNumber();
      if (latestBlock >= confirmationBlock) {
      
        stopped = true;
        return true;
      }
    }
  };
}

export default new TransactionService();
