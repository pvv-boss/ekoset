import SeoMeta from './SeoMeta';

export default class Article extends SeoMeta {
  public articleId: number;
  public siteSectionId: null | number;
  public businessServiceId: null | number;
  public articlePublishDate: string;
  public articleAuthor: string | null;
  public articleTitle: string;
  public articleH1: string;
  public articleSlug: string | null;
  public articleDescription: string;
  public articleBody: string | null;
  public articlePreviewImgSrc: string | null;
  public articleHeaderImgSrc: string | null;
  public articleSource: string | null;
  public articleViewsNumber: number | null;
  public articleStatus: number;
  public articleUrl: string;
}
