import React, { useMemo } from "react";
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
  Backdrop,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import { EditRewardsDistributionSection } from "./EditRewardsDistributionSection";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  page: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // border: "1px solid black",
    width: "fit-content",
    maxWidth: "100%",
    boxSizing: "border-box",
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
        <EditRewardsDistributionSection
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
      <div
        style={{
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant={"h5"}>{title}</Typography>
        <Typography
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {cryptoWalletIntegrationStore.mainAddress}
        </Typography>
      </div>
      <div
        style={{
          display: "grid",
          textAlign: "center",
        }}
      >
        {content}
      </div>

      <br />
      <Divider style={{ width: "100%", height: "3px" }} />
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
