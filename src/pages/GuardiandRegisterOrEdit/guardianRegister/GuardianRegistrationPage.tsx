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

  const unDelegate = useCallback(async () => {
    try {
      await orbsAccountStore.unDelegateCurrentDelegation();
    } catch (e) {
      enqueueSnackbar(`Error in 'un-delegating' TX ${e.message}`, {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, orbsAccountStore]);

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
                {cryptoWalletIntegrationStore.mainAddress}
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
                {orbsAccountStore.selectedGuardianAddress}
              </Typography>
              <br />
              <Typography variant={"body2"}>
                Prior to registering as a Guardian this delegation needs to be
                cancelled.
              </Typography>
              <br />
              <ActionButton onClick={unDelegate}> Undelegate </ActionButton>
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
