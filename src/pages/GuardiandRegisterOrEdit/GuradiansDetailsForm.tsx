import React, { useCallback } from "react";
import { useStateful } from "react-hanger";
import { TGuardianRegistrationPayload } from "../../services/guardiansV2Service/IGuardiansV2Service";
import { Button, TextField } from "@material-ui/core";
import { TGuardianInfo } from "../../store/OrbsAccountStore";

interface IProps {
  guardianAddress: string;
  guardianInitialInfo: TGuardianInfo;
  submitInfo: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
}

/**
 * A single component to handle both "Guardian registration" and "Guardian Update"
 */
export const GuardiansDetailsForm = React.memo<IProps>((props) => {
  const { guardianAddress, guardianInitialInfo, submitInfo } = props;

  const name = useStateful(guardianInitialInfo.name);
  const website = useStateful(guardianInitialInfo.website);
  const contactInfo = useStateful(guardianInitialInfo.contact);
  const ipAddress = useStateful(guardianInitialInfo.ip);
  const nodeAddress = useStateful(guardianInitialInfo.orbsAddr);

  // TODO : O.L : Add tx progress indicator
  const submit = useCallback(() => {
    const guardianRegistrationPayload: TGuardianRegistrationPayload = {
      ip: ipAddress.value,
      orbsAddr: nodeAddress.value,
      name: name.value,
      website: website.value,
      contact: contactInfo.value,
    };
    // TODO  : ORL : Convert IP to hex
    submitInfo(guardianRegistrationPayload);
  }, [
    contactInfo.value,
    ipAddress.value,
    name.value,
    nodeAddress.value,
    submitInfo,
    website.value,
  ]);

  return (
    <form>
      <TextField
        title={"guardianAddress"}
        label={"Guardian Address"}
        value={guardianAddress}
        disabled
      />
      <br />
      <TextField
        label={"name"}
        value={name.value}
        onChange={(e) => name.setValue(e.target.value)}
      />
      <br />
      <TextField
        title={"website"}
        label={"website"}
        value={website.value}
        onChange={(e) => website.setValue(e.target.value)}
      />
      <br />
      <TextField
        title={"contactInfo"}
        label={"Contact Info"}
        value={contactInfo.value}
        onChange={(e) => contactInfo.setValue(e.target.value)}
      />
      <br />
      <TextField
        title={"ipAddress"}
        label={"IP"}
        value={ipAddress.value}
        onChange={(e) => ipAddress.setValue(e.target.value)}
      />

      <br />
      <TextField
        title={"nodeAddress"}
        label={"Node Address"}
        value={nodeAddress.value}
        onChange={(e) => nodeAddress.setValue(e.target.value)}
      />
      <br />
      <Button onClick={submit}> Register </Button>
    </form>
  );
});
