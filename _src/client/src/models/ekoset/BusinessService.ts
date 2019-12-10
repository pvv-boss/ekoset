export default class BusinessService {
  public businessServiceId: number;
  public siteSectionId: number | null;
  public siteSectionUrl: string;
  public businessServiceName: string;
  public businessServiceH1: string;
  public businessServiceSlug: string | null;
  public businessServiceUnit: string | null;
  public businessServicePrice: number | null;
  public businessServiceImgSmall: string | null;
  public businessServiceImgBig: string | null;
  public businessServiceStatus: number | null;
  public businessServicePriority: number;
  public businessServiceParentId: number | null;
  public businessServiceUrl: string;
  public businessServiceFreeText1: string;
  public businessServiceFreeText2: string;
  public businessServiceFooterContentLeft: string;
  public businessServiceFooterContentRight: string;

  public smallImageFormData: FormData | null;
  public bigImageFormData: FormData | null;
}


