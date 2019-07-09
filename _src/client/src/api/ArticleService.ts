import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import Pagination from '@/models/Pagination'
import Article from '@/models/ekoset/Article'

export default class ArticleService extends BaseService {

  public async  getRootArticleList (pagination?: Pagination) {
    const query = 'news'
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  public async  getArticleListBySiteSection (siteSectionId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/news`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  public async getArticleById (id: number) {
    const query = `news/${id}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getArticleBySlugUrl (articleUrl: string) {
    const id = this.getArticleIdBySlugUrl(articleUrl)
    return this.getArticleById(id)
  }

  public getArticleIdBySlugUrl (articleUrl: string) {
    return Number(articleUrl.split('-').pop())
  }

  public async getRelatedArticleListById (id: number) {
    await this.testSave(id)
    const query = `news/${id}/related`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async saveArticleForSection (siteSectionId: number, article: Article) {
    const query = `${siteSectionId}/news`
    return HttpUtil.httpPut(this.buildHttRequest(query), article)
  }

  public async saveArticle (article: Article) {
    const query = 'news'
    return HttpUtil.httpPut(this.buildHttRequest(query), article)
  }

  public async deleteArticle (id: number) {
    const query = `news/${id}`
    return HttpUtil.httpDelete(this.buildHttRequest(query))
  }

  private async testSave (id: number) {
    const article: Article = await this.getArticleById(id)
    this.saveArticle(article)
  }
}
