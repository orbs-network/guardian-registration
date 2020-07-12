import React, { useCallback, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useBoolean, useNumber } from "react-hanger";
import { GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS } from "../../services/guardiansV2Service/GuardiansV2ServiceConstants";
import { useForm } from "react-hook-form";

interface IProps {
  currentFrequencyInHours: number;
  updateRewardsFrequency: (frequencyInHours: number) => void;
  isUsingDefaultValue?: boolean;
}

type TFormData = {
  rewardsFrequencyInHours: number;
};

const REWARDS_FREQUENCY_MESSAGE = "Minimum frequency is 12 hours";

export const RewardsDistributionFrequencyForm = React.memo<IProps>((props) => {
  const {
    currentFrequencyInHours,
    updateRewardsFrequency,
    isUsingDefaultValue,
  } = props;

  const userWantsToChangeDefault = useBoolean(false);

  const frequency = useNumber(
    Math.max(
      currentFrequencyInHours,
      GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS
    ),
    {
      lowerLimit: GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS,
    }
  );

  const { register, handleSubmit, errors } = useForm<TFormData>();

  console.log(errors.rewardsFrequencyInHours);
  const errorRewardsFrequency = !!errors.rewardsFrequencyInHours;

  const submitUpdate = useCallback(
    (formData: TFormData) => {
      updateRewardsFrequency(formData.rewardsFrequencyInHours);
    },
    [updateRewardsFrequency]
  );

  const currentlyUsingText = isUsingDefaultValue
    ? "Currently using default value"
    : `Current rewards distribution frequency is ${currentFrequencyInHours} hours`;

  return (
    <form
      style={{
        maxWidth: "100%",
        width: "100%",
      }}
      onSubmit={handleSubmit(submitUpdate)}
    >
      <Typography>Default value is 14 days (336 hours)</Typography>

      <br />

      {!userWantsToChangeDefault.value && (
        <Button
          onClick={userWantsToChangeDefault.setTrue}
          variant={"outlined"}
          fullWidth
        >
          Change default
        </Button>
      )}

      {userWantsToChangeDefault.value && (
        <>
          <Typography variant={"caption"}>Minimum value is 12 hours</Typography>
          <Typography color={"secondary"}>{currentlyUsingText}</Typography>
          <TextField
            fullWidth
            name={"rewardsFrequencyInHours"}
            title={`Rewards Frequency in hours - Minimum ${GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS} hours`}
            label={"Rewards Frequency in hours"}
            value={frequency.value}
            onChange={(e) => frequency.setValue(parseInt(e.target.value) || 0)}
            required
            type={"number"}
            inputRef={register({
              min: GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS,
            })}
            error={errorRewardsFrequency}
            helperText={errorRewardsFrequency && REWARDS_FREQUENCY_MESSAGE}
          />
          <br />
          <br />
          <Button variant={"outlined"} type={"submit"} fullWidth>
            Update
          </Button>
        </>
      )}
    </form>
  );
});
