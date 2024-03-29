import React, { useCallback, useEffect } from "react";
import {  TextField, Typography } from "@material-ui/core";
import { useStateful, useBoolean } from "react-hanger";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { InTextLink } from "../../../components/InTextLink";
import { validURL } from "./inoputValidators";
import useTheme from "@material-ui/core/styles/useTheme";

import {
  useDomainTranslations,
  useGuardianDataFormsTranslations,
  useGuardianEditPageTranslations,
} from "../../../translations/translationsHooks";
import { renderToString } from "react-dom/server";
import ActionButton from "../../../components/shared/ActionButton";

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
  const theme = useTheme()
  const {
    currentGuardianDetailsUrl,
    updateGuardianDetailsUrl,
    hasGuardianDetailsUrl,
    detailsRequirementsLink,
  } = props;

  const domainTranslations = useDomainTranslations();
  const guardianDataFormsTranslations = useGuardianDataFormsTranslations();
  const guardianEditPageTranslations = useGuardianEditPageTranslations();

  const certifiedCommitteeExplanation = (
    <Typography
      component={"span"}
      variant={"caption"}
     
      dangerouslySetInnerHTML={{
        __html: guardianDataFormsTranslations(
          "fieldExplanation_certifiedCommittee",
          {
            certifiedCommitteeLink: renderToString(
              <InTextLink
                style={{color: theme.palette.text.primary}}
                text={domainTranslations("conceptName_certifiedCommittee")}
                href={detailsRequirementsLink}
              />
            ),
          }
        ),
      }}
    />
  );

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
        title={guardianDataFormsTranslations(
          "fieldLabel_certifiedCommitteeUrl"
        )}
        label={guardianDataFormsTranslations(
          "fieldTooltipTitle_certifiedCommitteeUrl"
        )}
        value={formGuardianDetailsUrl.value}
        onChange={(e) => {
          formGuardianDetailsUrl.setValue(e.target.value || "");
        }}
        required
        inputRef={register({ validate: validURL })}
        error={errorGuardianDetailsUrl}
        helperText={
          errorGuardianDetailsUrl
            ? guardianDataFormsTranslations(
                "fieldErrorMessage_certifiedCommittee"
              )
            : certifiedCommitteeExplanation
        }
        className={classes.textField}
        autoFocus
      />
      <br />
      <br />
      <ActionButton type={"submit"}>
        {guardianEditPageTranslations("action_updateCertifiedCommitteeUrl")}
      </ActionButton>
    </form>
  );
});
