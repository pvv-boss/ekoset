export default class SiteSection {
  public siteSectionId: number;
  public siteSectionName: string;
  public siteSectionH1: string;
  public siteSectionSlug: string | null;
  public siteSectionImgBig: string | null;
  public siteSectionImgSmall: string | null;
  public siteSectionPriority: number;
  public siteSectionStatus: number | null;
  public siteSectionUrl: string;
  public siteSectionFreeText1: string;
  public siteSectionFreeText2: string;
  public siteSectionFooterContentLeft: string;
  public siteSectionFooterContentRight: string;
  public siteSectionLogo: string | null;

  public smallImageFormData: FormData | null;
  public bigImageFormData: FormData | null;
  public siteSectionLogoFormData: FormData | null;

}
