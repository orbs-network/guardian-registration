import React, { useCallback } from "react";
import { Page } from "../../../components/structure/Page";
import { ContentFitting } from "../../../components/structure/ContentFitting";
import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import { RegisterGuardianSection } from "./RegisterGuardianSection";
import { makeStyles } from "@material-ui/core/styles";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../../store/storeHooks";
import { useSnackbar } from "notistack";
import { useCryptoWalletConnectionService } from "../../../services/servicesHooks";
import { TGuardianRegistrationPayload } from "@orbs-network/contracts-js";
import { ActionButton } from "../../../components/shared/ActionButton/ActionButton";
import useTheme from "@material-ui/core/styles/useTheme";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const GuardianRegistrationPage = React.memo<IProps>((props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();
  const cryptoWalletIntegrationService = useCryptoWalletConnectionService();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
  const orbsAccountStore = useOrbsAccountStore();

  const registerGuardian = useCallback(
    async (guardianRegistrationPayload: TGuardianRegistrationPayload) => {
      try {
        await orbsAccountStore.registerGuardian(guardianRegistrationPayload);
      } catch (e) {
        enqueueSnackbar(`Error in 'Guardian Registration' TX ${e.message}`, {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, orbsAccountStore]
  );
  console.log(
    "Delegating to someone else: ",
    orbsAccountStore.isDelegatingToOtherAccount
  );

  return (
    <Page>
      <ContentFitting>
        {/* Content  */}
        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            maxWidth: "100%",
            // textAlign: "center",
            // alignItems: "center",
            // alignContent: "center",
          }}
        >
          {orbsAccountStore.isDelegatingToOtherAccount && (
            <Box
              component={Paper}
              p={2}
              m={2}
              style={{
                textAlign: "center",
                border: `1px dashed ${theme.palette.warning.main}`,
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
              <Typography style={{ color: theme.palette.warning.main }}>
                It seems you are currently delegating to another address.
              </Typography>
              <br />
              <Typography
                variant={"body2"}
                style={{ color: theme.palette.warning.main }}
              >
                Before registering as a Guardian you have to cancel that
                delegation
              </Typography>
              <br />
              <ActionButton warningVariant> Undelegate </ActionButton>
            </Box>
          )}

          {!orbsAccountStore.isDelegatingToOtherAccount && (
            <RegisterGuardianSection
              registerGuardian={registerGuardian}
              guardianAddress={cryptoWalletIntegrationStore.mainAddress}
              cryptoWalletConnectionService={cryptoWalletIntegrationService}
            />
          )}
        </div>
        <Backdrop
          className={classes.backdrop}
          open={orbsAccountStore.txPending}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ContentFitting>
    </Page>
  );
});
