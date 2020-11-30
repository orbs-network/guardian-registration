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

const NODE_ADDRESS_MESSAGE = "Please use a valid address";
const IP_ADDRESS_MESSAGE = "Please use a valid IPV4 address";
const WEBSITE_MESSAGE = "Please use a valid URL";

const INFO_MESSAGE_GUARDIAN_NAME = [
  "The name that the Guardian will be recognized by.",
];
const INFO_MESSAGE_WEBSITE = [
  "The Guardian website is used by Delegators when selecting a Guardian.",
];
const INFO_MESSAGE_IP = [
  "A valid IPv4 address is required to allow the Guardian’s node to connect to the network gossip topology.",
];
const INFO_MESSAGE_NODE_ADDRESS = [
  <>
    Should be different from the{" "}
    <div style={{ display: "contents", fontWeight: "bold" }}>
      Guardian address
    </div>
    .
  </>,
  "Used by the Orbs node to automatically send transactions such as ReadyForCommittee.",
  "Used to sign blocks on Orbs platform.",
  "Should hold ETH for the automated transactions gas (A minimal balance of 1 Ether at the 'Node Address' is required in order to register as a guardian).",
  "The Orbs Node address should differ from the Guardian address.",
];

const PLACE_HOLDER_GUARDIAN_NAME = "e.g: Number One ORBS Guardian";
const PLACE_HOLDER_WEBSITE = "e.g: https://www.number1guardian.com";
const PLACE_HOLDER_IP = "e.g: 123.17.46.251";
const PLACE_HOLDER_NODE_ADDRESS =
  "e.g: 0x0cBb46287c93357be4CF60fe9601c2c7A2700dC2";

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
        placeholder={PLACE_HOLDER_GUARDIAN_NAME}
        title={INFO_MESSAGE_GUARDIAN_NAME[0]}
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
        placeholder={PLACE_HOLDER_WEBSITE}
        title={INFO_MESSAGE_WEBSITE[0]}
        helperText={errorWebsite && WEBSITE_MESSAGE}
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
        placeholder={PLACE_HOLDER_IP}
        title={INFO_MESSAGE_IP[0]}
        value={ipAddress.value}
        onChange={(e) => ipAddress.setValue(e.target.value)}
        required
        inputRef={register({ pattern: IP_REGEX })}
        error={errorIPAddress}
        helperText={errorIPAddress && IP_ADDRESS_MESSAGE}
        className={classes.textField}
      />

      <br />
      <TextField
        name={"nodeAddress"}
        label={guardianDataFormsTranslations("fieldLabel_nodeEthereumAddress")}
        placeholder={PLACE_HOLDER_NODE_ADDRESS}
        title={INFO_MESSAGE_NODE_ADDRESS[1] as string}
        value={nodeAddress.value}
        onChange={(e) => nodeAddress.setValue(e.target.value)}
        error={errorNodeAddress}
        helperText={errorNodeAddress && NODE_ADDRESS_MESSAGE}
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
