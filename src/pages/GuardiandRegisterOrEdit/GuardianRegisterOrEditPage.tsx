import React, { useMemo } from "react";
import { observer } from "mobx-react";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../store/storeHooks";
import { EditGuardianInfoSection } from "./EditGuardianInfoSection";
import { RegisterGuardianSection } from "./RegisterGuardianSection";
import { RewardsDistributionFrequencyForm } from "./RewardsDistributionFrequencyForm";

interface IProps {}

export const GuardiansRegisterOrEditPage = observer<
  React.FunctionComponent<IProps>
>((props) => {
  const {} = props;

  const orbsAccountStore = useOrbsAccountStore();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

  // TODO : ORL : Organize all of this loading "ifs
  if (orbsAccountStore.errorLoading) {
    return <div>Error loading</div>;
  }

  if (!orbsAccountStore.doneLoading) {
    return <div>Loading...</div>;
  }

  if (orbsAccountStore.isGuardian) {
    return (
      <>
        <EditGuardianInfoSection
          guardianInfo={orbsAccountStore.guardianInfo}
          guardianAddress={cryptoWalletIntegrationStore.mainAddress}
          guardianRegistrationTimeInfo={
            orbsAccountStore.guardianContractInteractionTimes
          }
          updateGuardianDetails={(guardianRegistrationPayload) =>
            orbsAccountStore.updateGuardianInfo(guardianRegistrationPayload)
          }
        />
        <RewardsDistributionFrequencyForm
          currentFrequencyInHours={
            orbsAccountStore.rewardDistributionFrequencyInHours
          }
          updateRewardsFrequency={(frequencyInHours) =>
            orbsAccountStore.setGuardianDistributionFrequency(frequencyInHours)
          }
          isUsingDefaultValue={orbsAccountStore.isUsingDefaultRewardFrequency}
        />
      </>
    );
  } else {
    return (
      <RegisterGuardianSection
        registerGuardian={(...args) =>
          orbsAccountStore.registerGuardian(...args)
        }
        guardianAddress={cryptoWalletIntegrationStore.mainAddress}
      />
    );
  }
});
