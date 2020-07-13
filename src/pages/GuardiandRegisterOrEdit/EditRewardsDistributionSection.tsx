import React, { useMemo } from "react";
import { fromUnixTime } from "date-fns";
import {
  TGuardianInfo,
  TGuardianContractInteractionTimes,
} from "../../store/OrbsAccountStore";
import { GuardiansDetailsForm } from "./forms/GuradiansDetailsForm";
import { TGuardianUpdatePayload } from "../../services/guardiansV2Service/IGuardiansV2Service";
import { Paper, Typography } from "@material-ui/core";
import { RewardsDistributionFrequencyForm } from "./forms/RewardsDistributionFrequencyForm";

interface IProps {
  currentFrequencyInHours: number;
  updateRewardsFrequency: (frequencyInHours: number) => void;
  isUsingDefaultValue?: boolean;
}

export const EditRewardsDistributionSection = React.memo<IProps>((props) => {
  const {
    isUsingDefaultValue,
    currentFrequencyInHours,
    updateRewardsFrequency,
  } = props;
  return (
    <RewardsDistributionFrequencyForm
      currentFrequencyInHours={currentFrequencyInHours}
      updateRewardsFrequency={updateRewardsFrequency}
      isUsingDefaultValue={isUsingDefaultValue}
    />
  );
});
