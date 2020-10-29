import React, { useCallback } from "react";
import { Page } from "../../../components/structure/Page";
import { ContentFitting } from "../../../components/structure/ContentFitting";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
} from "@material-ui/core";
import { EditGuardianInfoSection } from "./EditGuardianInfoSection";
import { EditRewardsDistributionSection } from "./EditRewardsDistributionSection";
import { UnregisterSection } from "./UnregisterSection";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../../store/storeHooks";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import { EditDelegatorsCutSection } from "./EditDelegatorsCutSection";
import { observer } from "mobx-react";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";
import { TGuardianUpdatePayload } from "@orbs-network/contracts-js";
import { EditDelegatorsCertificateSection } from "./EditDelegatorsCertificateSection";
import { CompactInput } from "../../../components/CompactInput/CompactInput";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import MoneyIcon from "@material-ui/icons/Money";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

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

      color: theme.palette.secondary.main,
      opacity: 1,
    },
  },
}));

export const GuardianEditingPage = observer<React.FunctionComponent<IProps>>(
  (props) => {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();
    const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();
    const orbsAccountStore = useOrbsAccountStore();

    const updateGuardianDetails = useCallback(
      async (guardianRegistrationPayload: TGuardianUpdatePayload) => {
        try {
          await orbsAccountStore.updateGuardianInfo(
            guardianRegistrationPayload
          );
          enqueueSnackbar("Guardian details successfully updated", {
            variant: "success",
          });
        } catch (e) {
          enqueueSnackbar(
            `Error in 'Guardian Details Update' TX ${e.message}`,
            {
              variant: "error",
            }
          );
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

    const updateGuardianDetailsPage = useCallback(
      async (guardianDetailsPageUrl: string) => {
        try {
          await orbsAccountStore.writeGuardianDetailsPageURL(
            guardianDetailsPageUrl
          );
          enqueueSnackbar("Details page URL updated", {
            variant: "success",
          });
        } catch (e) {
          enqueueSnackbar(
            `Error in 'Details page URL Update' TX ${e.message}`,
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

    const [value, setValue] = React.useState(0);

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
            {/*  Tabs  */}
            <div>
              <Tabs
                value={value}
                onChange={(event, value) => setValue(value)}
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
                />
                <Tab
                  className={classes.tab}
                  // icon={<EditIcon />}
                  label={"Edit Info"}
                  aria-label="phone"
                />
                <Tab
                  className={classes.tab}
                  // icon={<MoneyIcon />}
                  label={"Delegator's share"}
                  aria-label="favorite"
                />
                <Tab
                  className={classes.tab}
                  // icon={<VerifiedUserIcon />}
                  label={"Certificate"}
                  aria-label="favorite"
                />
                <Tab
                  className={classes.tab}
                  // icon={<HighlightOffIcon />}
                  label={"Unregister"}
                  aria-label="person"
                />
              </Tabs>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

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
            <CompactInput
              title={"Delegators Cut"}
              value={"Default Value (70%)"}
            />
            <br />
            <br />
            <br />

            <EditDelegatorsCutSection
              updateDelegatorsCut={updateDelegatorsCut}
              delegatorsCut={orbsAccountStore.delegatorsCutPercentage}
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

            <Divider
              style={{ width: "100%", height: "3px", marginBottom: "1rem" }}
            />

            <EditDelegatorsCertificateSection
              updateGuardianDetailsUrl={(detailsPageUrl) =>
                updateGuardianDetailsPage(detailsPageUrl)
              }
              currentGuardianDetailsUrl={orbsAccountStore.detailsPageUrl}
              hasGuardianDetailsUrl={orbsAccountStore.hasGuardianDetailsURL}
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
