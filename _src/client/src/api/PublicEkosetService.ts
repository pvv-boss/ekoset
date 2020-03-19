import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import { getServiceContainer } from './ServiceContainer'
import SiteSection from '@/models/ekoset/SiteSection'
import ClBrand from '@/models/ekoset/ClBrand'
import ClActivity from '@/models/ekoset/ClActivity';
import ReccomendationLetter from '@/models/ekoset/ReccomendationLetter';

export default class PublicEkosetService extends BaseService {

  //
  public async getSiteSectionBySlug (slug: string) {
    return this.getSiteSectionById(this.getIdBySlug(slug))
  }


  public async getSiteSectionNameBySlug (slug: string) {
    const query = `activities/query/name/${this.getIdBySlug(slug)}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getSiteSections () {
    const query = `activities`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async adminGetSiteSections () {
    const query = 'admin/panel/activities'
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  // Клиенты
  public async getClients () {
    const query = 'clients'
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getClActivityList () {
    const query = `admin/panel/clActivities`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAdminAllBands () {
    const query = `admin/panel/brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getBrandById (id: number) {
    const query = `admin/panel/brands/${id}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAdminForSiteSectionBrands (siteSectionId: number) {
    const query = `admin/panel/brands/activities/${siteSectionId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAdminForBusinessServiceBrands (serviceId: number) {
    const query = `admin/panel/brands/serivce/${serviceId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getBrandsForHomePage () {
    const query = `brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getBrandsBySiteSectionSlug (slug: string) {
    return this.getBrandsBySiteSection(this.getIdBySlug(slug))
  }

  public async getBrandsByBusinessServiceSlug (slug: string) {
    return this.getBrandsByBusinessService(this.getIdBySlug(slug))
  }

  public async saveSiteSection (siteSection: SiteSection) {
    const resPr = HttpUtil.httpPut(this.buildHttRequest('activities'), siteSection)

    if (!!siteSection.smallImageFormData) {
      getServiceContainer().mediaService.saveSiteSectionImage(siteSection.siteSectionId, siteSection.smallImageFormData, false)
    }
    if (!!siteSection.bigImageFormData) {
      getServiceContainer().mediaService.saveSiteSectionImage(siteSection.siteSectionId, siteSection.bigImageFormData, true)
    }

    return resPr
  }

  public async deleteSiteSection (slug: string) {
    return HttpUtil.httpDelete(this.buildHttRequest(`activities/${this.getIdBySlug(slug)}`))
  }

  public async saveBrand (brand: ClBrand) {
    const resultPr = HttpUtil.httpPut(this.buildHttRequest('brands'), brand)

    if (!!brand.smallImageFormData) {
      getServiceContainer().mediaService.saveBrandImage(brand.clBrandId, brand.smallImageFormData, false)
    }

    return resultPr
  }

  public async saveClActivity (clActivity: ClActivity) {
    return HttpUtil.httpPut(this.buildHttRequest('admin/panel/clActivities'), clActivity)
  }

  public async deleteClActivity (clActivity: ClActivity) {
    return HttpUtil.httpDelete(this.buildHttRequest(`admin/panel/clActivities/${clActivity.clActivityId}`))
  }

  public async addOrRemoveBrand2SiteSection (brandId: number, siteSectionId: number, isAdd: boolean) {
    const query = `brands/${brandId}/sitesection/${siteSectionId}`
    if (isAdd) {
      return HttpUtil.httpPut(query)
    } else {
      return HttpUtil.httpDelete(query)
    }
  }

  public async addOrRemoveBrand2Service (brandId: number, serviceId: number, isAdd: boolean) {
    const query = `brands/${brandId}/service/${serviceId}`
    if (isAdd) {
      return HttpUtil.httpPut(query)
    } else {
      return HttpUtil.httpDelete(query)
    }
  }

  public async deleteBrand (id: number) {
    return HttpUtil.httpDelete(this.buildHttRequest(`brands/${id}`))
  }

  // Рекомендации
  public async getRecommendationLettersByBrand (brandId: number) {
    const query = `brands/${brandId}/letters`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }


  public async saveRecommendation (letter: ReccomendationLetter) {
    const query = 'brands/letters'
    return HttpUtil.httpPut(this.buildHttRequest(query), letter)
  }


  public async deleteRecommendationLetter (id: number) {
    const query = `brands/letters/${id}`
    return HttpUtil.httpDelete(this.buildHttRequest(query))
  }

  public async getRecommendationLettersByBusinessServiceSlug (serviceSlug: string) {
    const query = `letters/services/${this.getIdBySlug(serviceSlug)}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async   getRecommendationLettersBySiteSectionSlug (siteSectionSlug: string) {
    const query = `letters/sitesection/${this.getIdBySlug(siteSectionSlug)}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async  getRecommendationLettersForHomePage () {
    const query = `letters`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  //

  public async sendFormMessage (formData: FormData, isAskForExpert: boolean) {
    const result = HttpUtil.httpPostForm(`user/message?ask=${isAskForExpert}`, formData)
    return result
  }


  private async getBrandsBySiteSection (siteSectionId: number) {
    const query = `${siteSectionId}/brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  private async getBrandsByBusinessService (serviceId: number) {
    const query = `services/${serviceId}/brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  private async getSiteSectionById (siteSectionId: number) {
    const query = `activities/${siteSectionId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }
}

