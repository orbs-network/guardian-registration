import { PromiEvent, TransactionReceipt } from "web3-core";

export interface IGuardiansV2Service {
  setFromAccount: (address: string) => void;
  isRegisteredGuardian: (address: string) => Promise<boolean>;
  readGuardianInfo: (address: string) => Promise<TGuardianInfoResponse>;
  readGuardianDistributionFrequencyInSeconds: (
    address: string
  ) => Promise<number>;

  setDelegatorsCut: (delegatorsCut: number) => PromiEvent<TransactionReceipt>;
  setGuardianId: (guardianId: string) => PromiEvent<TransactionReceipt>;

  /**
   *
   * @deprecated
   */
  setGuardianDistributionFrequency: (
    frequencyInSeconds: number
  ) => PromiEvent<TransactionReceipt>;
  registerGuardian: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => PromiEvent<TransactionReceipt>;
  updateGuardianInfo: (
    guardianUpdatePayload: TGuardianUpdatePayload
  ) => PromiEvent<TransactionReceipt>;
  unregisterGuardian: () => PromiEvent<TransactionReceipt>;
}

export type TGuardianInfoPayload = {
  ip: string;
  orbsAddr: string;
  name: string;
  website: string;
  // contact: string;
};

export type TGuardianRegistrationPayload = TGuardianInfoPayload;
export type TGuardianUpdatePayload = TGuardianInfoPayload;

export type TGuardianInfoResponse = {
  ip: string;
  orbsAddr: string;
  name: string;
  website: string;
  // contact: string;
  /**
   * Unix timestamp
   */
  registrationTime: number;
  /**
   * Unix timestamp
   */
  lastUpdateTime: number;
};
