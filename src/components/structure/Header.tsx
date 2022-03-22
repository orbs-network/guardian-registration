import { useContext } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HEADER_HEIGHT_REM } from "../../theme/Theme";
import { useHeaderTranslations } from "../../translations/translationsHooks";
import { LanguagesSelector } from "./languageSelector/LanguagesSelector";
import NetworkIndicator from "../NetworkIndicator";
import { MobXProviderContext } from "mobx-react";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${HEADER_HEIGHT_REM}rem`,
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    boxSizing: "border-box",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    marginTop: "1em",
    marginBottom: "1em",
  },
  languageBar: {
    position: "relative",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const headerTranslations = useHeaderTranslations();
  const { chainId } = useContext(MobXProviderContext);

  return (
    <AppBar className={classes.appBar} position={"fixed"}>
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="h5">
            {headerTranslations("title_appName")}
          </Typography>
        </div>
        <div className={classes.languageBar}>
          <NetworkIndicator chainId={chainId} />
          <LanguagesSelector />
        </div>
      </Toolbar>
    </AppBar>
  );
};
