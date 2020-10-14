import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { useBoolean } from "react-hanger";
import { useForm } from "react-hook-form";
import { Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";

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
      <Transition
        items={userWantsToUnregister.value}
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
                  <Button
                    className={classes.unregisterButton}
                    variant={"outlined"}
                    type={"submit"}
                    fullWidth
                  >
                    Unregister
                  </Button>
                  <br />
                  <br />
                  <Button
                    className={classes.closeUnregisterMenuButton}
                    onClick={userWantsToUnregister.setFalse}
                    variant={"outlined"}
                    fullWidth
                    style={props}
                  >
                    Close unregister section
                  </Button>
                </div>
              )
            : (props) => (
                <Button
                  className={classes.openUnregisterMenuButton}
                  onClick={userWantsToUnregister.setTrue}
                  variant={"outlined"}
                  fullWidth
                  style={props}
                >
                  Open unregister section
                </Button>
              )
        }
      </Transition>
    </form>
  );
});
