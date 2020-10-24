import { Sort } from '@/models/core/Sort'

export default class AppConfig {
  // public static endPoint = 'http://91.210.168.57/api/2_0'
  public static endPoint = 'http://localhost:3003/api/2_0'
  // public static endPoint = 'https://www.ekoset.ru/api/2_0'
  public enabledAuthProviders: [] = []
  public sorts: Sort[] = []
  public initialized = false
  public defaultRowsLimit = 10
  public showCookieNotice = false
  public adminRoleName = 'admin'
  public cookieName = 'auth-rsn-cookie'
  public jwtHeaderName = 'auth-rsn-header'
}
