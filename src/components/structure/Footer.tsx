import React from "react";
import {
  AppBar,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { InTextLink } from "../InTextLink";

interface IProps {
  version?: string;
}

const useStyles = makeStyles((theme) => ({
  bottomAppBar: {
    // paddingTop: "1em",
    // paddingBottom: "1em",
    // borderTop: "2px solid #363636",
    height: "3em",
    bottom: 0,
    top: "auto",

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
    <Slide appear={false} direction="down" in={!trigger}>
      {children as any}
    </Slide>
  );
});

// DEV_NOTE : O.L : All of the centering (for the links) and margin (for the app version)
//                  was done in a hacky manner, should fix it in the future.
export const Footer = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { version } = props;
  console.log("Footer Render");
  return (
    <>
      {/*<Toolbar style={{}} />*/}
      <HideOnScroll>
        <AppBar className={classes.bottomAppBar} position="absolute">
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
                text={"Term of use"}
                style={{ paddingInlineEnd: "1em", justifySelf: "center" }}
              />
              <InTextLink text={"Privacy Policy"} />
            </div>

            <Typography className={classes.appVersion} variant={"caption"}>
              version {version}
            </Typography>
            <div style={{}}></div>
          </div>
        </AppBar>
      </HideOnScroll>
    </>
  );
});
