import React, { useCallback, useMemo, useState } from "react";
import { TGuardianRegistrationPayload } from "../../services/guardiansV2Service/IGuardiansV2Service";
import { GuardiansDetailsForm } from "./forms/GuradiansDetailsForm";
import { TGuardianInfo } from "../../store/OrbsAccountStore";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { ICryptoWalletConnectionService } from "../../services/cryptoWalletConnectionService/ICryptoWalletConnectionService";

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
  const {
    guardianAddress,
    registerGuardian,
    cryptoWalletConnectionService,
  } = props;

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // const { shouldDisable, messageToExplainDisable } = useMemo(() => {
  //   let shouldDisable: boolean = false;
  //   let messageToExplainDisable: string | undefined = undefined;
  //
  //   if (ethereumBalance < MINIMAL_REQUIRED_ETH_BALANCE) {
  //     shouldDisable = true;
  //     messageToExplainDisable =
  //       "A minimal balance of 1 Ether is required in order to register as a guardian";
  //   }
  //
  //   return {
  //     shouldDisable,
  //     messageToExplainDisable,
  //   };
  // }, [ethereumBalance]);

  const checkBalanceBeforeRegistration = useCallback(
    async (guardianRegistrationPayload: TGuardianRegistrationPayload) => {
      const orbsNodeBalance = await cryptoWalletConnectionService.readEthereumBalance(
        guardianRegistrationPayload.orbsAddr
      );

      if (orbsNodeBalance >= MINIMAL_REQUIRED_ETH_BALANCE) {
        registerGuardian(guardianRegistrationPayload);
      } else {
        setErrorMessage(
          `A minimal balance of 1 Ether at the 'Node Address' is required in order to register as a guardian`
        );
      }
    },
    [cryptoWalletConnectionService]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Avatar className={classes.avatar}>
        <PersonIcon />
      </Avatar>
      <div
        style={{
          maxWidth: "100%",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Typography variant={"h5"}>Guardian Registration</Typography>
        <Typography
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {guardianAddress}
        </Typography>
      </div>
      <GuardiansDetailsForm
        guardianAddress={guardianAddress}
        submitInfo={checkBalanceBeforeRegistration}
        guardianInitialInfo={demoInitialInfo}
        actionButtonTitle={"Register"}
        messageForSubmitButton={errorMessage}
      />
    </div>
  );
});
