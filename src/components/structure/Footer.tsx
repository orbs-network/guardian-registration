import React from "react";
import {
  AppBar,
  Button,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { InTextLink } from "../InTextLink";
import configs from "../../configs";
import Color from "color";
import { useCommonsTranslations } from "../../translations/translationsHooks";

interface IProps {
  version?: string;
}

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    // opacity: "0.5",
  },
  bottomAppBar: {
    // paddingTop: "1em",
    // paddingBottom: "1em",
    // borderTop: "2px solid #363636",
    height: "3em",
    bottom: 0,
    top: "auto",
    backgroundColor: Color(theme.palette.primary.main).fade(0.3).toString(),

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: "1em",
    paddingLeft: "1em",
  },

  appVersion: {
    marginLeft: "auto",
  },
}));

const HideOnScroll = React.memo((props) => {
  const { children } = props;

  const trigger = useScrollTrigger();

  console.log(trigger);

  return (
    <Slide appear={false} direction="up" in={trigger}>
      {children as any}
    </Slide>
  );
});

// DEV_NOTE : O.L : All of the centering (for the links) and margin (for the app version)
//                  was done in a hacky manner, should fix it in the future.
export const Footer = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { version } = props;

  const commonsTranslations = useCommonsTranslations();

  return (
    <div className={classes.footerContainer}>
      {/* TODO : This 'Toolbar' is here to keep space between content and footer, should make a better solution */}
      <Toolbar />
      {/*<HideOnScroll>*/}
      <AppBar className={classes.bottomAppBar} position={"fixed"}>
        {/*<Toolbar>*/}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              position: "absolute",
            }}
          >
            <InTextLink
              text={commonsTranslations("termsOfUse")}
              href={configs.termsOfUseUrl}
              style={{ paddingInlineEnd: "1em", justifySelf: "center" }}
            />
            <InTextLink
              href={configs.privacyPolicyUrl}
              text={commonsTranslations("privacyPolicy")}
            />
          </div>

          <div className={classes.appVersion}>
            <Typography variant={"caption"}>
              {commonsTranslations("version", { versionNumber: version })}
            </Typography>
          </div>
        </div>
      </AppBar>
      {/*</HideOnScroll>*/}
    </div>
  );
});
