import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HEADER_HEIGHT_REM } from "../../theme/Theme";
import { useHeaderTranslations } from "../../translations/translationsHooks";
import { LanguagesSelector } from "./languageSelector/LanguagesSelector";

interface IProps {}

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${HEADER_HEIGHT_REM}rem`,
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default,
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    marginTop: "1em",
    marginBottom: "1em",
  },
  languageBar: {},
}));

export const Header = React.memo<IProps>((props) => {
  const classes = useStyles();
  const headerTranslations = useHeaderTranslations();

  return (
    <AppBar className={classes.appBar} position={"fixed"}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h5">
            {headerTranslations("title_appName")}
          </Typography>
        </div>
        <div className={classes.languageBar}>
          <LanguagesSelector />
        </div>
      </Toolbar>
    </AppBar>
  );
});
