import { Pagination } from '@/models/core/Pagination'
import Article from '@/models/ekoset/Article'
import ClArticleTag from '@/models/ekoset/ClArticleTag'

import { BaseService } from './BaseService'

export default class ArticleService extends BaseService {

  public async getArticleBySlug (slug: string) {
    return this.getArticleById(this.getIdBySlug(slug))
  }

  public async getRelatedArticleListBySlug (slug: string) {
    return this.getRelatedArticleListById(this.getIdBySlug(slug))
  }

  // TODO: Для админки - все новости @oso
  public async adminGetAll () {
    const query = 'admin/panel/news'
    const result = this.apiRequest.getJSON(query)
    return (await result).data.data
  }

  // Для админки получить связи статьи с услугами
  public async adminGetServiceRelation (siteSectionId: number, artcicleUrl: string) {
    const query = `admin/panel/news/${this.getIdBySlug(artcicleUrl)}/${siteSectionId}/service`
    return (await this.apiRequest.getJSON(query)).data
  }

  // Для админки добавить связи статьи с услугой
  public async adminAddRemoveServiceRelation (businessServiceId: number, artcicleUrl: string, isAdd: boolean) {
    const query = `admin/panel/news/${this.getIdBySlug(artcicleUrl)}/service/${businessServiceId}`
    if (isAdd) {
      return this.apiRequest.post(query)
    } else {
      return this.apiRequest.delete(query)
    }
  }

  // Добавить/Убрать тэг
  public async adminAddRemoveArticleTag (artcicleSlug: string, tagId: number, isAdd: boolean) {
    const query = `admin/panel/news/${this.getIdBySlug(artcicleSlug)}/tags/${tagId}`
    if (isAdd) {
      return this.apiRequest.post(query)
    } else {
      return this.apiRequest.delete(query)
    }
  }

  // Связка тэгов для Новости
  public async getArticleTagsRelation (artcicleSlug: string) {
    const query = `admin/panel/news/${this.getIdBySlug(artcicleSlug)}/tags`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  // Сохрнаить тэг
  public async saveArticleTag (tag: ClArticleTag) {
    const query = `admin/panel/news/tags`
    return this.apiRequest.post(query, {}, tag)
  }

  // Для главной страницы
  public async getRootArticleList (pagination?: Pagination) {
    const query = 'news'
    this.modifyPagination(0, pagination)
    const result = this.apiRequest.getJSON(query, pagination)
    return (await result).data.data
  }

  // Для раздела
  public async getArticleListBySiteSectionSlug (siteSectionSlug: string, pagination?: Pagination) {
    const siteSectionId = this.getIdBySlug(siteSectionSlug)
    this.modifyPagination(siteSectionId, pagination)
    return this.getArticleListBySiteSection(siteSectionId, pagination)
  }

  // Для услуги
  public async getArticleListByBusinessServiceSlug (siteSectionUrl: string | null, serviceSlug: string, pagination?: Pagination) {
    const siteSectionId = siteSectionUrl ? this.getIdBySlug(siteSectionUrl) : 0
    this.modifyPagination(siteSectionId, pagination)
    return this.getArticleListByBusinessService(this.getIdBySlug(serviceSlug), pagination)
  }


  // Тэги для заданной статьи
  public async getArticleTags (artcicleSlug: string) {
    const query = `news/${this.getIdBySlug(artcicleSlug)}/tags`
    return (await this.apiRequest.getJSON(query)).data?.data
  }


  public async saveArticle (article: Article) {
    const query = 'news'
    return this.apiRequest.put(query, {}, article)
  }

  public async deleteArticle (id: number) {
    const query = `news/${id}`
    return this.apiRequest.delete(query)
  }

  private async getArticleById (id: number) {
    const query = `news/${id}`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  private async getRelatedArticleListById (id: number) {
    const query = `news/${id}/related`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  private async getArticleListBySiteSection (siteSectionId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/news`
    const result = this.apiRequest.getJSON(query, {}, pagination)
    return (await result).data.data
  }

  private async getArticleListByBusinessService (serviceId: number, pagination?: Pagination) {
    const query = `services/${serviceId}/news`
    const result = this.apiRequest.getJSON(query, {}, pagination)
    return (await result).data.data
  }

  private async modifyPagination (siteSectionId: number, pagination?: Pagination) {
    if (pagination) {
      pagination.total = Number(await this.getArticlesCount(siteSectionId))
    }
  }

  private async getArticlesCount (siteSectionId: number | null) {
    const query = siteSectionId && siteSectionId > 0 ? `${siteSectionId}/news/count` : 'news/count'
    const result = await this.apiRequest.getJSON(query)
    return result.data?.data
  }
}
