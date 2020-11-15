import { useCallback } from "react";
import { TOptions } from "i18next";
import { useTranslation } from "react-i18next";
import {
  IAccountConnectionSectionTranslations,
  IAppTranslations,
  ICommonsTranslations,
  IHeaderTranslations,
} from "./translationsTypes";

function useSpecificTypeSafeTFunction<T>(prefix: keyof IAppTranslations) {
  const { t } = useTranslation();

  const tFunction = useCallback(
    (key: keyof T, options?: TOptions) => {
      return t(`${prefix}.${key}`, options);
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

export function useHeaderTranslations() {
  return useSpecificTypeSafeTFunction<IHeaderTranslations>("header");
}

export function useCommonsTranslations() {
  return useSpecificTypeSafeTFunction<ICommonsTranslations>("commons");
}
