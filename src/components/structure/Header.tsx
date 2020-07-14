import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    marginTop: "1em",
    marginBottom: "1em",
  },
}));

export const Header = React.memo<IProps>((props) => {
  const classes = useStyles();
  return (
    <AppBar position={"absolute"}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h5">ORBS Guardians Portal</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
});
