export interface IAppTranslations {
  commons: ICommonsTranslations;
  header: IHeaderTranslations;
  accountConnectionSection: IAccountConnectionSectionTranslations;
}

export interface ICommonsTranslations {
  loading: string;
  loadingFailed: string;

  termsOfUse: string;
  privacyPolicy: string;

  version: string;
}

export interface IAccountConnectionSectionTranslations {}

export interface IHeaderTranslations {
  title_appName: string;
}
