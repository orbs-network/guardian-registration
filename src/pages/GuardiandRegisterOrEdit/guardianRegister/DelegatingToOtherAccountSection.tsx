import React from "react";
import { Box, Paper, Typography, useTheme } from "@material-ui/core";
import ActionButton from "@bit/orbs-network.commons.action-button";
import { useDelegatingToAnotherSectionTranslations } from "../../../translations/translationsHooks";

interface IProps {
  userAddress: string;
  currentSelectedGuardianAddress: string;

  unDelegate: () => void;
}

export const DelegatingToOtherAccountSection = React.memo<IProps>((props) => {
  const { userAddress, currentSelectedGuardianAddress, unDelegate } = props;
  const theme = useTheme();
  const delegatingToAnotherSectionTranslations = useDelegatingToAnotherSectionTranslations();

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
        {delegatingToAnotherSectionTranslations("text_pleaseNote")}
      </Typography>
      <br />
      <Typography style={{ fontWeight: "bold" }}>
        {delegatingToAnotherSectionTranslations("text_connectedWithAddress")}
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
        {delegatingToAnotherSectionTranslations(
          "text_thisAddressIsCurrentlyDelegatingTo"
        )}
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
        {delegatingToAnotherSectionTranslations(
          "explanation_previousDelegationsNeedsToBeCanceled"
        )}
      </Typography>
      <br />
      <ActionButton className={"d"} onClick={unDelegate}>
        {delegatingToAnotherSectionTranslations("action_unDelegate")}
      </ActionButton>
    </Box>
  );
});
