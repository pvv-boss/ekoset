import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator'
import SitePage, { SitePageType } from '@/models/SitePage';
import { ServiceRegistry } from '@/ServiceRegistry';
import TopMenuService from '@/services/TopMenuService';
import PublicEkosetService from '@/services/PublicEkosetService';

@Module({
  name: 'AppStore',
  stateFactory: true,
  namespaced: true
})
export default class AppStore extends VuexModule {
  private currentSiteSectionState: string | null = null
  private currentSiteSectionNameState: string | null = null
  private currentServiceNameState: string | null = null

  private defaultCustomPageState: SitePage | null = null
  private currentCustomPage: SitePage | null = null


  @VuexMutation
  public setCurrentSiteSection (siteSectionSlug: string | null) {
    this.currentSiteSectionState = siteSectionSlug
  }

  @VuexMutation
  public setCurrentSiteSectionName (siteSectionName: string | null) {
    this.currentSiteSectionNameState = siteSectionName
  }

  @VuexMutation
  public setCurrentServiceName (name: string | null) {
    this.currentServiceNameState = name
  }


  @VuexMutation
  public setDefaultCustomPage (defaultCustomPage: SitePage | null) {
    this.defaultCustomPageState = defaultCustomPage
  }

  @VuexAction
  public async changeCurrentSiteSection (siteSectionSlug: string | null) {
    if (this.currentSiteSectionState !== siteSectionSlug) {
      this.setCurrentSiteSection(siteSectionSlug)

      if (siteSectionSlug) {
        const siteSectionModel = await ServiceRegistry.instance.getService(PublicEkosetService).getSiteSectionNameBySlug(siteSectionSlug)
        if (siteSectionModel) {
          this.setCurrentSiteSectionName(siteSectionModel.siteSectionName)
        } else {
          this.setCurrentSiteSectionName(null)
        }
      } else {
        this.setCurrentSiteSectionName(null)
      }
    }
  }



  @VuexAction
  public async changeDefaultCustomPage () {
    if (!this.currentDefaultSitePage) {
      const sitePageInfo = await ServiceRegistry.instance.getService(TopMenuService).getSitePageById(SitePageType.MAIN)
      this.context.commit('setDefaultCustomPage', sitePageInfo)
    }
  }

  @VuexAction
  public async changeCurrentServiceName (name: string | null) {
    this.context.commit('setCurrentServiceName', name)
  }


  public get currentSiteSection (): string | null {
    return this.currentSiteSectionState
  }

  public get currentSiteSectionName (): string | null {
    return this.currentSiteSectionNameState
  }

  public get сurrentServiceName (): string | null {
    return this.currentServiceNameState
  }


  // public get currentSitePage (): SitePage | null {
  //   return this.currentCustomPage
  // }

  public get currentDefaultSitePage (): SitePage | null {
    return this.defaultCustomPageState
  }
}
