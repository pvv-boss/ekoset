export enum LogonStatus {
  OK,
  ShouldChangePassword,
  UserNotFoundButSocialNetworkAuthOK,
  Failed,
  Blocked,
  Error,
  Logoff,
  Unknown
}

export class LogonResult {
  public static makeFailedResult() {
    const result = new LogonResult()
    result.logonStatus = LogonStatus.Failed
    result.endProcess = false
    return result
  }

  public static makeUnknownResult() {
    const result = new LogonResult()
    result.logonStatus = LogonStatus.Unknown
    result.endProcess = false
    result.message = ''
    return result
  }

  public static makeLogoffResult() {
    const result = new LogonResult()
    result.logonStatus = LogonStatus.Logoff
    result.endProcess = false
    return result
  }

  public logonStatus: LogonStatus = LogonStatus.Unknown
  public exception = null
  public endProcess = false
  public message: string
}
