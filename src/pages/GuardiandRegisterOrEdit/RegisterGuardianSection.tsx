import React, { useCallback } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { useStateful } from "react-hanger";

interface IProps {
  guardianAddress: string;
  registerGuardian: (
    ip: string,
    orbsAddr: string,
    name: string,
    website: string,
    contact: string
  ) => void;
}

export const RegisterGuardianSection = React.memo<IProps>((props) => {
  const { guardianAddress, registerGuardian } = props;
  const name = useStateful("A");
  const website = useStateful("a.com");
  const contactInfo = useStateful("A's contact info");
  const ipAddress = useStateful("0x0b16212c");
  const nodeAddress = useStateful("0xe30a30069209aa4e7e7b07ab391966a0f071afd9");

  // TODO : O.L : Add tx progress indicator
  const submit = useCallback(() => {
    // TODO  : ORL : Convert IP to hex
    registerGuardian(
      ipAddress.value,
      nodeAddress.value,
      name.value,
      website.value,
      contactInfo.value
    );
  }, [
    contactInfo.value,
    ipAddress.value,
    name.value,
    nodeAddress.value,
    registerGuardian,
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
      <Button onClick={submit}> Submit </Button>
    </form>
  );
});
