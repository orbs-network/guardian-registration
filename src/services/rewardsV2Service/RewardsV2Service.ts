import {
  IRewardsV2Service,
  TGuardianRewardsSettings,
  TRewardsContractSettings,
} from "./IRewardsV2Service";
import { PromiEvent, TransactionReceipt } from "web3-core";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import RewardsContractJson from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/Rewards.json";
import { Rewards } from "../../contracts/Rewards";

// TODO : O.L : Fill it up after deploying,
const MAIN_NET_REWARDS_CONTRACT_ADDRESS = "";

// DEV_NOTE : The value is between 0-100% with precision of 0.001,
//            The value is save as an integer in the contract, 0-100,000.
//            So we will need to divide/multiply when reading/writing.
const DELEGATORS_PERCENTAGE_FACTOR = 1_000;

export class RewardsV2Service implements IRewardsV2Service {
  private rewardsContract: Rewards;

  constructor(
    private web3: Web3,
    rewardsContractAddress: string = MAIN_NET_REWARDS_CONTRACT_ADDRESS
  ) {
    this.rewardsContract = (new this.web3.eth.Contract(
      RewardsContractJson.abi as AbiItem[],
      rewardsContractAddress
    ) as any) as Rewards;
  }

  setFromAccount(address: string): void {
    this.rewardsContract.options.from = address;
  }

  public async readContractRewardsSettings(): Promise<
    TRewardsContractSettings
  > {
    const settings = await this.rewardsContract.methods.getSettings().call();

    const processedSettings: TRewardsContractSettings = {
      defaultDelegatorsStakingRewardsPercent: percentageFromMillies(
        parseInt(settings.defaultDelegatorsStakingRewardsPercentMille)
      ),
      maxDelegatorsStakingRewardsPercent: percentageFromMillies(
        parseInt(settings.maxDelegatorsStakingRewardsPercentMille)
      ),
    };

    return processedSettings;
  }

  public async readGuardianRewardsSettings(
    address: string
  ): Promise<TGuardianRewardsSettings> {
    const rawGuardianRewardsSettings = await this.rewardsContract.methods
      .guardiansRewardSettings(address)
      .call();

    // const rawGuardianRewardsSettings = {};

    const guardianRewardsSettings: TGuardianRewardsSettings = {
      delegatorsStakingRewardsPercent: percentageFromMillies(
        parseInt(
          rawGuardianRewardsSettings.delegatorsStakingRewardsPercentMille
        )
      ),
      isUsingDefaultRewardsPercent: !rawGuardianRewardsSettings.overrideDefault,
    };

    return guardianRewardsSettings;
  }

  public async readDelegatorsCutPercentage(address: string): Promise<number> {
    const cutPercentageInMillies = await this.rewardsContract.methods
      .getGuardianDelegatorsStakingRewardsPercentMille(address)
      .call();

    const cutPercentage = percentageFromMillies(
      parseInt(cutPercentageInMillies)
    );

    return cutPercentage;
  }

  public setDelegatorsCutPercentage(
    delegatorsCutPercentage: number
  ): PromiEvent<TransactionReceipt> {
    const delegatorsCutInMillies = milliesFromPercentage(
      delegatorsCutPercentage
    );

    return this.rewardsContract.methods
      .setGuardianDelegatorsStakingRewardsPercentMille(delegatorsCutInMillies)
      .send();
  }
}

const milliesFromPercentage = (percentage: number) =>
  percentage * DELEGATORS_PERCENTAGE_FACTOR;
const percentageFromMillies = (millies: number) =>
  millies / DELEGATORS_PERCENTAGE_FACTOR;
