import Sort from '@/models/Sort'

export default class AppConfig {
  public static endPoint = 'http://ekoset.npobaltros.ru/api/2_0'
  public enabledAuthProviders: [] = []
  public sorts: Sort[] = []
  public initialized = false
  public defaultRowsLimit = 10
  public showCookieNotice = false
  public adminRoleName = 'admin'
  public cookieName: string = 'auth-rsn-cookie'
  public jwtHeaderName: string = 'auth-rsn-header'
  public mainEntityOfPage: string = 'http://ekoset.npobaltros.ru/'
}
