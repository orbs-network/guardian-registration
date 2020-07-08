import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useStateful } from "react-hanger";

interface IProps {}

export const RegisterGuardianSection = React.memo<IProps>((props) => {
  const name = useStateful("");
  const website = useStateful("");
  const contactInfo = useStateful("");
  const ipAddress = useStateful("");
  const guardianAddress = useStateful("");
  const nodeAddress = useStateful("");

  return (
    <form>
      <TextField
        label={"name"}
        value={name.value}
        onChange={(e) => name.setValue(e.target.value)}
      />
      <br />
      <TextField
        title={"website"}
        label={"website"}
        // placeholder={"website"}
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
        title={"guardianAddress"}
        label={"Guardian Address"}
        value={guardianAddress.value}
        onChange={(e) => guardianAddress.setValue(e.target.value)}
      />

      <br />
      <TextField
        title={"nodeAddress"}
        label={"Node Address"}
        value={nodeAddress.value}
        onChange={(e) => nodeAddress.setValue(e.target.value)}
      />

      <br />
      <Button> Submit </Button>
    </form>
  );
});
