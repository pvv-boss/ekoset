import Sort from '@/models/Sort'

export default class AppConfig {
  public static endPoint = 'https://gostorgi24.ru/api/2_0'
  // public static endPoint = 'http://localhost:3001/api/2_0'
  public enabledAuthProviders: [] = []
  public sorts: Sort[] = []
  public initialized = false
  public defaultRowsLimit = 10
  public showCookieNotice = false
  public adminRoleName = 'admin'
  public cookieName: string = 'auth-rsn-cookie'
  public jwtHeaderName: string = 'auth-rsn-header'
}