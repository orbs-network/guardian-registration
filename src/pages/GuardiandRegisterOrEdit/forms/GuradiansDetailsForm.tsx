import React, { useCallback, useEffect } from "react";
import { useStateful } from "react-hanger";
import { TGuardianRegistrationPayload } from "../../../services/guardiansV2Service/IGuardiansV2Service";
import { Button, TextField, Typography } from "@material-ui/core";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { useForm } from "react-hook-form";

interface IProps {
  actionButtonTitle: string;
  guardianAddress: string;
  guardianInitialInfo: TGuardianInfo;
  submitInfo: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
}

const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const IP_REGEX = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

const NODE_ADDRESS_MESSAGE = "Must use a valid address";
const IP_ADDRESS_MESSAGE = "Must use a valid IPV4 address";
const WEBSITE_MESSAGE = "Must use a URL";

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

/**
 * A single component to handle both "Guardian registration" and "Guardian Update"
 */
export const GuardiansDetailsForm = React.memo<IProps>((props) => {
  const {
    guardianAddress,
    guardianInitialInfo,
    submitInfo,
    actionButtonTitle,
  } = props;

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const name = useStateful(guardianInitialInfo.name);
  const website = useStateful(guardianInitialInfo.website);
  const contactInfo = useStateful(guardianInitialInfo.contact);
  const ipAddress = useStateful(guardianInitialInfo.ip);
  const nodeAddress = useStateful(guardianInitialInfo.orbsAddr);

  const errorNodeAddress = !!errors.nodeAddress;
  const errorIPAddress = !!errors.ipAddress;
  const errorWebsite = !!errors.website;

  // DEV_NOTE : Taking ref for eslint-hooks
  const nameSetValue = name.setValue;
  const websiteSetValue = website.setValue;
  const contactInfoSetValue = contactInfo.setValue;
  const ipAddressSetValue = ipAddress.setValue;
  const nodeAddressSetValue = nodeAddress.setValue;

  // DEV_NOTE : O.L : This is a hack to enforce update after registration,
  // TODO : O.L : Fix this
  useEffect(() => {
    if (guardianInitialInfo) {
      console.log("Re-setting data");
      nameSetValue(guardianInitialInfo.name);
      websiteSetValue(guardianInitialInfo.website);
      contactInfoSetValue(guardianInitialInfo.contact);
      ipAddressSetValue(guardianInitialInfo.ip);
      nodeAddressSetValue(guardianInitialInfo.orbsAddr);
    }
  }, [
    contactInfoSetValue,
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
        contact: formData.contactInfo,
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
        width: "100%",
      }}
    >
      {/*<TextField*/}
      {/*  required*/}
      {/*  style={{*/}
      {/*    width: "max-content",*/}
      {/*  }}*/}
      {/*  // fullWidth*/}
      {/*  inputProps={{*/}
      {/*    style: {*/}
      {/*      width: "max-content",*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  name={"guardianAddress"}*/}
      {/*  title={"guardianAddress"}*/}
      {/*  label={"Guardian Address"}*/}
      {/*  value={guardianAddress}*/}
      {/*  disabled*/}
      {/*  inputRef={register}*/}
      {/*/>*/}
      {/*<br />*/}
      <TextField
        fullWidth
        name={"name"}
        label={"name"}
        value={name.value}
        onChange={(e) => name.setValue(e.target.value)}
        required
        inputRef={register}
      />
      <br />
      <TextField
        fullWidth
        name={"website"}
        title={
          "A valid website URL is required. The Guardian website is used by delegators when selecting a Guardian.\n"
        }
        label={"website"}
        value={website.value}
        onChange={(e) => website.setValue(e.target.value)}
        required
        inputRef={register({ validate: validURL })}
        error={errorWebsite}
        helperText={errorWebsite && WEBSITE_MESSAGE}
      />
      <br />
      <TextField
        fullWidth
        name={"contactInfo"}
        title={"contactInfo"}
        label={"Contact Info"}
        value={contactInfo.value}
        onChange={(e) => contactInfo.setValue(e.target.value)}
        required
        inputRef={register}
      />
      <br />
      <TextField
        fullWidth
        name={"ipAddress"}
        title={
          "A valid IPv4 address is required to allow the Guardian’s node to connect to the network gossip topology."
        }
        label={"IP"}
        value={ipAddress.value}
        onChange={(e) => ipAddress.setValue(e.target.value)}
        required
        inputRef={register({ pattern: IP_REGEX })}
        error={errorIPAddress}
        helperText={errorIPAddress && IP_ADDRESS_MESSAGE}
      />

      <br />
      <TextField
        fullWidth
        name={"nodeAddress"}
        title={
          "The node address is used for signing blocks on Orbs and sending automated \n node notification transactions such as ready or auto voteout."
        }
        label={"Node Address"}
        value={nodeAddress.value}
        onChange={(e) => nodeAddress.setValue(e.target.value)}
        required
        inputRef={register({ pattern: ETHEREUM_ADDRESS_REGEX })}
        error={errorNodeAddress}
        helperText={errorNodeAddress && NODE_ADDRESS_MESSAGE}
      />
      <br />
      <br />
      <Button variant={"outlined"} fullWidth type={"submit"}>
        {actionButtonTitle}
      </Button>
    </form>
  );
});
