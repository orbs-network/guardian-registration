import { IAppTranslations } from "./translationsTypes";

import commonsTranslationsJson from "./locales/en/commons.json";
import domainTranslationsJson from "./locales/en/domain.json";
import headerTranslationsJson from "./locales/en/header.json";
import explanationTextsJson from "./locales/en/explanationsTexts.json";
import accountConnectionSectionTranslationsJson from "./locales/en/accountConnectionSection.json";
import registerGuardianSectionTranslationsJson from "./locales/en/registerGuardianSection.json";
import delegatingToAnotherSectionTranslationsJson from "./locales/en/delegatingToAnotherAccountSection.json";
import guardianDataFormsTranslationsJson from "./locales/en/gaurdianDataForms.json";
import guardianEditPageTranslationsJson from "./locales/en/guardianEditPage.json";
import noEthereumProviderSectionTranslationsJson from "./locales/en/noEthereumProviderSection.json";
import modalsJson from "./locales/en/modals.json";

export const ENGLISH_TEXTS: IAppTranslations = {
  noEthereumProviderSection: noEthereumProviderSectionTranslationsJson,
  commons: commonsTranslationsJson,
  domain: domainTranslationsJson,
  modals: modalsJson,
  accountConnectionSection: accountConnectionSectionTranslationsJson,
  explanationsTexts: explanationTextsJson,
  header: headerTranslationsJson,
  registerGuardianSection: registerGuardianSectionTranslationsJson,
  delegatingToAnotherAccountSection: delegatingToAnotherSectionTranslationsJson,
  guardianDataForms: guardianDataFormsTranslationsJson,
  guardianEditPage: guardianEditPageTranslationsJson,
};
