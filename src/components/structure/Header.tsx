import { useContext, useMemo } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HEADER_HEIGHT_REM } from "../../theme/Theme";
import { useHeaderTranslations } from "../../translations/translationsHooks";
import { LanguagesSelector } from "./languageSelector/LanguagesSelector";
import NetworkIndicator from "../NetworkIndicator";
import { MobXProviderContext } from "mobx-react";
import configs from "../../configs";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: `${HEADER_HEIGHT_REM}rem`,
    boxSizing: "border-box",
  },
  toolBar: {
    height: "100%",
    position: "relative",
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
  networkBg: {
    overflow: "hidden",
    height: "100%",
    width:'100%',
    position: "absolute",
    top:0,
    right: 0,
    "& img": {
      transform: "translate(0, -50%) scale(1)",
      position: "absolute",
      right: "0",
      top: "50%",
    },
  },
}));

const getNavImage = (chainId?: number) => {
  const network = chainId && configs.networks[chainId];
  if (!network) {
    return;
  }
  return network.nav;
};

export const Header = () => {
  const classes = useStyles();
  const theme = useTheme()
  const headerTranslations = useHeaderTranslations();
  const { chainId } = useContext(MobXProviderContext);
  const navImage = useMemo(() => getNavImage(chainId), [chainId]);

  return (
    <AppBar className={classes.appBar} position={"fixed"}>
      <Toolbar className={classes.toolBar}>
        {navImage && (
          <div className={classes.networkBg}>
            <img alt='' src={navImage} />
          </div>
        )}
        <div className={classes.title}>
          <Typography style={{color: theme.palette.text.primary }} variant="h5">
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
