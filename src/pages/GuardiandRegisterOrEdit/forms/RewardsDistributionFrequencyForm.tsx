import React, { useCallback, useEffect } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useBoolean, useNumber } from "react-hanger";
import { GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS } from "../../../services/guardiansV2Service/GuardiansV2ServiceConstants";
import { useForm } from "react-hook-form";
import { config, Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  currentFrequencyInHours: number;
  updateRewardsFrequency: (frequencyInHours: number) => void;
  isUsingDefaultValue?: boolean;
}

type TFormData = {
  rewardsFrequencyInHours: number;
};

const REWARDS_FREQUENCY_MESSAGE = "Minimum frequency is 12 hours";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& label.Mui-focused": {
      color: "#f5f5f5",
    },
  },
}));

export const RewardsDistributionFrequencyForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    currentFrequencyInHours,
    updateRewardsFrequency,
    isUsingDefaultValue,
  } = props;

  // DEV_NOTE : is the value is already not the default one, we will not hide the input element
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

  // useEffect(() => {
  //   if (!isUsingDefaultValue) {
  //     userWantsToChangeDefault.setTrue();
  //   }
  // }, [isUsingDefaultValue, userWantsToChangeDefault]);

  const setFreq = frequency.setValue;
  useEffect(() => {
    setFreq(
      Math.max(
        currentFrequencyInHours,
        GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS
      )
    );
  }, [currentFrequencyInHours, setFreq]);

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const errorRewardsFrequency = !!errors.rewardsFrequencyInHours;

  const submitUpdate = useCallback(
    (formData: TFormData) => {
      updateRewardsFrequency(formData.rewardsFrequencyInHours);
    },
    [updateRewardsFrequency]
  );

  // TODO : O.L : Get a better text building code.
  const freqFullDays = Math.floor(currentFrequencyInHours / 24);
  const freqRemainingHours = Math.floor(currentFrequencyInHours % 24);
  const daysText =
    freqFullDays === 0
      ? ""
      : freqFullDays === 1
      ? `1 day and`
      : `${freqFullDays} days`;
  const hoursText =
    freqRemainingHours === 0
      ? ""
      : freqRemainingHours === 1
      ? "1 hour"
      : `${freqRemainingHours} hours`;
  const middleText = daysText !== "" && hoursText !== "" ? " and " : "";
  const commentText =
    daysText !== "" ? ` (${currentFrequencyInHours} hours)` : "";
  const currentFreqInHumanText = `${daysText}${middleText}${hoursText}${commentText}`;

  const currentlyUsingText = isUsingDefaultValue
    ? "Currently using default value"
    : `Current distribution frequency is once every ${currentFreqInHumanText}`;

  return (
    <form
      style={{
        maxWidth: "100%",
        width: "100%",
      }}
      onSubmit={handleSubmit(submitUpdate)}
    >
      {/*<Typography variant={"body1"}>{currentlyUsingText}</Typography>*/}
      <Typography variant={"body1"} style={{ display: "inline" }}>
        Current distribution frequency is once every{" "}
      </Typography>
      <Typography
        variant={"body1"}
        style={{ display: "inline", fontWeight: "bold" }}
      >
        {currentFreqInHumanText}
      </Typography>
      {/*<Typography variant={"body2"}>*/}
      {/*  Default value is 14 days (336 hours)*/}
      {/*</Typography>*/}

      <br />

      <Transition
        items={userWantsToChangeDefault.value}
        // config={config.gentle}
        initial={null}
        // immediate={DISABLE_ANIMATIONS}

        from={{
          // position: "absolute",
          opacity: 0,
          // transform: "translateX(1%)",
        }}
        enter={{
          opacity: 1,
          // transform: "translateX(0%)",
        }}
        leave={{
          opacity: 0,
          // transform: "translateX(1%)",
          // position: "absolute",
          display: "none",
        }}
      >
        {(toggle) =>
          toggle
            ? (props) => (
                <div style={{ ...props, maxWidth: "100%", width: "100%" }}>
                  <TextField
                    fullWidth
                    name={"rewardsFrequencyInHours"}
                    title={`Rewards Frequency in hours - Minimum ${GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS} hours`}
                    label={"Rewards Frequency in hours"}
                    value={frequency.value}
                    onChange={(e) =>
                      frequency.setValue(parseInt(e.target.value) || 0)
                    }
                    required
                    type={"number"}
                    inputRef={register({
                      min: GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS,
                    })}
                    error={errorRewardsFrequency}
                    helperText={
                      errorRewardsFrequency
                        ? REWARDS_FREQUENCY_MESSAGE
                        : "Default frequency is 14 days (336 hours), cannot be lower than half a day (12 hours)"
                    }
                    className={classes.textField}
                  />
                  <br />
                  <br />
                  <Button variant={"outlined"} type={"submit"} fullWidth>
                    Update
                  </Button>
                </div>
              )
            : (props) => (
                <Button
                  onClick={userWantsToChangeDefault.setTrue}
                  variant={"outlined"}
                  fullWidth
                  style={props}
                >
                  Set to other value
                </Button>
              )
        }
      </Transition>
    </form>
  );
});
