import React, { useCallback, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useNumber } from "react-hanger";
import { GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS } from "../../services/guardiansV2Service/GuardiansV2ServiceConstants";

interface IProps {
  currentFrequencyInHours: number;
  updateRewardsFrequency: (frequencyInHours: number) => void;
  isUsingDefaultValue?: boolean;
}

export const RewardsDistributionFrequencyForm = React.memo<IProps>((props) => {
  const {
    currentFrequencyInHours,
    updateRewardsFrequency,
    isUsingDefaultValue,
  } = props;

  // TODO : ORL : Ensure minimum value is observed + add UI validation.
  const frequency = useNumber(
    Math.max(
      currentFrequencyInHours,
      GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS
    ),
    {
      lowerLimit: GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS,
    }
  );

  /**
   * DEV_NOTE : This is done in order to present the correct freq when transitioning
   * from the initial state to the actual state after reading the data.
   */
  useEffect(() => {
    frequency.setValue(
      Math.max(
        currentFrequencyInHours,
        GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS
      )
    );
  }, [currentFrequencyInHours, frequency]);

  const submitUpdate = useCallback(() => {
    updateRewardsFrequency(frequency.value);
  }, [frequency.value, updateRewardsFrequency]);

  const currentlyUsingText = isUsingDefaultValue
    ? "Currently using default value"
    : `Current rewards distribution frequency is ${currentFrequencyInHours} hours`;

  return (
    <form>
      <Typography>Default value is 14 days (336 hours)</Typography>
      <Typography variant={"caption"}>Minimum value is 12 hours</Typography>
      <Typography color={"secondary"}>{currentlyUsingText}</Typography>
      <TextField
        title={"guardianAddress"}
        label={"Guardian Address"}
        value={frequency.value}
        onChange={(e) => frequency.setValue(parseInt(e.target.value) || 0)}
      />
      <br />
      <Button onClick={submitUpdate}> Update </Button>
    </form>
  );
});
