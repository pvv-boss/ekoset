import { DisplayFormatType } from '@/models/DisplayFormatType'
import Sort from '@/models/Sort'
import Pagination from '@/models/Pagination'
import AppConfig from '@/AppConfig'
import HttpUtil from '@/utils/HttpUtil'

export default class BaseService {
  public appConfig: AppConfig = new AppConfig()

  public async initConfig () {
    if (!this.appConfig.initialized) {
      const config = await HttpUtil.httpGet(`${AppConfig.endPoint}/app/client/config`)
      this.appConfig = config
      this.appConfig.initialized = true
    }
  }
  protected buildHttRequest (query: string, pagination?: Pagination): string {
    return this.internalBuildHttRequest(undefined, query, undefined, undefined, pagination)
  }

  protected internalBuildHttRequest (mainSection?: string, query?: string, format?: DisplayFormatType, sort?: Sort, pagination?: Pagination): string {
    let request = !!mainSection ? `${AppConfig.endPoint}/${mainSection}/${query}` : `${AppConfig.endPoint}/${query}`

    if (!!format) {
      request = request + `?format=${format}`
    }

    if (!!sort && sort.sortField) {
      request = request + `&sortfield=${sort.sortField}&sorttype=${sort.sortType || 'DESC'}`
    }

    if (!!pagination) {
      pagination.limit = pagination.limit > 0 ? pagination.limit : this.appConfig.defaultRowsLimit
      request = request + `&offset=${this.getPaginationOffset(pagination) || 0}&limit=${pagination.limit}`
    }

    return request
  }

  private getPaginationOffset (pagination: Pagination) {
    return (pagination.currentPage - 1) * pagination.limit
  }

}
