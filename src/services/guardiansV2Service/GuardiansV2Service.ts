import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import ValidatorsRegistrationContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/ValidatorsRegistration.json";
import { IGuardiansV2Service } from "./IGuardiansV2Service";

// TODO : O.L : Fill it up after deploying,
const MAIN_NET_VALIDATORS_REGISTRATION_ADDRESS = "";

export class GuardiansV2Service implements IGuardiansV2Service {
  private validatorsRegistrationContract: Contract;

  constructor(
    private web3: Web3,
    validatorsRegistrationAddress: string = MAIN_NET_VALIDATORS_REGISTRATION_ADDRESS
  ) {
    this.validatorsRegistrationContract = new this.web3.eth.Contract(
      ValidatorsRegistrationContractJson.abi as AbiItem[],
      validatorsRegistrationAddress
    );
  }
}
