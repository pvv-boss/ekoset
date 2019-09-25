import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import Pagination from '@/models/Pagination'
import Article from '@/models/ekoset/Article'
import ClArticleTag from '@/models/ekoset/ClArticleTag'

export default class ArticleService extends BaseService {

  public async getArticleBySlug (slug: string) {
    return this.getArticleById(this.getIdBySlug(slug))
  }

  public async getRelatedArticleListBySlug (slug: string) {
    return this.getRelatedArticleListById(this.getIdBySlug(slug))
  }

  // Для админки - все новости
  public async  adminGetAll () {
    const query = 'admin/panel/news'
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }

  // Для админки получить связи статьи с услугами
  public async adminGetServiceRelation (siteSectionUrl: string, artcicleUrl: string) {
    const query = `admin/panel/news/${this.getIdBySlug(artcicleUrl)}/${this.getIdBySlug(siteSectionUrl)}/service`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  // Для админки добавить связи статьи с услугой
  public async adminAddRemoveServiceRelation (serviceUrl: string, artcicleUrl: string, isAdd: boolean) {
    const query = `admin/panel/news/${this.getIdBySlug(artcicleUrl)}/service/${this.getIdBySlug(serviceUrl)}`
    if (isAdd) {
      return HttpUtil.httpPut(this.buildHttRequest(query))
    } else {
      return HttpUtil.httpDelete(this.buildHttRequest(query))
    }
  }

  // Добавить/Убрать тэг
  public async adminAddArticleTag (artcicleSlug: string, tag: ClArticleTag) {
    const query = `admin/panel/news/${this.getIdBySlug(artcicleSlug)}}/tags`
    return HttpUtil.httpPost(this.buildHttRequest(query), tag)
  }

  public async adminRemoveArticleTag (artcicleSlug: string, tagId: number) {
    const query = `admin/panel/news/${this.getIdBySlug(artcicleSlug)}/tags/${tagId}`
    return HttpUtil.httpDelete(this.buildHttRequest(query))
  }

  // Все тэги
  public async getAllArticleTags () {
    return HttpUtil.httpGet(this.buildHttRequest('admin/panel/news/tags'))
  }

  // Тэги для Новости
  public async getArticleTags (artcicleSlug: string, tagId: number) {
    const query = `news/${this.getIdBySlug(artcicleSlug)}/tags`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  // Для главной страницы
  public async  getRootArticleList (pagination?: Pagination) {
    const query = 'news'
    this.modifyPagination(0, pagination)
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  // Для раздела
  public async  getArticleListBySiteSectionSlug (siteSectionSlug: string, pagination?: Pagination) {
    const siteSectionId = this.getIdBySlug(siteSectionSlug)
    this.modifyPagination(siteSectionId, pagination)
    return this.getArticleListBySiteSection(siteSectionId, pagination)
  }

  // Для услуги
  public async  getArticleListByBusinessServiceSlug (siteSectionSlug: string, serviceSlug: string, pagination?: Pagination) {
    const siteSectionId = this.getIdBySlug(siteSectionSlug)
    this.modifyPagination(siteSectionId, pagination)
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

  private async modifyPagination (siteSectionId: number, pagination?: Pagination) {
    if (!!pagination) {
      pagination.total = Number(await this.getArticlesCount(siteSectionId))
    }
  }

  private async getArticlesCount (siteSectionId?: number | null) {
    const query = siteSectionId && siteSectionId > 0 ? `${siteSectionId}/news/count` : 'news/count'
    const result = await HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }
}
