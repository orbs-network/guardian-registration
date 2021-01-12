import React, { useCallback, useState } from "react";
import { Page } from "../../../components/structure/Page";
import { ContentFitting } from "../../../components/structure/ContentFitting";
import { Backdrop, Box, CircularProgress, Tab } from "@material-ui/core";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../../store/storeHooks";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { TGuardianUpdatePayload } from "@orbs-network/contracts-js";
import { DETAILS_REQUIREMENTS_LINK } from "./sections/EditDelegatorsCertificateSection";
import useTheme from "@material-ui/core/styles/useTheme";
import { GuardianDetails } from "./GuardianDetails";
import { UnregisterForm } from "../forms/UnregisterForm";
import { ActionConfirmationModal } from "../../../components/shared/modals/ActionConfirmationModal";
import { DelegatorsShareForm } from "../forms/DelegatorsShareForm";
import { FormWrapper } from "../../../components/forms/FormWrapper";
import { GuardiansDetailsUrlForm } from "../forms/GuardiansDetailsUrlForm";
import { BoxProps } from "@material-ui/core/Box/Box";
import {
  useGuardianEditPageTranslations,
  useModalsTranslations,
} from "../../../translations/translationsHooks";
import TabsHeader from "@bit/orbs-network.commons.tabs-header/dist/TabsHeader";
import { EGuardianFormActivePart } from "../forms/FullGuradianForm";
import { FullGuardianDetails } from "./FullGuardianDetails";
import { GuardiansDetailsForm } from "../forms/GuradiansDetailsForm";

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
    const modalsTranslations = useModalsTranslations();

    const guardianEditPageTranslations = useGuardianEditPageTranslations();

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
          title: modalsTranslations("modalTitle_updateGuardianInfo"),
          instruction: modalsTranslations("modalInstruction_defaultTx"),
          onCancelMessage: modalsTranslations("actionCanceled_default"),
        });
        setShowModal(true);
        setOnDialogAccept(() => async () => {
          try {
            const txRes = await orbsAccountStore.updateGuardianInfo(
              guardianRegistrationPayload
            );

            if (txRes) {
              enqueueSnackbar(
                modalsTranslations("successMessage_guardianInfo"),
                {
                  variant: "success",
                }
              );
            }
          } catch (e) {
            enqueueSnackbar(
              modalsTranslations("errorMessage_guardianInfo", {
                errorMessage: e.message,
              }),
              {
                variant: "error",
              }
            );
          }
        });
      },
      [enqueueSnackbar, modalsTranslations, orbsAccountStore]
    );

    const updateDelegatorsShare = useCallback(
      async (delegatorsSharePercentage: number) => {
        setDialogTexts({
          title: modalsTranslations("modalTitle_updateDelegatorsShare"),
          content: modalsTranslations("modalContent_delegatorsShare", {
            newDelegatorsShare: delegatorsSharePercentage.toLocaleString(),
          }),
          instruction: modalsTranslations("modalInstruction_defaultTx"),
          onCancelMessage: modalsTranslations("actionCanceled_default"),
        });
        setShowModal(true);
        setOnDialogAccept(() => async () => {
          try {
            const txRes = await orbsAccountStore.writeGuardianDelegatorsCutPercentage(
              delegatorsSharePercentage
            );

            if (txRes) {
              enqueueSnackbar(
                modalsTranslations("successMessage_delegatorsShare"),
                {
                  variant: "success",
                }
              );
            }
          } catch (e) {
            enqueueSnackbar(
              modalsTranslations("errorMessage_delegatorsShare", {
                errorMessage: e.message,
              }),
              {
                variant: "error",
              }
            );
          }
        });
      },
      [enqueueSnackbar, modalsTranslations, orbsAccountStore]
    );

    const updateGuardianDetailsPage = useCallback(
      async (guardianDetailsPageUrl: string) => {
        setDialogTexts({
          title: modalsTranslations("modalTitle_guardianDetailsPageUrl"),
          content: modalsTranslations("modalContent_guardianDetailsPageUrl", {
            guardianDetailsPageUrl: guardianDetailsPageUrl,
          }),
          instruction: modalsTranslations("modalInstruction_defaultTx"),
          onCancelMessage: modalsTranslations("actionCanceled_default"),
        });
        setShowModal(true);
        setOnDialogAccept(() => async () => {
          try {
            const txRes = await orbsAccountStore.writeGuardianDetailsPageURL(
              guardianDetailsPageUrl
            );

            if (txRes) {
              enqueueSnackbar(
                modalsTranslations("successMessage_guardianDetailsPageURL"),
                {
                  variant: "success",
                }
              );
            }
          } catch (e) {
            enqueueSnackbar(
              modalsTranslations("errorMessage_guardianDetailsPageURL", {
                errorMessage: e.message,
              }),
              {
                variant: "error",
              }
            );
          }
        });
      },
      [enqueueSnackbar, modalsTranslations, orbsAccountStore]
    );

    const unregisterGuardian = useCallback(async () => {
      setDialogTexts({
        title: modalsTranslations("modalTitle_unregister"),
        content: modalsTranslations("modalContent_unregister"),
        instruction: modalsTranslations("modalInstruction_unregister"),
        acceptText: modalsTranslations("acceptText_yes"),
        onCancelMessage: modalsTranslations("actionCanceled_default"),
      });
      setShowModal(true);
      setOnDialogAccept(() => async () => {
        try {
          const txRes = await orbsAccountStore.unregisterGuardian();

          if (txRes) {
            enqueueSnackbar(modalsTranslations("successMessage_unregister"), {
              variant: "success",
            });
          }
        } catch (e) {
          enqueueSnackbar(
            modalsTranslations("errorMessage_unregister", {
              errorMessage: e.message,
            }),
            {
              variant: "error",
            }
          );
        }
      });
    }, [enqueueSnackbar, modalsTranslations, orbsAccountStore]);

    const [tabValue, setTabValue] = React.useState(TABS_IDS.info);

    // DEV_NOTE : O.L : I have started building the "FullGuardianDetails" component, it turned out to be waaaay to mush hassle
    // for a simple UI style change.
    const guardianDetailsOriginal = (
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

    const buildGuardianDetailsForm = useCallback(
      (actionButtonTitle: string, activePart?: EGuardianFormActivePart) => {
        const guardianDetails = (
          <FullGuardianDetails
            activePart={activePart}
            actionButtonTitle={actionButtonTitle}
            submitGeneralInfo={updateGuardianDetails}
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
            updateDelegatorsCut={updateDelegatorsShare}
            guardianCertificationUrl={{
              currentGuardianDetailsUrl: orbsAccountStore.detailsPageUrl || "",
              hasGuardianDetailsUrl: orbsAccountStore.hasGuardianDetailsURL,
            }}
            updateGuardianDetailsUrl={updateGuardianDetailsPage}
            highlightInfo={tabValue === TABS_IDS.editInfo}
            highlightDelegatorsShare={tabValue === TABS_IDS.delegatorsShare}
            highlightCertificateUrl={tabValue === TABS_IDS.certificate}
          />
        );

        return guardianDetails;
      },
      [
        cryptoWalletIntegrationStore.mainAddress,
        orbsAccountStore.delegatorsCutPercentage,
        orbsAccountStore.detailsPageUrl,
        orbsAccountStore.guardianInfo,
        orbsAccountStore.hasGuardianDetailsURL,
        orbsAccountStore.isUsingDefaultDelegatorsCutPercentage,
        orbsAccountStore.rewardsContractSettings
          .defaultDelegatorsStakingRewardsPercent,
        orbsAccountStore.rewardsContractSettings
          .maxDelegatorsStakingRewardsPercent,
        tabValue,
        updateDelegatorsShare,
        updateGuardianDetails,
        updateGuardianDetailsPage,
      ]
    );

    const showDetails = tabValue !== TABS_IDS.unregister;

    return (
      <Page>
        <ContentFitting
          style={{
            // width: "35rem",
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
            <TabsHeader
              value={tabValue}
              onTabValueChange={(newTabValue) => setTabValue(newTabValue)}
            >
              <Tab
                label={guardianEditPageTranslations("tabHeader_info")}
                aria-label="phone"
                className={classes.tab}
                value={TABS_IDS.info}
                style={{ paddingBottom: "-100px" }}
              />
              <Tab
                className={classes.tab}
                label={guardianEditPageTranslations("tabHeader_editInfo")}
                value={TABS_IDS.editInfo}
                aria-label="phone"
              />
              <Tab
                className={classes.tab}
                label={guardianEditPageTranslations(
                  "tabHeader_delegatorsShare"
                )}
                value={TABS_IDS.delegatorsShare}
                aria-label="favorite"
              />
              <Tab
                className={classes.tab}
                label={guardianEditPageTranslations(
                  "tabHeader_guardianDetailsUrl"
                )}
                value={TABS_IDS.certificate}
                aria-label="favorite"
              />
              <Tab
                className={classes.tab}
                label={guardianEditPageTranslations("tabHeader_unregister")}
                value={TABS_IDS.unregister}
                aria-label="person"
              />
            </TabsHeader>

            {showDetails && guardianDetailsOriginal}

            {/* Info */}
            <TabPanel
              className={classes.tabPanel}
              value={tabValue}
              index={TABS_IDS.info}
              dir={theme.direction}
            >
              {/*{buildGuardianDetailsForm("")}*/}
            </TabPanel>

            {/* Edit Details */}
            <TabPanel
              className={classes.tabPanel}
              value={tabValue}
              index={TABS_IDS.editInfo}
              dir={theme.direction}
            >
              {/*{buildGuardianDetailsForm(*/}
              {/*  guardianEditPageTranslations("action_updateInfo"),*/}
              {/*  EGuardianFormActivePart.GeneralInfo*/}
              {/*)}*/}

              <FormWrapper>
                <GuardiansDetailsForm
                  submitInfo={updateGuardianDetails}
                  guardianInitialInfo={orbsAccountStore.guardianInfo}
                  actionButtonTitle={guardianEditPageTranslations(
                    "action_updateInfo"
                  )}
                />
              </FormWrapper>
            </TabPanel>
            {/* Edit Delegator's share */}
            <TabPanel
              className={classes.tabPanel}
              value={tabValue}
              index={TABS_IDS.delegatorsShare}
              dir={theme.direction}
            >
              {/*{buildGuardianDetailsForm(*/}
              {/*  guardianEditPageTranslations("action_updateDelegatorsShare"),*/}
              {/*  EGuardianFormActivePart.DelegatorsShare*/}
              {/*)}*/}
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
              {/*{buildGuardianDetailsForm(*/}
              {/*  guardianEditPageTranslations(*/}
              {/*    "action_updateCertifiedCommitteeUrl"*/}
              {/*  ),*/}
              {/*  EGuardianFormActivePart.DelegatorsShare*/}
              {/*)}*/}
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
