import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { getServiceContainer } from '@/api/ServiceContainer';
import SitePage, { SitePageType } from '@/models/SitePage';

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


  @Mutation
  public setCurrentSiteSection (siteSectionSlug: string | null) {
    this.currentSiteSectionState = siteSectionSlug
  }

  @Mutation
  public setCurrentSiteSectionName (siteSectionName: string | null) {
    this.currentSiteSectionNameState = siteSectionName
  }

  @Mutation
  public setCurrentServiceName (name: string | null) {
    this.currentServiceNameState = name
  }
  // @Mutation
  // public setCurrentCustomPage (currentCustomPage: SitePage | null) {
  //   this.currentCustomPage = currentCustomPage || this.defaultCustomPage
  // }

  @Mutation
  public setDefaultCustomPage (defaultCustomPage: SitePage | null) {
    this.defaultCustomPageState = defaultCustomPage
  }

  @Action
  public async changeCurrentSiteSection (siteSectionSlug: string | null) {
    this.context.commit('setCurrentSiteSection', siteSectionSlug)
    if (!!siteSectionSlug) {
      const siteSectionModel = await getServiceContainer().publicEkosetService.getSiteSectionNameBySlug(siteSectionSlug)
      if (siteSectionModel) {
        this.context.commit('setCurrentSiteSectionName', siteSectionModel.siteSectionName)
      } else {
        this.context.commit('setCurrentSiteSectionName', null)
      }
    } else {
      this.context.commit('setCurrentSiteSectionName', null)
    }
  }


  // @Action
  // public async changeCurrentCustomPage (currentCustomPageSlug: string | null) {
  //   let sitePageInfo = null
  //   if (!!currentCustomPageSlug) {
  //     const pageId = getServiceContainer().topMenuService.getIdBySlug(currentCustomPageSlug)
  //     sitePageInfo = !!pageId ? await getServiceContainer().topMenuService.getSitePageById(pageId) : null
  //   }
  //   this.context.commit('setCurrentCustomPage', sitePageInfo)
  // }

  @Action
  public async changeDefaultCustomPage () {
    if (!this.currentDefaultSitePage) {
      const sitePageInfo = await getServiceContainer().topMenuService.getSitePageById(SitePageType.MAIN)
      this.context.commit('setDefaultCustomPage', sitePageInfo)
    }
  }

  @Action
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
