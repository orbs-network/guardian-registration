export interface IAppTranslations {
  commons: ICommonsTranslations;
  domain: IDomainTranslations;
  header: IHeaderTranslations;
  explanationsTexts: IExplanationTexts;
  accountConnectionSection: IAccountConnectionSectionTranslations;
  registerGuardianSection: IRegisterGuardianSection;
  delegatingToAnotherAccountSection: IDelegatingToAnotherAccountSection;
  guardianDataForms: IGuardianDataForms;
}

export interface ICommonsTranslations {
  loading: string;
  loadingFailed: string;

  termsOfUse: string;
  privacyPolicy: string;

  version: string;
}

export interface IDomainTranslations {
  conceptName_guardianName: string;
  conceptName_delegatorsShare: string;
  conceptExplanation_delegatorsShare: string;
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
  action_register: string;
}

export interface IDelegatingToAnotherAccountSection {
  text_pleaseNote: string;
  text_connectedWithAddress: string;
  text_thisAddressIsCurrentlyDelegatingTo: string;
  explanation_previousDelegationsNeedsToBeCanceled: string;
  action_unDelegate: string;
}

export interface IGuardianDataForms {
  fieldLabel_guardianName: string;
  fieldLabel_guardianWebsite: string;
  fieldLabel_nodeIpAddress: string;
  fieldLabel_nodeEthereumAddress: string;
  fieldLabel_delegatorsShare: string;
  fieldTooltipTitle_guardianName: string;
  fieldTooltipTitle_guardianWebsite: string;
  fieldTooltipTitle_nodeIpAddress: string;
  fieldTooltipTitle_nodeEthereumAddress: string;
  fieldTooltipTitle_delegatorsShare: string;
  fieldPlaceHolder_guardianName: string;
  fieldPlaceHolder_guardianWebsite: string;
  fieldPlaceHolder_nodeIpAddress: string;
  fieldPlaceHolder_nodeEthereumAddress: string;
  fieldPlaceHolder_delegatorsShare: string;
  fieldErrorMessage_guardianName: string;
  fieldErrorMessage_guardianWebsite: string;
  fieldErrorMessage_nodeIpAddress: string;
  fieldErrorMessage_nodeEthereumAddress: string;
  fieldErrorMessage_delegatorsShare: string;
  action_register: string;
}
