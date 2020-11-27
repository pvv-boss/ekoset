import SiteSection from '@/models/ekoset/SiteSection'
import ClBrand from '@/models/ekoset/ClBrand'
import ClActivity from '@/models/ekoset/ClActivity';
import { BaseService } from './BaseService';
import MediaService from './MediaService';


export default class PublicEkosetService extends BaseService {

  //
  public async getSiteSectionBySlug (slug: string) {
    return this.getSiteSectionById(this.getIdBySlug(slug))
  }


  public async getSiteSectionNameBySlug (slug: string) {
    const query = `activities/query/name/${this.getIdBySlug(slug)}`
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  public async getSiteSections () {
    const query = `activities`
    const res = await this.apiRequest.getJSON(query);
    return res.data?.data
  }

  public async adminGetSiteSections () {
    const query = 'admin/panel/activities'
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  // Клиенты
  public async getClients () {
    const query = 'clients'
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  public async getClientsInfoByActivity (activityId: number) {
    const query = `clients/activity/${activityId}`
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }


  public async getClActivityList () {
    const query = `admin/panel/clActivities`
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  public async getAdminAllBands () {
    const query = `admin/panel/brands`
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  public async getBrandById (id: number) {
    const query = `admin/panel/brands/${id}`
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  public async getAdminForSiteSectionBrands (siteSectionId: number) {
    const query = `admin/panel/brands/activities/${siteSectionId}`
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  public async getAdminForBusinessServiceBrands (serviceId: number) {
    const query = `admin/panel/brands/serivce/${serviceId}`
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  public async getBrandsForHomePage () {
    const query = `brands`
    const res = this.apiRequest.getJSON(query);
    return (await res).data?.data
  }

  public async getBrandsBySiteSectionSlug (slug: string) {
    const res = this.getBrandsBySiteSection(this.getIdBySlug(slug))
    return (await res).data?.data
  }

  public async getBrandsByBusinessServiceSlug (slug: string) {
    const res = this.getBrandsByBusinessService(this.getIdBySlug(slug))
    return (await res).data?.data
  }

  public async saveSiteSection (siteSection: SiteSection) {
    const resPr = this.apiRequest.put('activities', {}, siteSection)

    if (siteSection.smallImageFormData) {
      this.context.$serviceRegistry.getService(MediaService).saveSiteSectionImage(siteSection.siteSectionId, siteSection.smallImageFormData, false)
    }
    if (siteSection.bigImageFormData) {
      this.context.$serviceRegistry.getService(MediaService).saveSiteSectionImage(siteSection.siteSectionId, siteSection.bigImageFormData, true)
    }

    return resPr
  }

  public async deleteSiteSection (slug: string) {
    return this.apiRequest.delete(`activities/${this.getIdBySlug(slug)}`)
  }

  public async saveBrand (brand: ClBrand) {
    const resultPr = this.apiRequest.put('brands', {}, brand)

    if (brand.smallImageFormData) {
      this.context.$serviceRegistry.getService(MediaService).saveBrandImage(brand.clBrandId, brand.smallImageFormData, false)
    }
    if (brand.recommendImageFormData) {
      this.context.$serviceRegistry.getService(MediaService).saveRecommendationLetterImage(brand.clBrandId, brand.recommendImageFormData)
    }

    return resultPr
  }

  public async saveClActivity (clActivity: ClActivity) {
    return this.apiRequest.put('admin/panel/clActivities', {}, clActivity)
  }

  public async deleteClActivity (clActivity: ClActivity) {
    return this.apiRequest.delete(`admin/panel/clActivities/${clActivity.clActivityId}`)
  }

  public async addOrRemoveBrand2SiteSection (brandId: number, siteSectionId: number, isAdd: boolean) {
    const query = `brands/${brandId}/sitesection/${siteSectionId}`
    if (isAdd) {
      return this.apiRequest.put(query)
    } else {
      return this.apiRequest.delete(query)
    }
  }

  public async addOrRemoveBrand2Service (brandId: number, serviceId: number, isAdd: boolean) {
    const query = `brands/${brandId}/service/${serviceId}`
    if (isAdd) {
      return this.apiRequest.put(query)
    } else {
      return this.apiRequest.delete(query)
    }
  }

  public async deleteBrand (id: number) {
    return this.apiRequest.delete(`brands/${id}`)
  }

  public async deleteRecommendationLetter (id: number) {
    const query = `brands/letters/${id}`
    return this.apiRequest.delete(query)
  }

  public async sendFormMessage (formData: FormData, mode: number) {
    const result = this.apiRequest.postForm(`user/message?ask=${mode}`, {}, formData)
    this.sendYandexMetrika(mode)
    return result
  }

  public async logOnServer (log: any) {
    return this.apiRequest.put('app/log', {}, log)
  }

  private async getBrandsBySiteSection (siteSectionId: number) {
    const query = `${siteSectionId}/brands`
    return this.apiRequest.getJSON(query)
  }

  private async getBrandsByBusinessService (serviceId: number) {
    const query = `services/${serviceId}/brands`
    return this.apiRequest.getJSON(query)
  }

  private async getSiteSectionById (siteSectionId: number) {
    const query = `activities/${siteSectionId}`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  private sendYandexMetrika (mode: number) {
    // @ts-ignore
    if (window.Ya) {
      const target = mode === 0 ? 'knopka_otpravit_zakaz' : (mode === 1 ? 'knopka_otpravit_vopros' : 'knopka_otpravit_tender')
      try {
        // @ts-ignore
        window.yaCounter64542580.reachGoal(64542580, target)
        // eslint-disable-next-line no-empty
      } catch { }
      try {
        // @ts-ignore
        window.yaCounter64542580.reachGoal(target)
        // eslint-disable-next-line no-empty
      } catch { }
    }
  }
}

