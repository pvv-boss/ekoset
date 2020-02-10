export default class SitePage {
  public sitePageId: number
  public sitePageCode: number
  public sitePageName: string
  public sitePageH1: string
  public sitePageMenuName: string
  public sitePageBanner: string
  public sitePageMenuPosition: number
  public sitePageStatus: number
  public siteSectionId: number | null
  public sitePageRouteName: string
  public sitePageUrl: string
}

export enum SitePageType {
  UFO,
  MAIN,
  ABOUT,
  CLIENTS,
  PRICES,
  NEWS,
  CONTACTS
}
