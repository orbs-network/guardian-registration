import React, {
  DetailedHTMLProps,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useNumber, useStateful } from "react-hanger";
import { Grid, TextField, Typography } from "@material-ui/core";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { useForm } from "react-hook-form";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { TGuardianRegistrationPayload } from "@orbs-network/contracts-js";
import { validURL } from "./inoputValidators";
import ActionButton from "@bit/orbs-network.commons.action-button";
import {
  useDomainTranslations,
  useGuardianDataFormsTranslations,
} from "../../../translations/translationsHooks";
import { renderToString } from "react-dom/server";
import { baseTheme } from "../../../theme/Theme";
import { InTextLink } from "../../../components/InTextLink";

export enum EGuardianFormActivePart {
  None,
  GeneralInfo,
  DelegatorsShare,
  GuardianDetailsUrl,
}

interface IProps {
  /// **** What to show ****
  activePart?: EGuardianFormActivePart;

  /// **** Guardian General info ****
  actionButtonTitle: string;
  guardianInitialInfo: TGuardianInfo;
  submitInfo: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
  disableSubmit?: boolean;
  messageForSubmitButton?: string;

  /// **** Delegators share ****
  currentDelegatorsCut?: number;
  updateDelegatorsCut: (delegatorsCut: number) => void;
  isUsingDefaultValue?: boolean;
  // Configs
  delegatorsCutMaxValue: number;
  delegatorsCutDefaultValue: number;

  /// **** Guardian details url ****
  currentGuardianDetailsUrl?: string;
  updateGuardianDetailsUrl: (guardianDetailsUrl: string) => void;
  hasGuardianDetailsUrl?: boolean;

  // External links
  detailsRequirementsLink?: string;
}

const ETHEREUM_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const IP_REGEX = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

type TFormData = {
  name: string;
  website: string;
  contactInfo: string;
  ipAddress: string;
  nodeAddress: string;

  delegatorsCut: string;

  guardianDetailsUrl: string;
};

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "100%",
    // maxWidth: "80ch",
    width: "100%",
  },
  textField: {
    "& label.Mui-focused": {
      color: "#f5f5f5",
    },
    borderBottom: "1px solid #f0f0f0",
  },
  inputGridItem: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
}));

/**
 * A single component to handle both "Guardian registration" and "Guardian Update"
 */
export const FullGuardianForm = React.memo<
  IProps &
    DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >
