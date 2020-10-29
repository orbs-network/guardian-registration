import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useBoolean, useNumber } from "react-hanger";
import { useForm } from "react-hook-form";
import { config, Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  currentDelegatorsCut?: number;
  updateDelegatorsCut: (delegatorsCut: number) => void;
  isUsingDefaultValue?: boolean;

  // Configs
  delegatorsCutMaxValue: number;
  delegatorsCutDefaultValue: number;
}

type TFormData = {
  delegatorsCut: string;
};

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
    delegatorsCutDefaultValue,
    delegatorsCutMaxValue,
  } = props;

  const REWARDS_FREQUENCY_MESSAGE = `Valid values are between 0 and ${delegatorsCutMaxValue}`;

  const showEditOptions = useBoolean(false);
  const { register, handleSubmit, errors } = useForm<TFormData>();

  const delegatorsCut = useNumber(Math.min(currentDelegatorsCut || 0, 66), {
    upperLimit: delegatorsCutMaxValue,
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
    setDelegCut(Math.min(currentDelegatorsCut || 0, delegatorsCutMaxValue));
  }, [currentDelegatorsCut, delegatorsCutMaxValue, setDelegCut]);

  console.log({ currentDelegatorsCut });

  const titleText = useMemo(() => {
    return isUsingDefaultValue
      ? `Current cut : Default value (${delegatorsCutDefaultValue}%)`
      : `Current cut : ${currentDelegatorsCut}%`;
  }, [currentDelegatorsCut, delegatorsCutDefaultValue, isUsingDefaultValue]);

  return (
    <form
      style={{
        maxWidth: "100%",
        width: "100%",
        display: "relative",
      }}
      onSubmit={handleSubmit(submitUpdate)}
    >
      <TextField
        fullWidth
        name={"delegatorsCut"}
        title={`Delegators cut % out of staking rewards`}
        label={"Delegators cut % out of staking rewards"}
        value={delegatorsCut.value}
        inputProps={{
          step: 1,
        }}
        onChange={(e) => {
          delegatorsCut.setValue(parseFloat(e.target.value) || 0);
        }}
        required
        type={"number"}
        inputRef={register({
          max: delegatorsCutMaxValue,
        })}
        error={errorDelegatorsCut}
        helperText={
          errorDelegatorsCut
            ? REWARDS_FREQUENCY_MESSAGE
            : `The percentage of the staking rewards that is distributed to your Delegators. between 0 and ${delegatorsCutMaxValue}`
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
    </form>
  );
});
