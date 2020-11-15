import { IAppTranslations } from "./translationsTypes";

import commonsTranslationsJson from "./locales/en/commons.json";
import headerTranslationsJson from "./locales/en/header.json";
import accountConnectionSectionTranslationsJson from "./locales/en/accountConnectionSection.json";

export const ENGLISH_TEXTS: IAppTranslations = {
  commons: commonsTranslationsJson,
  accountConnectionSection: accountConnectionSectionTranslationsJson,
  header: headerTranslationsJson,
};
