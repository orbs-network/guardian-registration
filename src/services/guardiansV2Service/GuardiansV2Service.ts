import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import ValidatorsRegistrationContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/ValidatorsRegistration.json";
import { IGuardiansV2Service } from "./IGuardiansV2Service";
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

  public async getGuardianInfo(address: string) {
    return (
      this.validatorsRegistrationContract.methods
        .getValidatorData(address)
        // .getMetadata(address, "key")
        .call()
    );
  }

  public registerGuardian(
    ip: string,
    orbsAddr: string,
    name: string,
    website: string,
    contact: string
  ): PromiEvent<TransactionReceipt> {
    return this.validatorsRegistrationContract.methods
      .registerValidator(ip, orbsAddr, name, website, contact)
      .send();
  }
}
