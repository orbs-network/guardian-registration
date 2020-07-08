import { PromiEvent, TransactionReceipt } from "web3-core";

export interface IGuardiansV2Service {
  setFromAccount: (address: string) => void;
  isRegisteredGuardian: (address: string) => Promise<boolean>;
  getGuardianInfo: (address: string) => Promise<any>;
  registerGuardian: (
    ip: string,
    orbsAddr: string,
    name: string,
    website: string,
    contact: string
  ) => PromiEvent<TransactionReceipt>;
}
