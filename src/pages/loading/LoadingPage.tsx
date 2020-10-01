import React from "react";
import { Page } from "../../components/structure/Page";
import { ContentFitting } from "../../components/structure/ContentFitting";
import { Typography } from "@material-ui/core";

interface IProps {}

export const LoadingPage = React.memo<IProps>((props) => {
  return (
    <Page>
      <ContentFitting>
        <Typography>Loading...</Typography>
      </ContentFitting>
    </Page>
  );
});
