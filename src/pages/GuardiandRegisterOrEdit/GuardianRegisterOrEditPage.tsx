import React, { useCallback, useMemo } from "react";
import { observer } from "mobx-react";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../store/storeHooks";
import { EditGuardianInfoSection } from "./EditGuardianInfoSection";
import { RegisterGuardianSection } from "./RegisterGuardianSection";
import { RewardsDistributionFrequencyForm } from "./forms/RewardsDistributionFrequencyForm";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import { EditRewardsDistributionSection } from "./EditRewardsDistributionSection";
import { Page } from "../../components/structure/Page";
import { ContentFitting } from "../../components/structure/ContentFitting";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  TGuardianRegistrationPayload,
  TGuardianUpdatePayload,
} from "../../services/guardiansV2Service/IGuardiansV2Service";
import { useSnackbar } from "notistack";
import { useCryptoWalletConnectionService } from "../../services/servicesHooks";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const GuardiansRegisterOrEditPage = observer<
  React.FunctionComponent<IProps>
>((props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const orbsAccountStore = useOrbsAccountStore();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
  const cryptoWalletIntegrationService = useCryptoWalletConnectionService();

  const title = orbsAccountStore.isGuardian
    ? "Guardian details update"
    : "Guardian Registration";
  let content;

  const updateGuardianDetails = useCallback(
    async (guardianRegistrationPayload: TGuardianUpdatePayload) => {
      try {
        await orbsAccountStore.updateGuardianInfo(guardianRegistrationPayload);
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
      } catch (e) {
        enqueueSnackbar(`Error in 'Rewards Frequency Update' TX ${e.message}`, {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, orbsAccountStore]
  );

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

  // TODO : ORL : Organize all of this loading "ifs"
  if (orbsAccountStore.errorLoading) {
    return (
      <Page>
        <ContentFitting>
          <Typography>Error loading</Typography>
        </ContentFitting>{" "}
      </Page>
    );
  }

  if (!orbsAccountStore.doneLoading) {
    return (
      <Page>
        <ContentFitting>
          <Typography>Loading...</Typography>
        </ContentFitting>{" "}
      </Page>
    );
  }

  if (orbsAccountStore.isGuardian) {
    content = (
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

        <Divider style={{ width: "100%", height: "3px" }} />

        <EditRewardsDistributionSection
          currentFrequencyInHours={
            orbsAccountStore.rewardDistributionFrequencyInHours
          }
          updateRewardsFrequency={updateRewardsFrequency}
          isUsingDefaultValue={orbsAccountStore.isUsingDefaultRewardFrequency}
        />
      </div>
    );
  } else {
    content = (
      <RegisterGuardianSection
        registerGuardian={registerGuardian}
        guardianAddress={cryptoWalletIntegrationStore.mainAddress}
        cryptoWalletConnectionService={cryptoWalletIntegrationService}
      />
    );
  }

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
          {content}
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
