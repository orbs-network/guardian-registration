import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoneyIcon from "@material-ui/icons/Money";
import { DelegatorsShareForm } from "../../forms/DelegatorsShareForm";

interface IProps {
  delegatorsCut?: number;
  updateDelegatorsCut: (delegatorsCut: number) => void;
  isUsingDefaultValue?: boolean;

  // Configs
  delegatorsCutMaxValue: number;
  delegatorsCutDefaultValue: number;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const EditDelegatorsShareSection = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    delegatorsCut,
    updateDelegatorsCut,
    isUsingDefaultValue,
    delegatorsCutMaxValue,
    delegatorsCutDefaultValue,
  } = props;
  return (
    <>
      <Avatar className={classes.avatar}>
        <MoneyIcon />
      </Avatar>
      <Typography variant={"h5"}>Delegators cut</Typography>
      <DelegatorsShareForm
        updateDelegatorsCut={updateDelegatorsCut}
        currentDelegatorsCut={delegatorsCut}
        isUsingDefaultValue={isUsingDefaultValue}
        delegatorsCutDefaultValue={delegatorsCutDefaultValue}
        delegatorsCutMaxValue={delegatorsCutMaxValue}
      />
    </>
  );
});
