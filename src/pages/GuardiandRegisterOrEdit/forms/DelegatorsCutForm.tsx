import React, { useCallback, useEffect, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useBoolean, useNumber } from "react-hanger";
import {
  DELGATORS_SHARE_DEFAULT_PERCENTAGE_VALUE,
  DELGATORS_SHARE_MAX_PERCENTAGE_VALUE,
  GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS,
} from "../../../services/guardiansV2Service/GuardiansV2ServiceConstants";
import { useForm } from "react-hook-form";
import { config, Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  currentDelegatorsCut?: number;
  updateDelegatorsCut: (delegatorsCut: number) => void;
  isUsingDefaultValue?: boolean;
}

type TFormData = {
  delegatorsCut: string;
};

const REWARDS_FREQUENCY_MESSAGE = `Valid values are between 0 and ${DELGATORS_SHARE_MAX_PERCENTAGE_VALUE}`;

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

export const DelegatorsCutForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    currentDelegatorsCut,
    updateDelegatorsCut,
    isUsingDefaultValue,
  } = props;

  const showEditOptions = useBoolean(true);
  const { register, handleSubmit, errors } = useForm<TFormData>();

  const delegatorsCut = useNumber(Math.min(currentDelegatorsCut || 0, 66), {
    upperLimit: DELGATORS_SHARE_MAX_PERCENTAGE_VALUE,
  });

  const errorDelegatorsCut = !!errors.delegatorsCut;

  const submitUpdate = useCallback(
    (formData: TFormData) => {
      updateDelegatorsCut(parseFloat(formData.delegatorsCut));
    },
    [updateDelegatorsCut]
  );

  const setDelegCut = delegatorsCut.setValue;
  useEffect(() => {
    setDelegCut(
      Math.min(currentDelegatorsCut || 0, DELGATORS_SHARE_MAX_PERCENTAGE_VALUE)
    );
  }, [currentDelegatorsCut, setDelegCut]);

  const titleText = isUsingDefaultValue
    ? `Current cut : Default value (${DELGATORS_SHARE_DEFAULT_PERCENTAGE_VALUE}%)`
    : `Current cut : ${delegatorsCut.value}%`;

  return (
    <form
      style={{
        maxWidth: "100%",
        width: "100%",
        display: "relative",
      }}
      onSubmit={handleSubmit(submitUpdate)}
    >
      <Typography variant={"body1"}>{titleText}</Typography>
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
                    name={"delegatorsCut"}
                    title={`Delegators cut % out of rewards`}
                    label={"Delegators cut % out of rewards"}
                    value={delegatorsCut.value}
                    inputProps={{
                      step: 0.001,
                    }}
                    onChange={(e) => {
                      delegatorsCut.setValue(parseFloat(e.target.value) || 0);
                    }}
                    required
                    type={"number"}
                    inputRef={register({
                      max: DELGATORS_SHARE_MAX_PERCENTAGE_VALUE,
                    })}
                    error={errorDelegatorsCut}
                    helperText={
                      errorDelegatorsCut
                        ? REWARDS_FREQUENCY_MESSAGE
                        : `The percentage of rewards that will reach your delegators. between 0 and ${DELGATORS_SHARE_MAX_PERCENTAGE_VALUE}`
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
                    Update Delegators cut
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
                  Edit Delegators cut
                </Button>
              )
        }
      </Transition>
    </form>
  );
});
