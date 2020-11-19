export interface IAppTranslations {
  commons: ICommonsTranslations;
  header: IHeaderTranslations;
  explanationsTexts: IExplanationTexts;
  accountConnectionSection: IAccountConnectionSectionTranslations;
  registerGuardianSection: IRegisterGuardianSection;
  delegatingToAnotherAccountSection: IDelegatingToAnotherAccountSection;
}

export interface ICommonsTranslations {
  loading: string;
  loadingFailed: string;

  termsOfUse: string;
  privacyPolicy: string;

  version: string;
  concept_guardianName: string;
}

export interface IAccountConnectionSectionTranslations {}

export interface IHeaderTranslations {
  title_appName: string;
}

export interface IExplanationTexts {
  conceptName_guardianAddress: string;
  conceptName_nodeAddress: string;
  text_guardianAddress_representsInGuardiansList: string;
  text_guardianAddress_usedByDelegatorsToDelegate: string;
  text_guardianAddress_holdsSelfStake: string;
  text_guardianAddress_receivesGuardianRewards: string;
  text_nodeAddress_shouldBeDifferentFromGuardianAddress: string;
  text_nodeAddress_usedToSignBlocks: string;
  text_nodeAddress_holdsEthForAutomatedTransactionsGas: string;
  text_nodeAddress_minimalBalanceRequired: string;
  text_nodeAddress_doesNotHoldYourTokens: string;
}

export interface IRegisterGuardianSection {
  error_nodeAddressCannotBeTheSameAsGuardianAddress: string;
  error_minimalBalanceAtNodeAddressIsRequired: string;
  title_guardianRegistration: string;
  title_yourGuardianAddressIs: string;
  text_pleaseNote: string;
}

export interface IDelegatingToAnotherAccountSection {
  text_pleaseNote: string;
  text_connectedWithAddress: string;
  text_thisAddressIsCurrentlyDelegatingTo: string;
  explanation_previousDelegationsNeedsToBeCanceled: string;
  action_unDelegate: string;
}
