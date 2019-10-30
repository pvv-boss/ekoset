import Pagination from '@/models/Pagination'
import AppConfig from '@/AppConfig'
import HttpUtil from '@/utils/HttpUtil'

export default class BaseService {
  private static appConfig: AppConfig = new AppConfig()

  public async initConfig () {
    if (!BaseService.appConfig.initialized) {
      const config = await HttpUtil.httpGet(`${AppConfig.endPoint}/app/client/config`)
      BaseService.appConfig = config
      BaseService.appConfig.initialized = true
    }
  }

  public getIdBySlug (slug: string) {
    let result = 0;
    if (!!slug && slug.indexOf('-') > -1) {
      const tryGet = Number(slug.split('-').pop())
      result = Number.isNaN(tryGet) ? 0 : tryGet
    }
    return result
  }

  public getConfig () {
    return BaseService.appConfig
  }

  protected buildHttRequest (query: string, pagination?: Pagination): string {
    return this.internalBuildHttRequest(undefined, query, pagination)
  }

  protected internalBuildHttRequest (mainSection?: string, query?: string, pagination?: Pagination): string {
    // protected internalBuildHttRequest (mainSection?: string, query?: string, format?: DisplayFormatType, sort?: Sort, pagination?: Pagination): string {
    let request = !!mainSection ? `${AppConfig.endPoint}/${mainSection}/${query}` : `${AppConfig.endPoint}/${query}`

    // if (!!format) {
    //   request = request + `?format=${format}`
    // }

    // if (!!sort && sort.sortField) {
    //   request = request + `&sortfield=${sort.sortField}&sorttype=${sort.sortType || 'DESC'}`
    // }
    if (!!pagination) {
      pagination.limit = pagination.limit > 0 ? pagination.limit : this.getConfig().defaultRowsLimit
      request = request + `?offset=${this.getPaginationOffset(pagination) || 0}&limit=${pagination.limit}`
    }

    return request
  }


  private getPaginationOffset (pagination: Pagination) {
    return (pagination.currentPage - 1) * pagination.limit
  }

}
