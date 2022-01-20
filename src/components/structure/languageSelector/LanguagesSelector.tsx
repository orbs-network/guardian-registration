/**
 * Copyright 2019 the orbs-ethereum-contracts authors
 * This file is part of the orbs-ethereum-contracts library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */
import React, { CSSProperties } from "react";
import { ChangeLangLink } from "./ChangeLangLink";
import { ReactComponent as UsCountryIconSvg } from "./countryIcons/us.svg";
import { ReactComponent as JpCountryIconSvg } from "./countryIcons/jp.svg";
import { ReactComponent as KrCountryIconSvg } from "./countryIcons/kr.svg";
import Grid from "@material-ui/core/Grid";
import { Theme } from "@material-ui/core";
import { useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  langIcon: {
    height: "1.25em",
  },
}));

export const LanguagesSelector = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Grid container alignItems={"center"} justify={"flex-end"} spacing={1}>
      <Grid item>
        <ChangeLangLink lang="en" location={location}>
          <UsCountryIconSvg className={classes.langIcon} />
        </ChangeLangLink>
      </Grid>
      <Grid item>
        <ChangeLangLink lang="jp" location={location}>
          <JpCountryIconSvg className={classes.langIcon} />
        </ChangeLangLink>
      </Grid>
      <Grid item>
        <ChangeLangLink lang="ko" location={location}>
          <KrCountryIconSvg className={classes.langIcon} />
        </ChangeLangLink>
      </Grid>
    </Grid>
  );
}
