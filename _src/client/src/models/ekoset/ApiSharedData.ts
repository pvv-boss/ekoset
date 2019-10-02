import ClBrand from './ClBrand';
import Article from './Article';
import SeoMeta from './SeoMeta';
import ReccomendationLetter from './ReccomendationLetter';

export default class ApiSharedData {
  public brandItems: ClBrand[] = []
  public reccomendationLetters: ReccomendationLetter[] = []
  public articleItems: Article[] = []
  public seoMeta: SeoMeta
}
