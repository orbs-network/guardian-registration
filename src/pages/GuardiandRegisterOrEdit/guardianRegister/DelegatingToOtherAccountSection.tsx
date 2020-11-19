import React from "react";
import { Box, Paper, Typography, useTheme } from "@material-ui/core";
import ActionButton from "@bit/orbs-network.commons.action-button";

interface IProps {
  userAddress: string;
  currentSelectedGuardianAddress: string;

  unDelegate: () => void;
}

export const DelegatingToOtherAccountSection = React.memo<IProps>((props) => {
  const { userAddress, currentSelectedGuardianAddress, unDelegate } = props;
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      p={2}
      m={2}
      style={{
        maxWidth: "100%",
        textAlign: "center",
        border: `1px dashed ${theme.palette.secondary.main}`,
        overflowX: "hidden",
      }}
    >
      <Typography
        style={{
          fontWeight: "bold",
          color: theme.palette.warning.dark,
          textDecoration: "underline",
        }}
      >
        Please note
      </Typography>
      <br />
      <Typography style={{ fontWeight: "bold" }}>
        Connected with address{" "}
      </Typography>
      <Typography
        color={"secondary"}
        noWrap
        style={{ textOverflow: "ellipsis" }}
      >
        {userAddress}
      </Typography>
      <br />
      <Typography style={{ fontWeight: "bold" }}>
        This address is currently delegating to
      </Typography>

      <Typography
        color={"secondary"}
        noWrap
        style={{ textOverflow: "ellipsis" }}
      >
        {currentSelectedGuardianAddress}
      </Typography>
      <br />
      <Typography variant={"body2"}>
        Prior to registering as a Guardian this delegation needs to be
        cancelled.
      </Typography>
      <br />
      <ActionButton className={"d"} onClick={unDelegate}>
        {" "}
        Undelegate{" "}
      </ActionButton>
    </Box>
  );
});
