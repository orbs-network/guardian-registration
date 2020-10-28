import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useStateful, useBoolean } from "react-hanger";
import { useForm } from "react-hook-form";
import { config, Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";
import { InTextLink } from "../../../components/InTextLink";
import { validURL } from "./inoputValidators";

interface IProps {
  currentGuardianDetailsUrl?: string;
  updateGuardianDetailsUrl: (guardianDetailsUrl: string) => void;
  hasGuardianDetailsUrl?: boolean;

  // External links
  detailsRequirementsLink?: string;
}

type TFormData = {
  guardianDetailsUrl: string;
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

export const GuardiansDetailsUrlForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    currentGuardianDetailsUrl,
    updateGuardianDetailsUrl,
    hasGuardianDetailsUrl,
    detailsRequirementsLink,
  } = props;

  const REWARDS_FREQUENCY_ERROR_MESSAGE = `Please use a valid URL`;
  const REWARDS_FREQUENCY_DATA_MESSAGE = (
    <Typography component={"span"} variant={"caption"}>
      Setting a URL to your{" "}
      <InTextLink text={"details"} href={detailsRequirementsLink} /> page will
      allow you to run 'certified-only' VCs
    </Typography>
  );

  const showEditOptions = useBoolean(false);
  const { register, handleSubmit, errors } = useForm<TFormData>();

  const errorGuardianDetailsUrl = !!errors.guardianDetailsUrl;

  const formGuardianDetailsUrl = useStateful("");

  const submitUpdate = useCallback(
    (formData: TFormData) => {
      updateGuardianDetailsUrl(formData.guardianDetailsUrl);
    },
    [updateGuardianDetailsUrl]
  );

  const setFormGuardianDetailsUrl = formGuardianDetailsUrl.setValue;
  useEffect(() => {
    setFormGuardianDetailsUrl(currentGuardianDetailsUrl || "");
  }, [setFormGuardianDetailsUrl, currentGuardianDetailsUrl]);

  const titleText = useMemo(() => {
    return hasGuardianDetailsUrl ? (
      <Typography component={"span"}>
        Your details page :{" "}
        <InTextLink
          href={
            currentGuardianDetailsUrl?.startsWith("http")
              ? currentGuardianDetailsUrl
              : "http://" + currentGuardianDetailsUrl
          }
          text={currentGuardianDetailsUrl!}
        />
      </Typography>
    ) : (
      `You have not set your details page URL`
    );
  }, [currentGuardianDetailsUrl, hasGuardianDetailsUrl]);

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
      {/*<br />*/}

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
                    name={"guardianDetailsUrl"}
                    title={`Details page URL`}
                    label={"Details page URL"}
                    value={formGuardianDetailsUrl.value}
                    onChange={(e) => {
                      formGuardianDetailsUrl.setValue(e.target.value || "");
                    }}
                    required
                    inputRef={register({ validate: validURL })}
                    error={errorGuardianDetailsUrl}
                    helperText={
                      errorGuardianDetailsUrl
                        ? REWARDS_FREQUENCY_ERROR_MESSAGE
                        : REWARDS_FREQUENCY_DATA_MESSAGE
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
                    Update your details page URL
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
                  Edit your details page URL
                </Button>
              )
        }
      </Transition>
    </form>
  );
});