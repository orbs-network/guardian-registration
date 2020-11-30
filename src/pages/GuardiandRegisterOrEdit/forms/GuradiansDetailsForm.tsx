import React, { DetailedHTMLProps, useCallback, useEffect } from "react";
import { useStateful } from "react-hanger";
import { TextField, Typography } from "@material-ui/core";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { TGuardianRegistrationPayload } from "@orbs-network/contracts-js";
import { validURL } from "./inoputValidators";
import ActionButton from "@bit/orbs-network.commons.action-button";
import { useGuardianDataFormsTranslations } from "../../../translations/translationsHooks";

interface IProps {
  actionButtonTitle: string;
  guardianInitialInfo: TGuardianInfo;
  submitInfo: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
  disableSubmit?: boolean;
  messageForSubmitButton?: string;
}

const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const IP_REGEX = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

type TFormData = {
  name: string;
  website: string;
  contactInfo: string;
  ipAddress: string;
  nodeAddress: string;
};

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "100%",
    // maxWidth: "80ch",
    width: "100%",
  },
  textField: {
    "& label.Mui-focused": {
      color: "#f5f5f5",
    },
  },
}));

/**
 * A single component to handle both "Guardian registration" and "Guardian Update"
 */
export const GuardiansDetailsForm = React.memo<
  IProps &
    DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >
>((props) => {
  const classes = useStyles();
  const {
    guardianInitialInfo,
    submitInfo,
    actionButtonTitle,
    disableSubmit,
    messageForSubmitButton,
    ...rest
  } = props;

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const guardianDataFormsTranslations = useGuardianDataFormsTranslations();

  const name = useStateful(guardianInitialInfo.name);
  const website = useStateful(guardianInitialInfo.website);
  const ipAddress = useStateful(guardianInitialInfo.ip);
  const nodeAddress = useStateful(guardianInitialInfo.orbsAddr);

  const errorNodeAddress = !!errors.nodeAddress;
  const errorIPAddress = !!errors.ipAddress;
  const errorWebsite = !!errors.website;

  // DEV_NOTE : Taking ref for eslint-hooks
  const nameSetValue = name.setValue;
  const websiteSetValue = website.setValue;
  const ipAddressSetValue = ipAddress.setValue;
  const nodeAddressSetValue = nodeAddress.setValue;

  // DEV_NOTE : O.L : This is a hack to enforce update after registration,
  // TODO : O.L : Fix this
  useEffect(() => {
    if (guardianInitialInfo) {
      nameSetValue(guardianInitialInfo.name);
      websiteSetValue(guardianInitialInfo.website);
      ipAddressSetValue(guardianInitialInfo.ip);
      nodeAddressSetValue(guardianInitialInfo.orbsAddr);
    }
  }, [
    guardianInitialInfo,
    ipAddressSetValue,
    nameSetValue,
    nodeAddressSetValue,
    websiteSetValue,
  ]);

  // TODO : O.L : Add tx progress indicator
  const submit = useCallback(
    (formData: TFormData) => {
      const guardianRegistrationPayload: TGuardianRegistrationPayload = {
        ip: formData.ipAddress,
        orbsAddr: formData.nodeAddress,
        name: formData.name,
        website: formData.website,
      };
      submitInfo(guardianRegistrationPayload);
    },
    [submitInfo]
  );

  // TODO : FUTURE : This forms will not look good on mobile, fix the text overflow
  return (
    <form
      onSubmit={handleSubmit((formData) => submit(formData))}
      className={classes.form}
      {...rest}
    >
      <TextField
        InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"name"}
        label={guardianDataFormsTranslations("fieldLabel_guardianName")}
        placeholder={guardianDataFormsTranslations(
          "fieldPlaceHolder_guardianName"
        )}
        title={guardianDataFormsTranslations("fieldTooltipTitle_guardianName")}
        value={name.value}
        onChange={(e) => name.setValue(e.target.value)}
        required
        inputRef={register}
        fullWidth
        className={classes.textField}
        autoFocus
      />
      <br />
      <TextField
        fullWidth
        name={"website"}
        label={guardianDataFormsTranslations("fieldLabel_guardianWebsite")}
        placeholder={guardianDataFormsTranslations(
          "fieldPlaceHolder_guardianWebsite"
        )}
        title={guardianDataFormsTranslations(
          "fieldTooltipTitle_guardianWebsite"
        )}
        helperText={
          errorWebsite &&
          guardianDataFormsTranslations("fieldErrorMessage_guardianWebsite")
        }
        value={website.value}
        onChange={(e) => website.setValue(e.target.value)}
        required
        error={errorWebsite}
        inputRef={register({ validate: validURL })}
        className={classes.textField}
      />

      <br />
      <TextField
        fullWidth
        name={"ipAddress"}
        label={guardianDataFormsTranslations("fieldLabel_nodeIpAddress")}
        placeholder={guardianDataFormsTranslations(
          "fieldPlaceHolder_nodeIpAddress"
        )}
        title={guardianDataFormsTranslations("fieldTooltipTitle_nodeIpAddress")}
        value={ipAddress.value}
        onChange={(e) => ipAddress.setValue(e.target.value)}
        required
        inputRef={register({ pattern: IP_REGEX })}
        error={errorIPAddress}
        helperText={
          errorIPAddress &&
          guardianDataFormsTranslations("fieldErrorMessage_nodeIpAddress")
        }
        className={classes.textField}
      />

      <br />
      <TextField
        name={"nodeAddress"}
        label={guardianDataFormsTranslations("fieldLabel_nodeEthereumAddress")}
        placeholder={guardianDataFormsTranslations(
          "fieldPlaceHolder_nodeEthereumAddress"
        )}
        title={guardianDataFormsTranslations(
          "fieldTooltipTitle_nodeEthereumAddress"
        )}
        value={nodeAddress.value}
        onChange={(e) => nodeAddress.setValue(e.target.value)}
        error={errorNodeAddress}
        helperText={
          errorNodeAddress &&
          guardianDataFormsTranslations("fieldErrorMessage_nodeEthereumAddress")
        }
        required
        inputRef={register({ pattern: ETHEREUM_ADDRESS_REGEX })}
        fullWidth
        className={classes.textField}
      />
      <br />
      <br />
      <ActionButton type={"submit"} disabled={disableSubmit}>
        {actionButtonTitle}
      </ActionButton>
      <br />
      <br />
      {messageForSubmitButton && (
        <Typography
          variant={"body2"}
          color={"error"}
          style={{ width: "fit-content" }}
        >
          {messageForSubmitButton}
        </Typography>
      )}
    </form>
  );
});
