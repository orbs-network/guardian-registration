import React, { useCallback, useState } from "react";
import { Page } from "../../../components/structure/Page";
import { ContentFitting } from "../../../components/structure/ContentFitting";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Collapse,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { EditGuardianInfoSection } from "./sections/EditGuardianInfoSection";
import { EditRewardsDistributionSection } from "./sections/EditRewardsDistributionSection";
import { UnregisterSection } from "./sections/UnregisterSection";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../../store/storeHooks";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { EditDelegatorsShareSection } from "./sections/EditDelegatorsShareSection";
import { observer } from "mobx-react";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";
import { TGuardianUpdatePayload } from "@orbs-network/contracts-js";
import {
  DETAILS_REQUIREMENTS_LINK,
  EditDelegatorsCertificateSection,
} from "./sections/EditDelegatorsCertificateSection";
import { CompactInput } from "../../../components/CompactInput/CompactInput";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import MoneyIcon from "@material-ui/icons/Money";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SwipeableViews from "react-swipeable-views";
import useTheme from "@material-ui/core/styles/useTheme";
import { GuardianDetails } from "./GuardianDetails";
import { UnregisterForm } from "../forms/UnregisterForm";
import { ActionConfirmationModal } from "../../../components/shared/modals/ActionConfirmationModal";
import { DelegatorsShareForm } from "../forms/DelegatorsShareForm";
import { FormWrapper } from "../../../components/forms/FormWrapper";
import Fade from "@material-ui/core/Fade";
import { GuardiansDetailsUrlForm } from "../forms/GuardiansDetailsUrlForm";
import { GuardiansDetailsForm } from "../forms/GuradiansDetailsForm";
import { BoxProps } from "@material-ui/core/Box/Box";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  tab: {
    transition: "0.5s",
    color: theme.palette.secondary.dark,
    opacity: 0.5,

    "&:hover": {
      // backgroundColor: "rgba(255,255,255, 0.1)",
    },

    "&.MuiTab-textColorPrimary.Mui-selected": {
      // backgroundColor: "rgba(255,255,255, 0.1)",

      fontWeight: "bold",
      color: theme.palette.secondary.main,
      opacity: 1,
    },
  },
  tabPanel: {
    maxWidth: "100%",
    overflow: "hidden",
  },
}));

const TABS_IDS = {
  info: "info",
  editInfo: "editInfo",
  delegatorsShare: "delegatorsShare",
  certificate: "certificate",
  unregister: "unregister",
};

