import SeoMeta from './SeoMeta';

export default class IndividualOffer extends SeoMeta {
  public indOfferId: number;
  public clClientId: number;
  public clActivityId: number | null;
  public siteSectionId: number | null;
  public indOfferName: string;
  public indOfferH1: string;
  public indOfferSlug: string | null;
  public indOfferImgSmall: string | null;
  public indOfferImgBig: string | null;
  public indOfferPriority: number;
  public indOfferStatus: number | null;
  public indOfferUrl: string;
  public indOfferFreeText1: string;
  public indOfferFreeText2: string;
  public indOfferFooterContentLeft: string;
  public indOfferFooterContentRight: string;

  public smallImageFormData: FormData | null;
  public bigImageFormData: FormData | null;
}
