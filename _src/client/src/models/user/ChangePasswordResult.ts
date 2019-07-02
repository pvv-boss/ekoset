export enum ChangePasswordStatus {
  OK,
  PasswordIsNotStrong,
  OldAndNewPasswordAreEquals,
  Failed,
  Unknown
}

export class ChangePasswordResult {
  public static makeUnknownResult() {
    const result = new ChangePasswordResult()
    result.status = ChangePasswordStatus.Unknown
    result.endProcess = false
    result.message = ''
    return result
  }

  public status: ChangePasswordStatus = ChangePasswordStatus.Unknown
  public exception = null
  public message: string
  public endProcess = false
}
