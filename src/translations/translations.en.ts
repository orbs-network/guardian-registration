import { IAppTranslations } from "./translationsTypes";

import commonsTranslationsJson from "./locales/en/commons.json";
import headerTranslationsJson from "./locales/en/header.json";
import explanationTextsJson from "./locales/en/explanationsTexts.json";
import accountConnectionSectionTranslationsJson from "./locales/en/accountConnectionSection.json";
import registerGuardianSectionTranslationsJson from "./locales/en/registerGuardianSection.json";
import delegatingToAnotherSectionTranslationsJson from "./locales/en/delegatingToAnotherAccountSection.json";

export const ENGLISH_TEXTS: IAppTranslations = {
  commons: commonsTranslationsJson,
  accountConnectionSection: accountConnectionSectionTranslationsJson,
  explanationsTexts: explanationTextsJson,
  header: headerTranslationsJson,
  registerGuardianSection: registerGuardianSectionTranslationsJson,
  delegatingToAnotherAccountSection: delegatingToAnotherSectionTranslationsJson,
};
