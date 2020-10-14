import React, { useCallback } from "react";
import { Page } from "../../../components/structure/Page";
import { ContentFitting } from "../../../components/structure/ContentFitting";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { RegisterGuardianSection } from "./RegisterGuardianSection";
import { makeStyles } from "@material-ui/core/styles";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../../store/storeHooks";
import { useSnackbar } from "notistack";
import { useCryptoWalletConnectionService } from "../../../services/servicesHooks";
import { TGuardianRegistrationPayload } from "@orbs-network/contracts-js";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const GuardianRegistrationPage = React.memo<IProps>((props) => {
  const classes = useStyles();

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
          <RegisterGuardianSection
            registerGuardian={registerGuardian}
            guardianAddress={cryptoWalletIntegrationStore.mainAddress}
            cryptoWalletConnectionService={cryptoWalletIntegrationService}
          />
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
