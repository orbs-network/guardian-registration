import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyItems: "center",
    justifyContent: "center",
  },
}));

/**
 * DEV_NOTE : O.L : Maybe find a better name for this component.
 * It is used to display 'DetailsList' in a fluid manner.
 */
export const DetailsListContainer = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { children } = props;

  return <div className={classes.container}>{children}</div>;
});
