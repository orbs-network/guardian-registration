import React from "react";
import { Page } from "../../components/structure/Page";
import { ContentFitting } from "../../components/structure/ContentFitting";
import { Typography } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {}

export const LoadingPage = React.memo<IProps>((props) => {
  return (
    <Page>
      <ContentFitting>
       <CircularProgress disableShrink style ={{color:'white', width:60, height:60, marginTop:100}} />
      </ContentFitting>
    </Page>
  );
});
