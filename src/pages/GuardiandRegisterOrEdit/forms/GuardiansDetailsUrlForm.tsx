import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useStateful, useBoolean } from "react-hanger";
import { useForm } from "react-hook-form";
import { config, Transition } from "react-spring/renderprops-universal";
import { makeStyles } from "@material-ui/core/styles";
import { InTextLink } from "../../../components/InTextLink";
import { validURL } from "./inoputValidators";
import { ActionButton } from "../../../components/shared/ActionButton/ActionButton";

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
      Setting a URL to your details page is a prerequisite for joining the{" "}
      <InTextLink text={"certified committee"} href={detailsRequirementsLink} />
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
      <TextField
        fullWidth
        name={"guardianDetailsUrl"}
        title={`Certified Committee URL`}
        label={"Certified Committee URL"}
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
        autoFocus
      />
      <br />
      <br />
      <ActionButton type={"submit"}>
        Update your Certified Committee URL
      </ActionButton>
    </form>
  );
});
