import BaseService from './BaseService';
import DynamicComponentInfo from '@/entities/DynamicComponentInfo';


export default class CMSService extends BaseService {

  public async adminGetDynamicComponentsInfo () {
    // return this.getDbViewResult('viewName')

    const result: DynamicComponentInfo[] = [];

    const news = new DynamicComponentInfo();
    news.id = 3;
    news.head = 'Новости';
    news.name = 'ArticleList';
    news.visibleIndex = 1;
    news.props = {
      articleList: [],
      mode: 'columns'
    }

    const brandList = new DynamicComponentInfo();
    brandList.id = 1;
    brandList.head = 'Нас рекомендуют';
    brandList.name = 'RecommendationList';
    brandList.visibleIndex = 2;
    brandList.props = {
      brandList: []
    }


    const letters = new DynamicComponentInfo();
    letters.id = 2;
    letters.head = 'Благодарственные письма';
    letters.name = 'RecommLetterList';
    letters.visibleIndex = 3;
    letters.props = {
      recommLetterList: []
    }

    result.push(news, brandList, letters);

    return result;
  }
}
