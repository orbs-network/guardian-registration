import React, { useCallback, useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useBoolean, useNumber } from "react-hanger";
import { GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS } from "../../../services/guardiansV2Service/GuardiansV2ServiceConstants";
import { useForm } from "react-hook-form";
import { config, Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  delegatorsCut?: number;
  idFromUrl?: string;
  updateAdvancedDetails: () => void;
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
  actionButton: {
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
  },
}));

export const AdvancedFeaturesForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { delegatorsCut, idFromUrl, updateAdvancedDetails } = props;

  const showEditOptions = useBoolean(false);
  const { register, handleSubmit, errors } = useForm<TFormData>();

  const errorRewardsFrequency = !!errors.rewardsFrequencyInHours;

  const submitUpdate = useCallback(
    (formData: TFormData) => {
      updateAdvancedDetails();
    },
    [updateAdvancedDetails]
  );

  return (
    <form
      style={{
        maxWidth: "100%",
        width: "100%",
      }}
      onSubmit={handleSubmit(submitUpdate)}
    >
      {/*<Typography variant={"body1"}>Advanced options</Typography>*/}

      <br />
      <br />

      <Transition
        items={showEditOptions.value}
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
                    value={delegatorsCut}
                    onChange={(e) =>
                      // frequency.setValue(parseInt(e.target.value) || 0)
                      console.log("VChange")
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
                  <Button
                    className={classes.actionButton}
                    variant={"outlined"}
                    type={"submit"}
                    fullWidth
                  >
                    Update
                  </Button>
                  <br />
                  <br />
                  <Button
                    className={classes.actionButton}
                    variant={"outlined"}
                    fullWidth
                    onClick={() => {
                      showEditOptions.setFalse();
                    }}
                  >
                    Close Section
                  </Button>
                </div>
              )
            : (props) => (
                <Button
                  className={classes.actionButton}
                  onClick={showEditOptions.setTrue}
                  variant={"outlined"}
                  fullWidth
                  style={props}
                >
                  Edit advanced features
                </Button>
              )
        }
      </Transition>
    </form>
  );
});
