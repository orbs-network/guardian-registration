import { PromiEvent, TransactionReceipt } from "web3-core";

export interface IGuardiansV2Service {
  setFromAccount: (address: string) => void;
  isRegisteredGuardian: (address: string) => Promise<boolean>;
  readGuardianInfo: (address: string) => Promise<TGuardianInfoResponse>;
  registerGuardian: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => PromiEvent<TransactionReceipt>;
  updateGuardianInfo: (
    guardianUpdatePayload: TGuardianUpdatePayload
  ) => PromiEvent<TransactionReceipt>;
}

export type TGuardianInfoPayload = {
  ip: string;
  orbsAddr: string;
  name: string;
  website: string;
  contact: string;
};

export type TGuardianRegistrationPayload = TGuardianInfoPayload;
export type TGuardianUpdatePayload = TGuardianInfoPayload;

export type TGuardianInfoResponse = {
  ip: string;
  orbsAddr: string;
  name: string;
  website: string;
  contact: string;
  registrationTime: string;
  lastUpdateTime: string;
};
