export default class Article {
  public articleId: number;
  public siteSectionId: number;
  public articlePublishDate: string;
  public articleAuthor: string | null;
  public articleTitle: string;
  public articleDescription: string;
  public articleBody: string | null;
  public articlePreviewImgSrc: string | null;
  public articleHeaderImgSrc: string | null;
  public articleSource: string | null;
  public articleViewsNumber: number | null;
  public articleStatus: number;
}
