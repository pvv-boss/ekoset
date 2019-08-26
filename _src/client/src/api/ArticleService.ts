import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import Pagination from '@/models/Pagination'
import Article from '@/models/ekoset/Article'

export default class ArticleService extends BaseService {

  public async getArticleBySlug (slug: string) {
    return this.getArticleById(this.getIdBySlug(slug))
  }

  public async getRelatedArticleListBySlug (slug: string) {
    return this.getRelatedArticleListById(this.getIdBySlug(slug))
  }

  // Для главной страницы
  public async  getRootArticleList (pagination?: Pagination) {
    const query = 'news'
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  // Для раздела
  public async  getArticleListBySiteSectionSlug (siteSectionSlug: string, pagination?: Pagination) {
    return this.getArticleListBySiteSection(this.getIdBySlug(siteSectionSlug), pagination)
  }

  // Для услуги
  public async  getArticleListByBusinessServiceSlug (serviceSlug: string, pagination?: Pagination) {
    return this.getArticleListByBusinessService(this.getIdBySlug(serviceSlug), pagination)
  }

  public async saveArticle (article: Article) {
    const query = 'news'
    return HttpUtil.httpPut(this.buildHttRequest(query), article)
  }

  public async deleteArticle (id: number) {
    const query = `news/${id}`
    return HttpUtil.httpDelete(this.buildHttRequest(query))
  }

  private async getArticleById (id: number) {
    const query = `news/${id}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  private async getRelatedArticleListById (id: number) {
    const query = `news/${id}/related`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  private async  getArticleListBySiteSection (siteSectionId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/news`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  private async  getArticleListByBusinessService (serviceId: number, pagination?: Pagination) {
    const query = `services/${serviceId}/news`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }
}
