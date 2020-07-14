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
    <Page>
      <ContentFitting>
        {/* Content  */}
        <div
          style={{
            display: "grid",
            textAlign: "center",
            maxWidth: "100%",
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
