import { useCallback } from "react";
import { TOptions } from "i18next";
import { useTranslation } from "react-i18next";
import { IAppTranslations } from "./translationsTypes";

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
