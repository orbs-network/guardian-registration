import React, { useMemo } from "react";
import { observer } from "mobx-react";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../store/storeHooks";
import { EditGuardianInfoSection } from "./EditGuardianInfoSection";
import { RegisterGuardianSection } from "./RegisterGuardianSection";
import { RewardsDistributionFrequencyForm } from "./RewardsDistributionFrequencyForm";
import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // border: "1px solid black",
    width: "max-content",
    padding: "2em",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const GuardiansRegisterOrEditPage = observer<
  React.FunctionComponent<IProps>
>((props) => {
  const classes = useStyles();

  const orbsAccountStore = useOrbsAccountStore();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

  // TODO : ORL : Organize all of this loading "ifs"
  if (orbsAccountStore.errorLoading) {
    return <div>Error loading</div>;
  }

  if (!orbsAccountStore.doneLoading) {
    return <div>Loading...</div>;
  }

  const title = orbsAccountStore.isGuardian
    ? "Guardian details update"
    : "Guardian Registration";
  let content;
  if (orbsAccountStore.isGuardian) {
    content = (
      <>
        <EditGuardianInfoSection
          guardianInfo={orbsAccountStore.guardianInfo}
          guardianAddress={cryptoWalletIntegrationStore.mainAddress}
          guardianContractInteractionTimes={
            orbsAccountStore.guardianContractInteractionTimes
          }
          updateGuardianDetails={(guardianRegistrationPayload) =>
            orbsAccountStore.updateGuardianInfo(guardianRegistrationPayload)
          }
        />

        <Divider style={{ width: "100%", height: "3px" }} />
        <br />
        <Typography variant={"h5"}>Rewards Distribution Frequency</Typography>
        <RewardsDistributionFrequencyForm
          currentFrequencyInHours={
            orbsAccountStore.rewardDistributionFrequencyInHours
          }
          updateRewardsFrequency={(frequencyInHours) =>
            orbsAccountStore.setGuardianDistributionFrequency(frequencyInHours)
          }
          isUsingDefaultValue={orbsAccountStore.isUsingDefaultRewardFrequency}
        />
      </>
    );
  } else {
    content = (
      <RegisterGuardianSection
        registerGuardian={(...args) =>
          orbsAccountStore.registerGuardian(...args)
        }
        guardianAddress={cryptoWalletIntegrationStore.mainAddress}
      />
    );
  }

  return (
    <div className={classes.page}>
      <Typography variant={"h5"}>{title}</Typography>
      <Typography>{cryptoWalletIntegrationStore.mainAddress}</Typography>
      {content}

      {orbsAccountStore.txCanceled && (
        <>
          <br />
          <Typography>You have canceled the transaction</Typography>
        </>
      )}
      <Backdrop className={classes.backdrop} open={orbsAccountStore.txPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
});
