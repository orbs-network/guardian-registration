import React, { useMemo } from "react";
import { TGuardianRegistrationPayload } from "../../services/guardiansV2Service/IGuardiansV2Service";
import { GuardiansDetailsForm } from "./forms/GuradiansDetailsForm";
import { TGuardianInfo } from "../../store/OrbsAccountStore";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";

interface IProps {
  guardianAddress: string;
  registerGuardian: (
    guardianRegistrationPayload: TGuardianRegistrationPayload
  ) => void;
  // DEV_NOTE : This prop might be better placed elsewhere, for now it works
  ethereumBalance: number;
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
  const { guardianAddress, registerGuardian, ethereumBalance } = props;

  const { shouldDisable, messageToExplainDisable } = useMemo(() => {
    let shouldDisable: boolean = false;
    let messageToExplainDisable: string | undefined = undefined;

    if (ethereumBalance < MINIMAL_REQUIRED_ETH_BALANCE) {
      shouldDisable = true;
      messageToExplainDisable =
        "A minimal balance of 1 Ether is required in order to register as a guardian";
    }

    return {
      shouldDisable,
      messageToExplainDisable,
    };
  }, [ethereumBalance]);

  return (
    <>
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
        submitInfo={registerGuardian}
        guardianInitialInfo={emptyInitialInfo}
        actionButtonTitle={"Register"}
        disableSubmit={shouldDisable}
        messageForDisabledSubmit={messageToExplainDisable}
      />
    </>
  );
});
