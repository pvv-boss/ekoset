import SessionUser from './SessionUser';

export enum RegistrationStatus {
  OK,
  RequereConfirmBySmsCode,
  RequereConfirmByEmail,
  Invalid,
  Unknown
}

export class RegistrationResult {
  public registrationStatus: RegistrationStatus = RegistrationStatus.Unknown
  public sessionUser: SessionUser = SessionUser.anonymousUser;
  public message: string
}
