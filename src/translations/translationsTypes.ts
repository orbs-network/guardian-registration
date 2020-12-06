export interface IAppTranslations {
  commons: ICommonsTranslations;
  domain: IDomainTranslations;
  header: IHeaderTranslations;
  modals: IModalsTranslations;
  explanationsTexts: IExplanationTexts;
  accountConnectionSection: IAccountConnectionSectionTranslations;
  noEthereumProviderSection: INoEthereumProviderSectionTranslations;
  registerGuardianSection: IRegisterGuardianSectionTranslations;
  delegatingToAnotherAccountSection: IDelegatingToAnotherAccountSectionTranslations;
  guardianDataForms: IGuardianDataFormsTranslations;
  guardianEditPage: IGuardianEditPageTranslations;
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
  conceptName_guardianAddress: string;
  conceptName_delegatorsShare: string;
  conceptName_certifiedCommittee: string;
  conceptExplanation_delegatorsShare: string;
}

export interface IAccountConnectionSectionTranslations {
  title_accountConnectionRequired: string;
  subTitle_pleaseConnectWithYourGuardianAddress: string;
  ticker_message_agreeToTheToUAndPrivacyPolicy: string;
  ticker_message_confirmIAmNotACitizenOrResident: string;
  ticker_subMessage_theStateOfIsrael: string;
  ticker_subMessage_otherRegions: string;
  action_connect: string;
}

export interface INoEthereumProviderSectionTranslations {
  title_noEthereumProviderDetected: string;
  subTitle_pleaseInstallMetamaskAndRefresh: string;
  action_install: string;
}

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

export interface IRegisterGuardianSectionTranslations {
  error_nodeAddressCannotBeTheSameAsGuardianAddress: string;
  error_minimalBalanceAtNodeAddressIsRequired: string;
  title_guardianRegistration: string;
  title_yourGuardianAddressIs: string;
  text_pleaseNote: string;
  action_register: string;
}

export interface IDelegatingToAnotherAccountSectionTranslations {
  text_pleaseNote: string;
  text_connectedWithAddress: string;
  text_thisAddressIsCurrentlyDelegatingTo: string;
  explanation_previousDelegationsNeedsToBeCanceled: string;
  action_unDelegate: string;
}

export interface IGuardianDataFormsTranslations {
  fieldLabel_guardianName: string;
  fieldLabel_guardianWebsite: string;
  fieldLabel_nodeIpAddress: string;
  fieldLabel_nodeEthereumAddress: string;
  fieldLabel_delegatorsShare: string;
  fieldLabel_guardianDetailsUrl: string;
  fieldLabel_certifiedCommitteeUrl: string;
  fieldTooltipTitle_guardianName: string;
  fieldTooltipTitle_guardianWebsite: string;
  fieldTooltipTitle_nodeIpAddress: string;
  fieldTooltipTitle_nodeEthereumAddress: string;
  fieldTooltipTitle_delegatorsShare: string;
  fieldTooltipTitle_certifiedCommitteeUrl: string;
  fieldPlaceHolder_guardianName: string;
  fieldPlaceHolder_guardianWebsite: string;
  fieldPlaceHolder_nodeIpAddress: string;
  fieldPlaceHolder_nodeEthereumAddress: string;
  fieldPlaceHolder_delegatorsShare: string;
  fieldErrorMessage_guardianName: string;
  fieldErrorMessage_guardianWebsite: string;
  fieldErrorMessage_nodeIpAddress: string;
  fieldErrorMessage_nodeEthereumAddress: string;
  fieldErrorMessage_certifiedCommittee: string;
  fieldErrorMessage_delegatorsShare: string;
  fieldValueNote_usingDefaultValue: string;
  fieldValueNote_certifiedCommittee: string;
  fieldValueNote_youHaveNotSetYourDetailsPageUrl: string;
  fieldExplanation_delegatorsShare: string;
  fieldExplanation_certifiedCommittee: string;
  action_register: string;
  action_update: string;
  action_cancel: string;
}

export interface IGuardianEditPageTranslations {
  tabHeader_info: string;
  tabHeader_editInfo: string;
  tabHeader_delegatorsShare: string;
  tabHeader_guardianDetailsUrl: string;
  tabHeader_unregister: string;
  action_updateInfo: string;
  action_updateDelegatorsShare: string;
  action_updateCertifiedCommitteeUrl: string;
  action_unregister: string;
}

export interface IModalsTranslations {
  modalTitle_updateGuardianInfo: string;
  modalTitle_updateDelegatorsShare: string;
  modalTitle_guardianDetailsPageUrl: string;
  modalTitle_unregister: string;
  acceptText_yes: string;
  acceptText_default: string;
  cancelText_default: string;
  modalInstruction_defaultTx: string;
  modalInstruction_unregister: string;
  modalContent_delegatorsShare: string;
  modalContent_guardianDetailsPageUrl: string;
  modalContent_unregister: string;
  actionCanceled_default: string;
  message_txCanceled: string;
  successMessage_guardianInfo: string;
  successMessage_delegatorsShare: string;
  successMessage_guardianDetailsPageURL: string;
  successMessage_unregister: string;
  errorMessage_guardianInfo: string;
  errorMessage_delegatorsShare: string;
  errorMessage_guardianDetailsPageURL: string;
  errorMessage_unregister: string;
}
