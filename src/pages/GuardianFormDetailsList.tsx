import React from "react";
import { DetailsListContainer } from "../components/detailsList/DetailsListContainer";
import { DetailsList } from "../components/detailsList/Detailslist";
import {
  GUARDIAN_ADDRESS_DETAILS_TEXTS,
  NODE_ADDRESS_DETAILS_TEXTS,
} from "../constants/explainingTexts";

interface IProps {}

export const GuardianFormDetailsList = React.memo<IProps>((props) => {
  return (
    <DetailsListContainer>
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
