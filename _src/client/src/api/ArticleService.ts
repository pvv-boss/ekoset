import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import Pagination from '@/models/Pagination'
import Article from '@/models/ekoset/Article'

export default class ArticleService extends BaseService {


  public async  getArticleListBySiteSection (siteSectionId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/news`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  public async getArticleById (siteSectionId: number, id: number) {
    const query = `${siteSectionId}/news/${id}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async saveArticle (siteSectionId: number, article: Article) {
    const query = `${siteSectionId}/news`
    return HttpUtil.httpPut(this.buildHttRequest(query), article)
  }

  public async deleteArticle (siteSectionId: number, id: number) {
    const query = `${siteSectionId}/news/${id}`
    return HttpUtil.httpDelete(this.buildHttRequest(query))
  }
}
