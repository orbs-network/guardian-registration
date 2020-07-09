import React, { useCallback } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useNumber } from "react-hanger";
import { GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS } from "../../services/guardiansV2Service/GuardiansV2ServiceConstants";

interface IProps {
  currentFrequencyInHours: number;
  updateRewardsFrequency: (newFrequency: number) => void;
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

  const submitUpdate = useCallback(() => {
    updateRewardsFrequency(frequency.value);
  }, [frequency.value, updateRewardsFrequency]);

  return (
    <form>
      <Typography>Default value is 14 days (336 hours)</Typography>
      {isUsingDefaultValue && (
        <Typography color={"secondary"}>
          Currently using default value
        </Typography>
      )}
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
