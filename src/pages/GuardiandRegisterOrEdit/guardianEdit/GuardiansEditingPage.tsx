import React, { useCallback } from "react";
import { Page } from "../../../components/structure/Page";
import { ContentFitting } from "../../../components/structure/ContentFitting";
import { Backdrop, CircularProgress, Divider } from "@material-ui/core";
import { EditGuardianInfoSection } from "./EditGuardianInfoSection";
import { EditRewardsDistributionSection } from "./EditRewardsDistributionSection";
import { UnregisterSection } from "./UnregisterSection";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../../store/storeHooks";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { TGuardianUpdatePayload } from "../../../services/guardiansV2Service/IGuardiansV2Service";
import { EditDelegatorsCutSection } from "./EditDelegatorsCutSection";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const GuardianEditingPage = React.memo<IProps>((props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
  const orbsAccountStore = useOrbsAccountStore();

  const updateGuardianDetails = useCallback(
    async (guardianRegistrationPayload: TGuardianUpdatePayload) => {
      try {
        await orbsAccountStore.updateGuardianInfo(guardianRegistrationPayload);
        enqueueSnackbar("Guardian details successfully updated", {
          variant: "success",
        });
      } catch (e) {
        enqueueSnackbar(`Error in 'Guardian Details Update' TX ${e.message}`, {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, orbsAccountStore]
  );

  const updateRewardsFrequency = useCallback(
    async (frequencyInHours: number) => {
      try {
        await orbsAccountStore.setGuardianDistributionFrequency(
          frequencyInHours
        );
        enqueueSnackbar("Rewards frequency successfully updated", {
          variant: "success",
        });
      } catch (e) {
        enqueueSnackbar(`Error in 'Rewards Frequency Update' TX ${e.message}`, {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, orbsAccountStore]
  );

  const updateDelegatorsCut = useCallback(
    async (delegatorsCutPercentage: number) => {
      try {
        await orbsAccountStore.writeGuardianDelegatorsCutPercentage(
          delegatorsCutPercentage
        );
        enqueueSnackbar("Delegators cut successfully updated", {
          variant: "success",
        });
      } catch (e) {
        enqueueSnackbar(
          `Error in 'Delegators cut percentage Update' TX ${e.message}`,
          {
            variant: "error",
          }
        );
      }
    },
    [enqueueSnackbar, orbsAccountStore]
  );

  const updateGuardianId = useCallback(
    async (guardianId: string) => {
      try {
        await orbsAccountStore.writeGuardianId(guardianId);
        enqueueSnackbar("Guardian ID successfully updated", {
          variant: "success",
        });
      } catch (e) {
        enqueueSnackbar(`Error in 'Guardian ID Update' TX ${e.message}`, {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, orbsAccountStore]
  );

  const unregisterGuardian = useCallback(async () => {
    try {
      await orbsAccountStore.unregisterGuardian();
    } catch (e) {
      enqueueSnackbar(`Error in 'Unregister guardian' TX ${e.message}`, {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, orbsAccountStore]);

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "min-content",
              textAlign: "center",
            }}
          >
            <EditGuardianInfoSection
              guardianInfo={orbsAccountStore.guardianInfo}
              guardianAddress={cryptoWalletIntegrationStore.mainAddress}
              guardianContractInteractionTimes={
                orbsAccountStore.guardianContractInteractionTimes
              }
              updateGuardianDetails={updateGuardianDetails}
            />

            <Divider
              style={{ width: "100%", height: "3px", marginBottom: "1rem" }}
            />

            <EditDelegatorsCutSection
              updateDelegatorsCut={updateDelegatorsCut}
              delegatorsCut={orbsAccountStore.delegatorsCutPercentage}
              isUsingDefaultValue={
                orbsAccountStore.isUsingDefaultDelegatorsCutPercentage
              }
            />

            <Divider
              style={{
                width: "100%",
                height: "3px",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            />
            <UnregisterSection unregisterGuardian={unregisterGuardian} />
            <br />
          </div>
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
