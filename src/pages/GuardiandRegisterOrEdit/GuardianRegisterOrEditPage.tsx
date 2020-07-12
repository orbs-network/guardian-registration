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
import { Typography } from "@material-ui/core";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid black",
    width: "max-content",
    padding: "2em",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
    <div className={classes.paper}>
      <Typography variant={"h5"}>{title}</Typography>
      <Typography>{cryptoWalletIntegrationStore.mainAddress}</Typography>
      {content}
    </div>
  );
});
