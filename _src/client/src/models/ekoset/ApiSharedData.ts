import ClBrand from './ClBrand';
import Article from './Article';
import SeoMeta from './SeoMeta';

export default class ApiSharedData {
  public brandItems: ClBrand[] = []
  public articleItems: Article[] = []
  public seoMeta: SeoMeta
}
