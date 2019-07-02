export enum RegistrationStatus {
  OK,
  AlreadyExists,
  InvalidEmail,
  PasswordIsNotStrong,
  Error,
  Unknown
}

export class RegistrationResult {
  public static makeUnknownResult() {
    const result = new RegistrationResult()
    result.registrationStatus = RegistrationStatus.Unknown
    result.endProcess = false
    result.message = ''
    return result
  }

  public registrationStatus: RegistrationStatus = RegistrationStatus.Unknown
  public exception: null
  public endProcess = false
  public message: string
}
