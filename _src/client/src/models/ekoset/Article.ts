export default class Article {
  public articleId: number
  public siteSectionId: number | null
  public articlePublishDate: string
  public articleAuthor: string | null
  public articleTitle: string
  public articleSlug: string
  public articleDescription: string
  public articleBody: string | null
  public articlePreviewImgSrc: string | null
  public articleHeaderImgSrc: string | null
  public articleSource: string | null
  public articleViewsNumber: number | null
  public articleStatus: number
  public articleUrl: string
}
