import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { useBoolean } from "react-hanger";
import { useForm } from "react-hook-form";
import { Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";
import ActionButton from "@bit/orbs-network.commons.action-button";

interface IProps {
  unregisterGuardian: () => void;
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

  openUnregisterMenuButton: {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
  },

  closeUnregisterMenuButton: {
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
  },

  unregisterButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
}));

export const UnregisterForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { unregisterGuardian } = props;

  const userWantsToUnregister = useBoolean(false);

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const submitUnregister = useCallback(
    (formData: TFormData) => {
      unregisterGuardian();
    },
    [unregisterGuardian]
  );

  return (
    <form
      style={{
        maxWidth: "100%",
        width: "100%",
      }}
      onSubmit={handleSubmit(submitUnregister)}
    >
      <ActionButton warningVariant type={"submit"} errorVariant>
        Unregister
      </ActionButton>
    </form>
  );
});
