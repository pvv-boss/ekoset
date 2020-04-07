import SeoMeta from './SeoMeta';

export default class BusinessService extends SeoMeta {
  public businessServiceId: number;
  public siteSectionId: number;
  public siteSectionUrl: string;
  public businessServiceName: string;
  public businessServiceH1: string;
  public businessServiceSlug: string;
  public businessServiceUnit: string;
  public businessServicePrice: string;
  public businessServiceImgSmall: string;
  public businessServiceImgBig: string;
  public businessServiceStatus: number;
  public businessServicePriority: number;
  public businessServiceParentId: number;
  public businessServiceUrl: string;
  // public businessServiceFreeText1: string;
  // public businessServiceFreeText2: string;
  // public businessServiceFooterContentLeft: string;
  // public businessServiceFooterContentRight: string;

  public smallImageFormData: FormData;
  public bigImageFormData: FormData;
}


