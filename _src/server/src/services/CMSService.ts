import BaseService from './BaseService';
import DynamicComponentInfo from '@/entities/DynamicComponentInfo';


export default class CMSService extends BaseService {

  public async adminGetDynamicComponentsInfo () {
    // return this.getDbViewResult('viewName')

    const result: DynamicComponentInfo[] = [];

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

    const news = new DynamicComponentInfo();
    news.id = 3;
    news.head = 'Новости';
    news.name = 'ArticleList';
    news.visibleIndex = 1;
    news.props = {
      articleList: [],
      mode: 'columns'
    }

    const bayService = new DynamicComponentInfo();
    bayService.id = 4;
    bayService.head = 'Заказать услугу';
    bayService.name = 'MessageForm';
    bayService.visibleIndex = 0;
    bayService.props = {
      title: 'Заказать услугу'
    }


    const askExpert = new DynamicComponentInfo();
    askExpert.id = 5;
    askExpert.head = 'Задать вопрос эксперту';
    askExpert.name = 'MessageForm';
    askExpert.visibleIndex = 4;
    askExpert.props = {
      title: 'Задать вопрос эксперту'
    }

    result.push(news, brandList, letters, bayService, askExpert);

    return result;
  }
}
