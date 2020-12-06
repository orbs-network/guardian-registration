import { useCallback } from "react";
import { TOptions } from "i18next";
import { useTranslation } from "react-i18next";
import {
  IAccountConnectionSectionTranslations,
  IAppTranslations,
  ICommonsTranslations,
  IDelegatingToAnotherAccountSectionTranslations,
  IDomainTranslations,
  IExplanationTexts,
  IGuardianDataFormsTranslations,
  IGuardianEditPageTranslations,
  IHeaderTranslations,
  IModalsTranslations,
  INoEthereumProviderSectionTranslations,
  IRegisterGuardianSectionTranslations,
} from "./translationsTypes";

function useSpecificTypeSafeTFunction<T>(prefix: keyof IAppTranslations) {
  const { t } = useTranslation();

  const tFunction = useCallback(
    (key: keyof T, options?: TOptions) => {
      return t(`${prefix}.${key}`, options);
      let a = prefix;
      let b = t;
      return "GOGOGOGO";
    },
    [prefix, t]
  );

  return tFunction;
}

export function useAccountConnectionSectionTranslations() {
  return useSpecificTypeSafeTFunction<IAccountConnectionSectionTranslations>(
    "accountConnectionSection"
  );
}

export function useNoEthereumProviderSectionTranslations() {
  return useSpecificTypeSafeTFunction<INoEthereumProviderSectionTranslations>(
    "noEthereumProviderSection"
  );
}

export function useHeaderTranslations() {
  return useSpecificTypeSafeTFunction<IHeaderTranslations>("header");
}

export function useCommonsTranslations() {
  return useSpecificTypeSafeTFunction<ICommonsTranslations>("commons");
}

export function useDomainTranslations() {
  return useSpecificTypeSafeTFunction<IDomainTranslations>("domain");
}

export function useModalsTranslations() {
  return useSpecificTypeSafeTFunction<IModalsTranslations>("modals");
}

export function useExplanationTextsTranslations() {
  return useSpecificTypeSafeTFunction<IExplanationTexts>("explanationsTexts");
}

export function useRegisterGuardianSectionTranslations() {
  return useSpecificTypeSafeTFunction<IRegisterGuardianSectionTranslations>(
    "registerGuardianSection"
  );
}

export function useDelegatingToAnotherSectionTranslations() {
  return useSpecificTypeSafeTFunction<
    IDelegatingToAnotherAccountSectionTranslations
  >("delegatingToAnotherAccountSection");
}

export function useGuardianDataFormsTranslations() {
  return useSpecificTypeSafeTFunction<IGuardianDataFormsTranslations>(
    "guardianDataForms"
  );
}

export function useGuardianEditPageTranslations() {
  return useSpecificTypeSafeTFunction<IGuardianEditPageTranslations>(
    "guardianEditPage"
  );
}
