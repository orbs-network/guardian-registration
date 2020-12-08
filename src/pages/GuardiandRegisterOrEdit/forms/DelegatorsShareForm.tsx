import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useBoolean, useNumber } from "react-hanger";
import { useForm } from "react-hook-form";
import { config, Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";
import ActionButton from "@bit/orbs-network.commons.action-button";
import {
  useGuardianDataFormsTranslations,
  useGuardianEditPageTranslations,
} from "../../../translations/translationsHooks";

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
}));

export const DelegatorsShareForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    currentDelegatorsCut,
    updateDelegatorsCut,
    isUsingDefaultValue,
    delegatorsCutDefaultValue,
    delegatorsCutMaxValue,
  } = props;

  const guardianDataFormsTranslations = useGuardianDataFormsTranslations();
  const guardianEditPageTranslations = useGuardianEditPageTranslations();

  const REWARDS_FREQUENCY_MESSAGE = guardianDataFormsTranslations(
    "fieldErrorMessage_delegatorsShare",
    {
      delegatorsCutMaxValue,
    }
  );

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
        title={guardianDataFormsTranslations(
          "fieldTooltipTitle_delegatorsShare"
        )}
        label={guardianDataFormsTranslations("fieldLabel_delegatorsShare")}
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
            : guardianDataFormsTranslations(
                "fieldExplanation_delegatorsShare",
                {
                  delegatorsCutMaxValue,
                }
              )
        }
        InputProps={{
          startAdornment: "%",
        }}
        className={classes.textField}
        autoFocus
      />
      <br />
      <br />
      <ActionButton type={"submit"} fullWidth>
        {guardianEditPageTranslations("action_updateDelegatorsShare")}
      </ActionButton>
    </form>
  );
});
