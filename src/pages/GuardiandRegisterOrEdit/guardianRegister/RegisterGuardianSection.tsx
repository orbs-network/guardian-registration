import React, { useCallback, useContext, useState, useRef } from "react";
import { GuardiansDetailsForm } from "../forms/GuradiansDetailsForm";
import { TGuardianInfo } from "../../../store/OrbsAccountStore";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { GuardianFormDetailsList } from "../../GuardianFormDetailsList";
import {
  ICryptoWalletConnectionService,
  TGuardianRegistrationPayload,
} from "@orbs-network/contracts-js";
import {
  useDomainTranslations,
  useGuardianDataFormsTranslations,
  useRegisterGuardianSectionTranslations,
} from "../../../translations/translationsHooks";
import { renderToString } from "react-dom/server";
import { MobXProviderContext } from "mobx-react";
import { getChainName, getChainNames } from "../../../utils/chain";
import { ActionConfirmationModal } from "../../../components/shared/modals/ActionConfirmationModal";
import { useOrbsAccountStore } from "../../../store/storeHooks";

interface IProps {
  guardianAddress: string;
  registerGuardian: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
  cryptoWalletConnectionService: ICryptoWalletConnectionService;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
  boldText: {
    fontWeight: "bold",
    display: "contents",
  },
}));

const demoInitialInfo: TGuardianInfo = {
  orbsAddr: "0xe30a30069209aa4e7e7b07ab391966a0f071afd9",
  ip: "12.114.252.82",
  // contact: "A's contact info",
  website: "a.com",
  name: "A",
};
const emptyInitialInfo: TGuardianInfo = {
  orbsAddr: "",
  ip: "",
  // contact: "",
  website: "",
  name: "",
};

const MINIMAL_REQUIRED_ETH_BALANCE = 1;

export const RegisterGuardianSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { guardianAddress, registerGuardian, cryptoWalletConnectionService } =
    props;

  const guardianDataFormsTranslations = useGuardianDataFormsTranslations();
  const domainTranslations = useDomainTranslations();
  const registerGuardianSectionTranslations =
    useRegisterGuardianSectionTranslations();
  const { chainId } = useContext(MobXProviderContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  /**
   * We will use this function to perform validations just before calling 'register'
   */

  const orbsAccountStore = useOrbsAccountStore();

  const checkBalanceBeforeRegistration = useCallback(
    async (guardianRegistrationPayload: TGuardianRegistrationPayload) => {
      if (
        guardianRegistrationPayload.orbsAddr.toLowerCase() ===
        guardianAddress.toLowerCase()
      ) {
        setErrorMessage(
          registerGuardianSectionTranslations(
            "error_nodeAddressCannotBeTheSameAsGuardianAddress",
            { guardianAddress }
          )
        );
        return;
      }

      const orbsNodeBalance =
        await cryptoWalletConnectionService.readEthereumBalance(
          guardianRegistrationPayload.orbsAddr
        );

      if (orbsNodeBalance < MINIMAL_REQUIRED_ETH_BALANCE) {
        setErrorMessage(
          registerGuardianSectionTranslations(
            "error_minimalBalanceAtNodeAddressIsRequired",
            { name: getChainName(chainId) }
          )
        );
        return;
      }

      // All tests passes, remove old error message if exists
      setErrorMessage("");
      if (orbsAccountStore.unregisteredChains.length > 1) {
        regsiterDataRef.current = guardianRegistrationPayload;
        setShowRegisterPoup(true);
      } else {
        registerGuardian(guardianRegistrationPayload);
      }
    },
    [
      cryptoWalletConnectionService,
      guardianAddress,
      registerGuardianSectionTranslations,
      chainId,
      orbsAccountStore.unregisteredChains.length,
      registerGuardian,
    ]
  );

  const yourGuardianAddressTextInnerHtml = registerGuardianSectionTranslations(
    "title_yourGuardianAddressIs",
    {
      conceptGuardianName: renderToString(
        <span className={classes.boldText}>
          {domainTranslations("conceptName_guardianName")}
        </span>
      ),
    }
  );

  const [showRegisterPoup, setShowRegisterPoup] = useState(false);
  const regsiterDataRef = useRef<TGuardianRegistrationPayload>(
    {} as TGuardianRegistrationPayload
  );

  const onrRgisterAccept = () => {
    registerGuardian(regsiterDataRef.current);
    setShowRegisterPoup(false);
  };
  const names = getChainNames(orbsAccountStore.unregisteredChains);
  return (
    <div
      id={"RegisterGuardianSection"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        //  DEV_NOTE : 'min-content' will allow us to limit width to the width of the address text (it has max-content width)
        //            removing it will allow us to display elements wider than the address.
        // If removed, add 'maxWidth'
        width: "min-content",
        maxWidth: "100%",
      }}
    >
      <ActionConfirmationModal
        title={
          <>
            {`${registerGuardianSectionTranslations(
              "You_need_to_register_on_both",
              { network1: names[0], network2: names[1] }
            )}`}
            .
            <br />
            {registerGuardianSectionTranslations(
              "this_transaction_will_register_you_on",
              { network: getChainName(chainId) }
            )}
            .
          </>
        }
        contentText=""
        instructionText=""
        open={showRegisterPoup}
        acceptText={registerGuardianSectionTranslations('proceed')}
        onAccept={onrRgisterAccept}
        onCancel={() => setShowRegisterPoup(false)}
      />
      <Avatar className={classes.avatar}>
        <PersonIcon />
      </Avatar>
      <div
        style={{
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant={"h5"}>
          {registerGuardianSectionTranslations("title_guardianRegistration")}
        </Typography>
        <Typography
          variant={"h6"}
          dangerouslySetInnerHTML={{ __html: yourGuardianAddressTextInnerHtml }}
        />
        <Typography
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {guardianAddress}
        </Typography>
      </div>

      <GuardianFormDetailsList />

      <GuardiansDetailsForm
        submitInfo={checkBalanceBeforeRegistration}
        guardianInitialInfo={emptyInitialInfo}
        actionButtonTitle={guardianDataFormsTranslations("action_register")}
        messageForSubmitButton={errorMessage}
      />
    </div>
  );
});
