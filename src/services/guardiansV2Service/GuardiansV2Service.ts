import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import ValidatorsRegistrationContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/ValidatorsRegistration.json";
import {
  IGuardiansV2Service,
  TGuardianInfoResponse,
  TGuardianRegistrationPayload,
  TGuardianUpdatePayload,
} from "./IGuardiansV2Service";
import { ValidatorsRegistration } from "../../contracts/ValidatorsRegistration";
import { PromiEvent, TransactionReceipt } from "web3-core";

// TODO : O.L : Fill it up after deploying,
const MAIN_NET_VALIDATORS_REGISTRATION_ADDRESS = "";

export class GuardiansV2Service implements IGuardiansV2Service {
  private validatorsRegistrationContract: ValidatorsRegistration;

  constructor(
    private web3: Web3,
    validatorsRegistrationAddress: string = MAIN_NET_VALIDATORS_REGISTRATION_ADDRESS
  ) {
    this.validatorsRegistrationContract = (new this.web3.eth.Contract(
      ValidatorsRegistrationContractJson.abi as AbiItem[],
      validatorsRegistrationAddress
    ) as any) as ValidatorsRegistration;
  }

  setFromAccount(address: string): void {
    this.validatorsRegistrationContract.options.from = address;
  }

  public async isRegisteredGuardian(address: string): Promise<boolean> {
    return this.validatorsRegistrationContract.methods
      .isRegistered(address)
      .call();
  }

  public async readGuardianInfo(
    address: string
  ): Promise<TGuardianInfoResponse> {
    const rawResponse = await this.validatorsRegistrationContract.methods
      .getValidatorData(address)
      .call();

    const {
      registration_time,
      orbsAddr,
      name,
      last_update_time,
      ip,
      contact,
      website,
    } = rawResponse;

    const guardianInfoResponse: TGuardianInfoResponse = {
      contact,
      ip,
      lastUpdateTime: parseInt(last_update_time),
      name,
      orbsAddr,
      registrationTime: parseInt(registration_time),
      website,
    };

    return guardianInfoResponse;
  }

  public async readGuardianDistributionFrequency(address: string) {
    const REWARDS_FREQUENCY_KEY = "REWARDS_FREQUENCY_SEC";
    const rewardsFrequency = await this.validatorsRegistrationContract.methods
      .getMetadata(address, REWARDS_FREQUENCY_KEY)
      .call();

    if (!!rewardsFrequency || !rewardsFrequency.length) {
      return 0;
    }

    return rewardsFrequency;
  }

  public registerGuardian(
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ): PromiEvent<TransactionReceipt> {
    const {
      website,
      name,
      orbsAddr,
      ip,
      contact,
    } = guardianRegistrationPayload;
    return this.validatorsRegistrationContract.methods
      .registerValidator(ip, orbsAddr, name, website, contact)
      .send();
  }

  public updateGuardianInfo(
    guardianUpdatePayload: TGuardianUpdatePayload
  ): PromiEvent<TransactionReceipt> {
    const { contact, ip, name, orbsAddr, website } = guardianUpdatePayload;
    return this.validatorsRegistrationContract.methods
      .updateValidator(ip, orbsAddr, name, website, contact)
      .send();
  }
}
