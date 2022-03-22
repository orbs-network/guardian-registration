import React, { useMemo } from "react";
import { DetailsListContainer } from "../components/detailsList/DetailsListContainer";
import {
  DetailsList,
  TInnerHtmlFunction,
} from "../components/detailsList/Detailslist";
import { BoldText } from "../components/texts/boldText";
import {
  useExplanationTextsTranslations,
  useRegisterGuardianSectionTranslations,
} from "../translations/translationsHooks";
import { renderToString } from "react-dom/server";
import useTheme from "@material-ui/core/styles/useTheme";
import { useNetwork } from "../hooks/useWeb3";
import { config } from "process";
import configs from "../configs";

interface IProps {}

export const GuardianFormDetailsList = React.memo<IProps>((props) => {
  const guardianAddressExplainingTexts = useGuardiansAddressDetailsTexts();
  const nodeAddressExplainingTexts = useNodeAddressDetailsTexts();
  const registerGuardianSectionTranslations =
    useRegisterGuardianSectionTranslations();

  return (
    <DetailsListContainer>
      <BoldText>
        {registerGuardianSectionTranslations("text_pleaseNote")}:
      </BoldText>
      <DetailsList
        conceptName={guardianAddressExplainingTexts.conceptName}
        details={guardianAddressExplainingTexts.texts}
      />
      <DetailsList
        conceptName={nodeAddressExplainingTexts.conceptName}
        details={nodeAddressExplainingTexts.texts}
      />
    </DetailsListContainer>
  );
});

// TODO : O.L : Move these hooks to a more suitable locations.

export const useGuardiansAddressDetailsTexts = () => {
  const explanationTextsTranslations = useExplanationTextsTranslations();

  const guardianAddressExplainingTexts = [
    explanationTextsTranslations(
      "text_guardianAddress_representsInGuardiansList"
    ),
    explanationTextsTranslations(
      "text_guardianAddress_usedByDelegatorsToDelegate"
    ),
    explanationTextsTranslations("text_guardianAddress_holdsSelfStake"),
    explanationTextsTranslations(
      "text_guardianAddress_receivesGuardianRewards"
    ),
  ];

  return {
    texts: guardianAddressExplainingTexts,
    conceptName: explanationTextsTranslations("conceptName_guardianAddress"),
  };
};

export const useNodeAddressDetailsTexts = () => {
  const theme = useTheme();
  const explanationTextsTranslations = useExplanationTextsTranslations();

  const explainingTextOfShouldBeDifferentInnerHtml =
    useMemo<TInnerHtmlFunction>(() => {
      return () =>
        explanationTextsTranslations(
          "text_nodeAddress_shouldBeDifferentFromGuardianAddress",
          {
            conceptNameGuardianAddress: renderToString(
              <span
                style={{
                  color: theme.palette.secondary.main,
                  fontWeight: "bold",
                }}
              >
                {explanationTextsTranslations("conceptName_guardianAddress")}
              </span>
            ),
          }
        );
    }, [explanationTextsTranslations, theme.palette.secondary.main]);
  const chain = useNetwork();
  const symbol = chain &&
  configs.networks[chain] &&
  chain &&
  configs.networks[chain].nativeCurrency?.symbol
  const nodeAddressExplainingTexts = useMemo<
    Array<string | TInnerHtmlFunction>
  >(() => {
    const texts = [
      explainingTextOfShouldBeDifferentInnerHtml,
      explanationTextsTranslations("text_nodeAddress_usedToSignBlocks"),
      explanationTextsTranslations(
        "text_nodeAddress_holdsEthForAutomatedTransactionsGas",
        { symbol}
      ),
      explanationTextsTranslations("text_nodeAddress_minimalBalanceRequired", {
        symbol
      }),
      explanationTextsTranslations("text_nodeAddress_doesNotHoldYourTokens"),
    ];

    return texts;
  }, [explainingTextOfShouldBeDifferentInnerHtml, explanationTextsTranslations, symbol]);

  return {
    texts: nodeAddressExplainingTexts,
    conceptName: explanationTextsTranslations("conceptName_nodeAddress"),
  };
};