export const GuardianEditingPage = observer<React.FunctionComponent<IProps>>(
  (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const { enqueueSnackbar } = useSnackbar();
    const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
    const orbsAccountStore = useOrbsAccountStore();

    // TODO : ORL : The whole modal logic is duplicated from 'Subscription UI' - Unite them properly
    const [showModal, setShowModal] = useState(false);
    const [onDialogAccept, setOnDialogAccept] = useState(() => () =>
      console.log("Accepted")
    );
    const [dialogTexts, setDialogTexts] = useState<{
      title: string;
      content?: string;
      instruction?: string;
      acceptText?: string;
      cancelText?: string;
      onCancelMessage?: string;
    }>({ title: "", content: "", instruction: "" });

    const updateGuardianDetails = useCallback(
      async (guardianRegistrationPayload: TGuardianUpdatePayload) => {
        setDialogTexts({
          title: `Update your Details`,
          instruction: "Please press 'Accept' and confirm the transaction",
          onCancelMessage: "Action canceled",
        });
        setShowModal(true);
        setOnDialogAccept(() => async () => {
          try {
            const txRes = await orbsAccountStore.updateGuardianInfo(
              guardianRegistrationPayload
            );

            if (txRes) {
              enqueueSnackbar("Guardian details successfully updated", {
                variant: "success",
              });
            }
          } catch (e) {
            enqueueSnackbar(
              `Error in 'Guardian Details Update' TX ${e.message}`,
              {
                variant: "error",
              }
            );
          }
        });
      },
      [enqueueSnackbar, orbsAccountStore]
    );

    const updateDelegatorsShare = useCallback(
      async (delegatorsSharePercentage: number) => {
        setDialogTexts({
          title: `Update Delegators share`,
          content: `Your Delegator's share will change to to ${delegatorsSharePercentage.toLocaleString()}%`,
          instruction: "Please press 'Accept' and confirm the transaction",
          onCancelMessage: "Action canceled",
        });
        setShowModal(true);
        setOnDialogAccept(() => async () => {
          try {
            const txRes = await orbsAccountStore.writeGuardianDelegatorsCutPercentage(
              delegatorsSharePercentage
            );

            if (txRes) {
              enqueueSnackbar("Delegators share successfully updated", {
                variant: "success",
              });
            }
          } catch (e) {
            enqueueSnackbar(
              `Error in 'Delegators share percentage Update' TX ${e.message}`,
              {
                variant: "error",
              }
            );
          }
        });
      },
      [enqueueSnackbar, orbsAccountStore]
    );

    const updateGuardianDetailsPage = useCallback(
      async (guardianDetailsPageUrl: string) => {
        setDialogTexts({
          title: `Update details page URL`,
          content: `Your details page URL will change to ${guardianDetailsPageUrl}`,
          instruction: "Please press 'Accept' and confirm the transaction",
          onCancelMessage: "Action canceled",
        });
        setShowModal(true);
        setOnDialogAccept(() => async () => {
          try {
            const txRes = await orbsAccountStore.writeGuardianDetailsPageURL(
              guardianDetailsPageUrl
            );

            if (txRes) {
              enqueueSnackbar("Guardian details page URL updated", {
                variant: "success",
              });
            }
          } catch (e) {
            enqueueSnackbar(
              `Error in 'Guardian details page URL Update' TX ${e.message}`,
              {
                variant: "error",
              }
            );
          }
        });
      },
      [enqueueSnackbar, orbsAccountStore]
    );

    const unregisterGuardian = useCallback(async () => {
      setDialogTexts({
        title: `You are about to unregister from the Orbs Guardian role`,
        content:
          "You and your Delegators will no longer be eligible for rewards",
        instruction: "Are you sure ?",
        acceptText: "yes",
        onCancelMessage: "Action canceled",
      });
      setShowModal(true);
      setOnDialogAccept(() => async () => {
        try {
          await orbsAccountStore.unregisterGuardian();
        } catch (e) {
          enqueueSnackbar(`Error in 'Unregister guardian' TX ${e.message}`, {
            variant: "error",
          });
        }
      });
    }, [enqueueSnackbar, orbsAccountStore]);

    const [tabValue, setTabValue] = React.useState(TABS_IDS.info);

    const guardianDetails = (
      <GuardianDetails
        guardianAddress={cryptoWalletIntegrationStore.mainAddress}
        guardianInfo={orbsAccountStore.guardianInfo}
        delegatorsShare={{
          defaultValue:
            orbsAccountStore.rewardsContractSettings
              .defaultDelegatorsStakingRewardsPercent,
          isUsingDefaultValue:
            orbsAccountStore.isUsingDefaultDelegatorsCutPercentage,
          maxValue:
            orbsAccountStore.rewardsContractSettings
              .maxDelegatorsStakingRewardsPercent,
          value: orbsAccountStore.delegatorsCutPercentage,
        }}
        guardianCertificationUrl={{
          currentGuardianDetailsUrl: orbsAccountStore.detailsPageUrl || "",
          hasGuardianDetailsUrl: orbsAccountStore.hasGuardianDetailsURL,
        }}
        highlightInfo={tabValue === TABS_IDS.editInfo}
        highlightDelegatorsShare={tabValue === TABS_IDS.delegatorsShare}
        highlightCertificateUrl={tabValue === TABS_IDS.certificate}
      />
    );

    const showDetails = tabValue !== TABS_IDS.unregister;

    return (
      <Page>
        <ContentFitting
          style={{
            width: "35rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Content  */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "min-content",
              alignItems: "center",
            }}
          >
            {/*  TODO : ORL : Make the 'Tabs' scrollable on mobile */}
            {/*  Tabs  */}
            <div style={{}}>
              <Tabs
                scrollButtons={"auto"}
                value={tabValue}
                onChange={(event, value) => setTabValue(value)}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="primary"
                aria-label="icon tabs example"
                TabIndicatorProps={{
                  color: "secondary",
                }}
              >
                <Tab
                  // textColor={"secondary"}
                  // icon={<PermIdentityIcon />}
                  label="Info"
                  aria-label="phone"
                  className={classes.tab}
                  value={TABS_IDS.info}
                />
                <Tab
                  className={classes.tab}
                  // icon={<EditIcon />}
                  label={"Edit Info"}
                  value={TABS_IDS.editInfo}
                  aria-label="phone"
                />
                <Tab
                  className={classes.tab}
                  // icon={<MoneyIcon />}
                  label={"Delegators share"}
                  value={TABS_IDS.delegatorsShare}
                  aria-label="favorite"
                />
                <Tab
                  className={classes.tab}
                  // icon={<VerifiedUserIcon />}
                  // label={"Certificate URL"}
                  label={"Guardian details URL"}
                  value={TABS_IDS.certificate}
                  aria-label="favorite"
                />
                <Tab
                  className={classes.tab}
                  // icon={<HighlightOffIcon />}
                  label={"Unregister"}
                  value={TABS_IDS.unregister}
                  aria-label="person"
                />
              </Tabs>
            </div>
            {showDetails && guardianDetails}

            {/* Info */}
            <TabPanel
              className={classes.tabPanel}
              value={tabValue}
              index={TABS_IDS.info}
              dir={theme.direction}
            ></TabPanel>

            {/* Edit Details */}
            <TabPanel
              className={classes.tabPanel}
              value={tabValue}
              index={TABS_IDS.editInfo}
              dir={theme.direction}
            >
              <FormWrapper>
                <GuardiansDetailsForm
                  submitInfo={updateGuardianDetails}
                  guardianInitialInfo={orbsAccountStore.guardianInfo}
                  actionButtonTitle={"Update"}
                />
                {/*<Typography variant={"h6"}>*/}
                {/*    Details Last updated: {lastUpdateDate.toLocaleString()}*/}
                {/*</Typography>*/}
              </FormWrapper>
            </TabPanel>
            {/* Edit Delegator's share */}
            <TabPanel
              className={classes.tabPanel}
              value={tabValue}
              index={TABS_IDS.delegatorsShare}
              dir={theme.direction}
            >
              <FormWrapper>
                <DelegatorsShareForm
                  updateDelegatorsCut={updateDelegatorsShare}
                  currentDelegatorsCut={
                    orbsAccountStore.delegatorsCutPercentage
                  }
                  isUsingDefaultValue={
                    orbsAccountStore.isUsingDefaultDelegatorsCutPercentage
                  }
                  delegatorsCutDefaultValue={
                    orbsAccountStore.rewardsContractSettings
                      .defaultDelegatorsStakingRewardsPercent
                  }
                  delegatorsCutMaxValue={
                    orbsAccountStore.rewardsContractSettings
                      .maxDelegatorsStakingRewardsPercent
                  }
                />
              </FormWrapper>
            </TabPanel>
            {/* Edit Guardian Certification  */}
            <TabPanel
              className={classes.tabPanel}
              value={tabValue}
              index={TABS_IDS.certificate}
              dir={theme.direction}
            >
              <FormWrapper>
                <GuardiansDetailsUrlForm
                  currentGuardianDetailsUrl={orbsAccountStore.detailsPageUrl}
                  hasGuardianDetailsUrl={orbsAccountStore.hasGuardianDetailsURL}
                  updateGuardianDetailsUrl={updateGuardianDetailsPage}
                  detailsRequirementsLink={DETAILS_REQUIREMENTS_LINK}
                />
              </FormWrapper>
            </TabPanel>
            {/* Unregister */}
            <TabPanel
              className={classes.tabPanel}
              value={tabValue}
              index={TABS_IDS.unregister}
              dir={theme.direction}
            >
              <UnregisterForm unregisterGuardian={unregisterGuardian} />
            </TabPanel>
          </div>

          {/* Modal */}
          <ActionConfirmationModal
            title={dialogTexts.title}
            contentText={dialogTexts.content}
            instructionText={dialogTexts.instruction}
            open={showModal}
            acceptText={dialogTexts.acceptText}
            cancelText={dialogTexts.cancelText}
            onAccept={() => {
              setShowModal(false);
              onDialogAccept();
            }}
            onCancel={() => {
              setShowModal(false);
              if (dialogTexts.onCancelMessage) {
                enqueueSnackbar(dialogTexts.onCancelMessage, {
                  variant: "info",
                  preventDuplicate: true,
                });
              }
            }}
          />

          <Backdrop
            className={classes.backdrop}
            open={orbsAccountStore.txPending}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </ContentFitting>
      </Page>
    );
  }
);

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps & BoxProps) {
  const { children, value, index, ...other } = props;

  return value === index ? (
    <Box p={3} {...other}>
      {children}
    </Box>
  ) : null;

  // return (
  //   <div
  //     role="tabpanel"
  //     hidden={value !== index}
  //     id={`full-width-tabpanel-${index}`}
  //     aria-labelledby={`full-width-tab-${index}`}
  //     {...other}
  //   >
  //     {value === index && <Box p={3}>{children}</Box>}
  //   </div>
  // );
}