>((props) => {
  const classes = useStyles();
  const {
    activePart,
    guardianInitialInfo,
    submitInfo,
    actionButtonTitle,
    disableSubmit,
    messageForSubmitButton,
    currentDelegatorsCut,
    updateDelegatorsCut,
    isUsingDefaultValue,
    delegatorsCutMaxValue,
    delegatorsCutDefaultValue,
    currentGuardianDetailsUrl,
    updateGuardianDetailsUrl,
    hasGuardianDetailsUrl,
    detailsRequirementsLink,
    ...rest
  } = props;

  const formActivePart: EGuardianFormActivePart =
    activePart ?? EGuardianFormActivePart.None;
  const disableGeneralInfoInputs =
    formActivePart !== EGuardianFormActivePart.GeneralInfo;
  const disableDelegatorsShareInputs =
    formActivePart !== EGuardianFormActivePart.DelegatorsShare;
  const disableGuardianDetailsUrlInputs =
    formActivePart !== EGuardianFormActivePart.GuardianDetailsUrl;

  const { register, handleSubmit, errors } = useForm<TFormData>();

  const domainTranslations = useDomainTranslations();
  const guardianDataFormsTranslations = useGuardianDataFormsTranslations();

  const name = useStateful(guardianInitialInfo.name);
  const website = useStateful(guardianInitialInfo.website);
  const ipAddress = useStateful(guardianInitialInfo.ip);
  const nodeAddress = useStateful(guardianInitialInfo.orbsAddr);

  const errorNodeAddress = !!errors.nodeAddress;
  const errorIPAddress = !!errors.ipAddress;
  const errorWebsite = !!errors.website;

  // DEV_NOTE : Taking ref for eslint-hooks
  const nameSetValue = name.setValue;
  const websiteSetValue = website.setValue;
  const ipAddressSetValue = ipAddress.setValue;
  const nodeAddressSetValue = nodeAddress.setValue;

  // DEV_NOTE : O.L : This is a hack to enforce update after registration,
  // TODO : O.L : Fix this
  useEffect(() => {
    if (guardianInitialInfo) {
      nameSetValue(guardianInitialInfo.name);
      websiteSetValue(guardianInitialInfo.website);
      ipAddressSetValue(guardianInitialInfo.ip);
      nodeAddressSetValue(guardianInitialInfo.orbsAddr);
    }
  }, [
    guardianInitialInfo,
    ipAddressSetValue,
    nameSetValue,
    nodeAddressSetValue,
    websiteSetValue,
  ]);

  const delegatorsCut = useNumber(Math.min(currentDelegatorsCut || 0, 66), {
    upperLimit: delegatorsCutMaxValue,
  });
  const errorDelegatorsCut = !!errors.delegatorsCut;
  const REWARDS_FREQUENCY_MESSAGE = guardianDataFormsTranslations(
    "fieldErrorMessage_delegatorsShare",
    {
      delegatorsCutMaxValue,
    }
  );

  const setDelegCut = delegatorsCut.setValue;
  useEffect(() => {
    setDelegCut(Math.min(currentDelegatorsCut || 0, delegatorsCutMaxValue));
  }, [currentDelegatorsCut, delegatorsCutMaxValue, setDelegCut]);

  const formGuardianDetailsUrl = useStateful("");

  const setFormGuardianDetailsUrl = formGuardianDetailsUrl.setValue;
  useEffect(() => {
    setFormGuardianDetailsUrl(currentGuardianDetailsUrl || "");
  }, [setFormGuardianDetailsUrl, currentGuardianDetailsUrl]);
  const errorGuardianDetailsUrl = !!errors.guardianDetailsUrl;
  const certifiedCommitteeExplanation = (
    <Typography
      component={"span"}
      variant={"caption"}
      dangerouslySetInnerHTML={{
        __html: guardianDataFormsTranslations(
          "fieldExplanation_certifiedCommittee",
          {
            certifiedCommitteeLink: renderToString(
              <ThemeProvider theme={baseTheme}>
                <InTextLink
                  text={domainTranslations("conceptName_certifiedCommittee")}
                  href={detailsRequirementsLink}
                />
              </ThemeProvider>
            ),
          }
        ),
      }}
    />
  );

  // TODO : O.L : Add tx progress indicator
  const submitGeneralData = useCallback(
    (formData: TFormData) => {
      const guardianRegistrationPayload: TGuardianRegistrationPayload = {
        ip: formData.ipAddress,
        orbsAddr: formData.nodeAddress,
        name: formData.name,
        website: formData.website,
      };
      submitInfo(guardianRegistrationPayload);
    },
    [submitInfo]
  );

  const submitDelegatorsShare = useCallback(
    (formData: TFormData) => {
      updateDelegatorsCut(parseFloat(formData.delegatorsCut));
    },
    [updateDelegatorsCut]
  );

  const submitGuardianDetailsUrl = useCallback(
    (formData: TFormData) => {
      updateGuardianDetailsUrl(formData.guardianDetailsUrl);
    },
    [updateGuardianDetailsUrl]
  );

  const submitFunction = useMemo<null | ((formData: TFormData) => void)>(() => {
    switch (formActivePart) {
      case EGuardianFormActivePart.None:
        return null;
      case EGuardianFormActivePart.GeneralInfo:
        return submitGeneralData;
      case EGuardianFormActivePart.DelegatorsShare:
        return submitDelegatorsShare;
      case EGuardianFormActivePart.GuardianDetailsUrl:
        return submitGuardianDetailsUrl;
      default:
        throw new Error(`Unsupported value of ${formActivePart}`);
    }
  }, [
    formActivePart,
    submitDelegatorsShare,
    submitGeneralData,
    submitGuardianDetailsUrl,
  ]);
  const hasSubmitFunction = submitFunction !== null;

  // TODO : FUTURE : This forms will not look good on mobile, fix the text overflow
  return (
    <form
      onSubmit={handleSubmit((formData) => submitGeneralData(formData))}
      className={classes.form}
      {...rest}
    >
      <Grid container direction={"column"}>
        {/* Row 1 */}
        <Grid item container direction={"row"} justify={"space-between"}>
          <Grid item sm={6} className={classes.inputGridItem}>
            <TextField
              disabled={disableGeneralInfoInputs}
              name={"name"}
              label={guardianDataFormsTranslations("fieldLabel_guardianName")}
              placeholder={guardianDataFormsTranslations(
                "fieldPlaceHolder_guardianName"
              )}
              title={guardianDataFormsTranslations(
                "fieldTooltipTitle_guardianName"
              )}
              value={name.value}
              onChange={(e) => name.setValue(e.target.value)}
              autoFocus
              required
              fullWidth
              InputLabelProps={{ style: { pointerEvents: "auto" } }}
              inputRef={register}
              className={classes.textField}
            />
          </Grid>

          <Grid item sm={6} className={classes.inputGridItem}>
            <TextField
              disabled={disableGeneralInfoInputs}
              name={"nodeAddress"}
              label={guardianDataFormsTranslations(
                "fieldLabel_nodeEthereumAddress"
              )}
              placeholder={guardianDataFormsTranslations(
                "fieldPlaceHolder_nodeEthereumAddress"
              )}
              title={guardianDataFormsTranslations(
                "fieldTooltipTitle_nodeEthereumAddress"
              )}
              value={nodeAddress.value}
              onChange={(e) => nodeAddress.setValue(e.target.value)}
              error={errorNodeAddress}
              helperText={
                errorNodeAddress &&
                guardianDataFormsTranslations(
                  "fieldErrorMessage_nodeEthereumAddress"
                )
              }
              required
              inputRef={register({ pattern: ETHEREUM_ADDRESS_REGEX })}
              fullWidth
              className={classes.textField}
            />
          </Grid>
        </Grid>
        {/* Row 2 */}
        <Grid item container direction={"row"} justify={"space-between"}>
          <Grid item sm={6} className={classes.inputGridItem}>
            <TextField
              disabled={disableGeneralInfoInputs}
              name={"website"}
              label={guardianDataFormsTranslations(
                "fieldLabel_guardianWebsite"
              )}
              placeholder={guardianDataFormsTranslations(
                "fieldPlaceHolder_guardianWebsite"
              )}
              title={guardianDataFormsTranslations(
                "fieldTooltipTitle_guardianWebsite"
              )}
              helperText={
                errorWebsite &&
                guardianDataFormsTranslations(
                  "fieldErrorMessage_guardianWebsite"
                )
              }
              value={website.value}
              onChange={(e) => website.setValue(e.target.value)}
              error={errorWebsite}
              inputRef={register({ validate: validURL })}
              fullWidth
              required
              className={classes.textField}
            />
          </Grid>
          <Grid item sm={6} className={classes.inputGridItem}>
            <TextField
              disabled={disableDelegatorsShareInputs}
              fullWidth
              name={"delegatorsCut"}
              title={guardianDataFormsTranslations(
                "fieldTooltipTitle_delegatorsShare"
              )}
              label={guardianDataFormsTranslations(
                "fieldLabel_delegatorsShare"
              )}
              value={delegatorsCut.value}
              inputProps={{
                step: 1,
              }}
              onChange={(e) => {
                delegatorsCut.setValue(parseFloat(e.target.value) || 0);
              }}
              required
              type={"number"}
              inputRef={register({
                max: delegatorsCutMaxValue,
              })}
              error={errorDelegatorsCut}
              // DEV_NOTE : O.L : I removed the non-error helper text after the ui overhaul
              helperText={
                errorDelegatorsCut
                  ? REWARDS_FREQUENCY_MESSAGE
                  : // : guardianDataFormsTranslations(
                    //     "fieldExplanation_delegatorsShare",
                    //     {
                    //       delegatorsCutMaxValue,
                    //     }
                    //   )
                    ""
              }
              InputProps={{
                startAdornment: "%",
              }}
              className={classes.textField}
              autoFocus
            />
          </Grid>
        </Grid>
        <Grid item container direction={"row"} justify={"space-between"}>
          <Grid item sm={6} className={classes.inputGridItem}>
            <TextField
              disabled={disableGeneralInfoInputs}
              fullWidth
              name={"ipAddress"}
              label={guardianDataFormsTranslations("fieldLabel_nodeIpAddress")}
              placeholder={guardianDataFormsTranslations(
                "fieldPlaceHolder_nodeIpAddress"
              )}
              title={guardianDataFormsTranslations(
                "fieldTooltipTitle_nodeIpAddress"
              )}
              value={ipAddress.value}
              onChange={(e) => ipAddress.setValue(e.target.value)}
              required
              inputRef={register({ pattern: IP_REGEX })}
              error={errorIPAddress}
              helperText={
                errorIPAddress &&
                guardianDataFormsTranslations("fieldErrorMessage_nodeIpAddress")
              }
              className={classes.textField}
            />
          </Grid>
          <Grid item sm={6} className={classes.inputGridItem}>
            <TextField
              disabled={disableGuardianDetailsUrlInputs}
              fullWidth
              name={"guardianDetailsUrl"}
              title={guardianDataFormsTranslations(
                "fieldLabel_certifiedCommitteeUrl"
              )}
              label={guardianDataFormsTranslations(
                "fieldTooltipTitle_certifiedCommitteeUrl"
              )}
              value={formGuardianDetailsUrl.value}
              onChange={(e) => {
                formGuardianDetailsUrl.setValue(e.target.value || "");
              }}
              required
              inputRef={register({ validate: validURL })}
              error={errorGuardianDetailsUrl}
              // DEV_NOTE : O.L : I removed the non-error helper text after the ui overhaul
              helperText={
                errorGuardianDetailsUrl
                  ? guardianDataFormsTranslations(
                      "fieldErrorMessage_certifiedCommittee"
                    )
                  : // : certifiedCommitteeExplanation
                    ""
              }
              className={classes.textField}
              autoFocus
            />
          </Grid>
        </Grid>
      </Grid>

      <br />
      <br />
      {hasSubmitFunction && (
        <>
          <ActionButton type={"submit"} disabled={disableSubmit}>
            {actionButtonTitle}
          </ActionButton>
          <br />
          <br />
        </>
      )}

      {messageForSubmitButton && (
        <Typography
          variant={"body2"}
          color={"error"}
          style={{ width: "fit-content" }}
        >
          {messageForSubmitButton}
        </Typography>
      )}
    </form>
  );
});