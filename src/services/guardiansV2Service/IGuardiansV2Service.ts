export interface IGuardiansV2Service {
  isRegisteredGuardian: (address: string) => Promise<boolean>;
  getGuardianInfo: (address: string) => Promise<any>;
}
