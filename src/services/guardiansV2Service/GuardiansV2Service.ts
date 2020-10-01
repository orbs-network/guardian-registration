import Web3 from "web3";
import { AbiItem } from "web3-utils";
import GuardiansRegistrationContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/GuardiansRegistration.json";
import {
  IGuardiansV2Service,
  TGuardianInfoResponse,
  TGuardianRegistrationPayload,
  TGuardianUpdatePayload,
} from "./IGuardiansV2Service";
import { GuardiansRegistration } from "../../contracts/GuardiansRegistration";
import { PromiEvent, TransactionReceipt } from "web3-core";
import {
  EMPTY_GUARDIAN_REWARDS_FREQUENCY_VALUE,
  GUARDIAN_ID_KEY,
  REWARDS_FREQUENCY_KEY,
} from "./GuardiansV2ServiceConstants";
import { ipv4ToHex } from "../../utils/utils";

// TODO : O.L : Fill it up after deploying,
const MAIN_NET_GUARDIANS_REGISTRATION_ADDRESS =
  "0xd095e7310616376BDeD74Afc7e0400E6d0894E6F";

export class GuardiansV2Service implements IGuardiansV2Service {
  private guardiansRegistrationContract: GuardiansRegistration;

  constructor(
    private web3: Web3,
    guardiansRegistrationAddress: string = MAIN_NET_GUARDIANS_REGISTRATION_ADDRESS
  ) {
    this.guardiansRegistrationContract = (new this.web3.eth.Contract(
      GuardiansRegistrationContractJson.abi as AbiItem[],
      guardiansRegistrationAddress
    ) as any) as GuardiansRegistration;
  }

  setFromAccount(address: string): void {
    this.guardiansRegistrationContract.options.from = address;
  }

  public async isRegisteredGuardian(address: string): Promise<boolean> {
    return this.guardiansRegistrationContract.methods
      .isRegistered(address)
      .call();
  }

  public async readGuardianInfo(
    address: string
  ): Promise<TGuardianInfoResponse> {
    const rawResponse = await this.guardiansRegistrationContract.methods
      .getGuardianData(address)
      .call();

    const {
      registration_time,
      orbsAddr,
      name,
      last_update_time,
      ip,
      website,
    } = rawResponse;

    const guardianInfoResponse: TGuardianInfoResponse = {
      // contact,
      ip,
      lastUpdateTime: parseInt(last_update_time),
      name,
      orbsAddr,
      registrationTime: parseInt(registration_time),
      website,
    };

    return guardianInfoResponse;
  }

  public async readGuardianDistributionFrequencyInSeconds(
    address: string
  ): Promise<number> {
    const rewardsFrequency = await this.guardiansRegistrationContract.methods
      .getMetadata(address, REWARDS_FREQUENCY_KEY)
      .call();

    if (!rewardsFrequency || !rewardsFrequency.length) {
      return EMPTY_GUARDIAN_REWARDS_FREQUENCY_VALUE;
    }

    return parseInt(rewardsFrequency);
  }

  public async readGuardianId(address: string): Promise<string | null> {
    const guardianId = await this.guardiansRegistrationContract.methods
      .getMetadata(address, GUARDIAN_ID_KEY)
      .call();

    if (!guardianId || !guardianId.length) {
      return null;
    }

    return guardianId;
  }

  public setGuardianId(guardianId: string): PromiEvent<TransactionReceipt> {
    return this.guardiansRegistrationContract.methods
      .setMetadata(GUARDIAN_ID_KEY, guardianId)
      .send();
  }

  public setGuardianDistributionFrequency(
    frequencyInSeconds: number
  ): PromiEvent<TransactionReceipt> {
    return this.guardiansRegistrationContract.methods
      .setMetadata(REWARDS_FREQUENCY_KEY, frequencyInSeconds.toString())
      .send();
  }

  public registerGuardian(
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ): PromiEvent<TransactionReceipt> {
    const { website, name, orbsAddr, ip } = guardianRegistrationPayload;

    const ipAsHex = ipv4ToHex(ip);

    return this.guardiansRegistrationContract.methods
      .registerGuardian(ipAsHex, orbsAddr, name, website)
      .send();
  }

  public updateGuardianInfo(
    guardianUpdatePayload: TGuardianUpdatePayload
  ): PromiEvent<TransactionReceipt> {
    const { ip, name, orbsAddr, website } = guardianUpdatePayload;
    const ipAsHex = ipv4ToHex(ip);

    return this.guardiansRegistrationContract.methods
      .updateGuardian(ipAsHex, orbsAddr, name, website)
      .send();
  }

  public unregisterGuardian(): PromiEvent<TransactionReceipt> {
    return this.guardiansRegistrationContract.methods
      .unregisterGuardian()
      .send();
  }
}
