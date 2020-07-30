import React from "react";
import { DetailsListContainer } from "../components/detailsList/DetailsListContainer";
import { DetailsList } from "../components/detailsList/Detailslist";
import {
  GUARDIAN_ADDRESS_DETAILS_TEXTS,
  NODE_ADDRESS_DETAILS_TEXTS,
} from "../constants/explainingTexts";
import { Typography } from "@material-ui/core";
import { BoldText } from "../components/texts/boldText";

interface IProps {}

export const GuardianFormDetailsList = React.memo<IProps>((props) => {
  return (
    <DetailsListContainer>
      <BoldText>Please Notice:</BoldText>
      <DetailsList
        conceptName={"Guardian Address"}
        details={GUARDIAN_ADDRESS_DETAILS_TEXTS}
      />
      <DetailsList
        conceptName={"Node Address"}
        details={NODE_ADDRESS_DETAILS_TEXTS}
      />
    </DetailsListContainer>
  );
});
