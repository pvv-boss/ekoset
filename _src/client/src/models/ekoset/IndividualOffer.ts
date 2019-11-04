export default class IndividualOffer {
  public indOfferId: number;
  public clClientId: number | null;
  public clActivityId: number | null;
  public siteSectionId: number | null;
  public indOfferName: string;
  public indOfferH1: string;
  public indOfferSlug: string | null;
  public indOfferImgSmall: string | null;
  public indOfferImgBig: string | null;
  public indOfferPriority: string | null;
  public indOfferStatus: number | null;
  public indOfferUrl: string;
  public indOfferFreeText1: string;
  public indOfferFreeText2: string;
  public indOfferFooterContentLeft: string;
  public indOfferFooterContentRight: string;

  public smallImageFormData: FormData | null;
  public bigImageFormData: FormData | null;
}
