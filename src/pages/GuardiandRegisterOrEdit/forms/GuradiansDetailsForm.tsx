import React, { useCallback, useEffect } from "react";
import { useStateful } from "react-hanger";
import { TGuardianRegistrationPayload } from "../../../services/guardiansV2Service/IGuardiansV2Service";
import {
  Button,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import { FormHelperListTexts } from "../../../components/forms/FormHelperListTexts";
import { InstallPhaseExtraDetails } from "../../../components/ethereumConnection/InstallPhaseExtraDetails";
import { DetailsList } from "../../../components/detailsList/Detailslist";

interface IProps {
  actionButtonTitle: string;
  guardianAddress: string;
  guardianInitialInfo: TGuardianInfo;
  submitInfo: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
  disableSubmit?: boolean;
  messageForSubmitButton?: string;
}

const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const IP_REGEX = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

const NODE_ADDRESS_MESSAGE = "Must use a valid address";
const IP_ADDRESS_MESSAGE = "Must use a valid IPV4 address";
const WEBSITE_MESSAGE = "Must use a URL";

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

function validURL(str: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

type TFormData = {
  // guardianAddress: string;
  name: string;
  website: string;
  contactInfo: string;
  ipAddress: string;
  nodeAddress: string;
};

const useStyles = makeStyles((theme) => ({
  textField: {
    "& label.Mui-focused": {
      color: "#f5f5f5",
    },
  },
}));

/**
 * A single component to handle both "Guardian registration" and "Guardian Update"
 */
export const GuardiansDetailsForm = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    guardianAddress,
    guardianInitialInfo,
    submitInfo,
    actionButtonTitle,
    disableSubmit,
    messageForSubmitButton,
  } = props;

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const name = useStateful(guardianInitialInfo.name);
  const website = useStateful(guardianInitialInfo.website);
  // const contactInfo = useStateful(guardianInitialInfo.contact);
  const ipAddress = useStateful(guardianInitialInfo.ip);
  const nodeAddress = useStateful(guardianInitialInfo.orbsAddr);

  const errorNodeAddress = !!errors.nodeAddress;
  const errorIPAddress = !!errors.ipAddress;
  const errorWebsite = !!errors.website;

  // DEV_NOTE : Taking ref for eslint-hooks
  const nameSetValue = name.setValue;
  const websiteSetValue = website.setValue;
  // const contactInfoSetValue = contactInfo.setValue;
  const ipAddressSetValue = ipAddress.setValue;
  const nodeAddressSetValue = nodeAddress.setValue;

  // DEV_NOTE : O.L : This is a hack to enforce update after registration,
  // TODO : O.L : Fix this
  useEffect(() => {
    if (guardianInitialInfo) {
      console.log("Re-setting data");
      nameSetValue(guardianInitialInfo.name);
      websiteSetValue(guardianInitialInfo.website);
      // contactInfoSetValue(guardianInitialInfo.contact);
      ipAddressSetValue(guardianInitialInfo.ip);
      nodeAddressSetValue(guardianInitialInfo.orbsAddr);
    }
  }, [
    // contactInfoSetValue,
    guardianInitialInfo,
    ipAddressSetValue,
    nameSetValue,
    nodeAddressSetValue,
    websiteSetValue,
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  console.log(isMobile);

  const buildHelperMessage = useCallback(
    (hasError: boolean, errorText?: string, infoTexts?: React.ReactNode[]) => {
      let message: React.ReactNode | undefined;
      // DEV_NOTE: O.L :  We would like to display the info text to the user on mobile (no hove effect)
      // if (isMobile) {
      if (infoTexts) {
        message = <FormHelperListTexts helperTexts={infoTexts} />;
      }
      // }

      // If we have an error, we would like to display it
      if (hasError && errorText) {
        message = errorText;
      }

      return message;
    },
    []
  );

  // TODO : O.L : Add tx progress indicator
  const submit = useCallback(
    (formData: TFormData) => {
      const guardianRegistrationPayload: TGuardianRegistrationPayload = {
        ip: formData.ipAddress,
        orbsAddr: formData.nodeAddress,
        name: formData.name,
        website: formData.website,
        // contact: formData.contactInfo,
      };
      submitInfo(guardianRegistrationPayload);
    },
    [submitInfo]
  );

  // TODO : FUTURE : This forms will not look good on mobile, fix the text overflow
  return (
    <form
      onSubmit={handleSubmit((formData) => submit(formData))}
      style={{
        maxWidth: "100%",
        // maxWidth: "80ch",
        width: "100%",
      }}
    >
      {/*<InstallPhaseExtraDetails />*/}

      <TextField
        InputLabelProps={{ style: { pointerEvents: "auto" } }}
        name={"name"}
        label={"Guardian name"}
        title={INFO_MESSAGE_GUARDIAN_NAME[0]}
        // helperText={buildHelperMessage(
        //   false,
        //   undefined,
        //   INFO_MESSAGE_GUARDIAN_NAME
        // )}
        value={name.value}
        onChange={(e) => name.setValue(e.target.value)}
        required
        inputRef={register}
        fullWidth
        className={classes.textField}
      />
      <br />
      <TextField
        fullWidth
        name={"website"}
        label={"Guardian website"}
        title={INFO_MESSAGE_WEBSITE[0]}
        // helperText={buildHelperMessage(
        //   errorWebsite,
        //   WEBSITE_MESSAGE,
        //   INFO_MESSAGE_WEBSITE
        // )}
        helperText={errorWebsite && WEBSITE_MESSAGE}
        value={website.value}
        onChange={(e) => website.setValue(e.target.value)}
        required
        error={errorWebsite}
        inputRef={register({ validate: validURL })}
        className={classes.textField}
      />
      {/*<br />*/}
      {/*<TextField*/}
      {/*  fullWidth*/}
      {/*  name={"contactInfo"}*/}
      {/*  title={"contactInfo"}*/}
      {/*  label={"Contact Info"}*/}
      {/*  value={contactInfo.value}*/}
      {/*  onChange={(e) => contactInfo.setValue(e.target.value)}*/}
      {/*  required*/}
      {/*  inputRef={register}*/}
      {/*/>*/}
      <br />
      <TextField
        fullWidth
        name={"ipAddress"}
        label={"Node IP"}
        title={INFO_MESSAGE_IP[0]}
        value={ipAddress.value}
        onChange={(e) => ipAddress.setValue(e.target.value)}
        required
        inputRef={register({ pattern: IP_REGEX })}
        error={errorIPAddress}
        // helperText={buildHelperMessage(
        //   errorIPAddress,
        //   IP_ADDRESS_MESSAGE,
        //   INFO_MESSAGE_IP
        // )}
        helperText={errorIPAddress && IP_ADDRESS_MESSAGE}
        className={classes.textField}
      />

      <br />
      <TextField
        name={"nodeAddress"}
        label={"Node address"}
        title={INFO_MESSAGE_NODE_ADDRESS[1] as string}
        value={nodeAddress.value}
        onChange={(e) => nodeAddress.setValue(e.target.value)}
        error={errorNodeAddress}
        // helperText={buildHelperMessage(
        //   errorNodeAddress,
        //   NODE_ADDRESS_MESSAGE,
        //   INFO_MESSAGE_NODE_ADDRESS
        // )}
        helperText={errorNodeAddress && NODE_ADDRESS_MESSAGE}
        required
        inputRef={register({ pattern: ETHEREUM_ADDRESS_REGEX })}
        fullWidth
        className={classes.textField}
      />
      <br />
      <br />
      <Button
        variant={"outlined"}
        fullWidth
        type={"submit"}
        disabled={disableSubmit}
      >
        {actionButtonTitle}
      </Button>
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
