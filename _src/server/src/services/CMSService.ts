import BaseService from './BaseService';
import DynamicComponentInfo from '@/entities/DynamicComponentInfo';


export default class CMSService extends BaseService {

  private apiViewName = 'v_api_admin_site_block_info'

  public async adminGetDynamicComponentsInfoSiteSection (siteSectionId: number) {
    const result = await this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1', [siteSectionId]);
    return this.getDynamicComponentInfoFromDataBase(result);
  }

  public async adminGetDynamicComponentsInfoService (serviceId: number) {
    const result = await this.getDbViewResult(this.apiViewName, null, 'business_service_id = $1', [serviceId]);
    return this.getDynamicComponentInfoFromDataBase(result);
  }

  public async adminGetDynamicComponentsInfoOffer (indOfferId: number) {
    const result = await this.getDbViewResult(this.apiViewName, null, 'ind_offer_id = $1', [indOfferId]);
    return this.getDynamicComponentInfoFromDataBase(result);
  }

  public async adminSaveDynamicComponentsSiteSection (siteSectionId: number, infos: DynamicComponentInfo[]) {
    if (!!infos) {
      infos.forEach((iterComponentInfo) => {
        try {
          this.execFunction('f_admin_add_block_info_sitesection',
            [
              siteSectionId,
              iterComponentInfo.code,
              iterComponentInfo.visible,
              iterComponentInfo.visibleIndex,
              !!iterComponentInfo.dispalyName ? iterComponentInfo.dispalyName : '',
              !!iterComponentInfo.head ? iterComponentInfo.head : '',
              !!iterComponentInfo.props && !!iterComponentInfo.props.leftBlock ? iterComponentInfo.props.leftBlock : '',
              !!iterComponentInfo.props && !!iterComponentInfo.props.rightBlock ? iterComponentInfo.props.rightBlock : '',
              iterComponentInfo.id
            ]);
        } catch (exc) {
          const r = exc;
        }
      })
    }
    return {}
  }

  public async adminSaveDynamicComponentsOffer (offerId: number, infos: DynamicComponentInfo[]) {
    if (!!infos) {
      infos.forEach((iterComponentInfo) => {
        this.execFunction('f_admin_add_block_info_offer', [offerId, iterComponentInfo.id, iterComponentInfo.visible, iterComponentInfo.visibleIndex]);
      })
    }
    return {}
  }


  public async adminSaveDynamicComponentsService (serviceId: number, infos: DynamicComponentInfo[]) {
    if (!!infos) {
      infos.forEach((iterComponentInfo) => {
        this.execFunction('f_admin_add_block_info_service', [serviceId, iterComponentInfo.id, iterComponentInfo.visible, iterComponentInfo.visibleIndex]);
      })
    }
    return {}
  }

  public adminGetDynamicComponentsInfoDefault () {
    const result: DynamicComponentInfo[] = [];

    const brandList = new DynamicComponentInfo();
    brandList.id = 0;
    brandList.code = 1;
    brandList.head = 'Нас рекомендуют';
    brandList.dispalyName = 'Нас рекомендуют';
    brandList.name = 'RecommendationList';
    brandList.visible = 1;
    brandList.visibleIndex = 2;
    brandList.props = {
      brandList: []
    }


    const letters = new DynamicComponentInfo();
    letters.id = 0;
    letters.code = 2;
    letters.head = 'Благодарственные письма';
    letters.dispalyName = 'Благодарственные письма';
    letters.name = 'RecommLetterList';
    letters.visible = 1;
    letters.visibleIndex = 3;
    letters.props = {
      recommLetterList: []
    }

    const news = new DynamicComponentInfo();
    news.id = 0;
    news.code = 3
    news.head = 'Новости';
    news.dispalyName = 'Новости';
    news.name = 'ArticleList';
    news.visible = 1;
    news.visibleIndex = 1;
    news.props = {
      articleList: [],
      mode: 'columns'
    }

    const bayService = new DynamicComponentInfo();
    bayService.id = 0;
    bayService.code = 4;
    bayService.name = 'MessageForm';
    bayService.dispalyName = 'Заказать услугу'
    bayService.visible = 1;
    bayService.visibleIndex = 0;
    bayService.props = {
      title: 'Заказать услугу'
    }


    const askExpert = new DynamicComponentInfo();
    askExpert.id = 0;
    askExpert.code = 5;
    askExpert.name = 'MessageForm';
    askExpert.dispalyName = 'Задать вопрос эксперту'
    askExpert.visible = 1;
    askExpert.visibleIndex = 4;
    askExpert.props = {
      title: 'Задать вопрос эксперту'
    }

    result.push(news, brandList, letters, bayService, askExpert);

    return result;
  }

  private getDynamicComponentInfoFromDataBase (dvViewResult: any) {
    const result: DynamicComponentInfo[] = this.adminGetDynamicComponentsInfoDefault();

    dvViewResult.forEach((iterData) => {
      if (iterData.clSiteBlockCode === 6) {
        const freeBlockInfo = this.getFreeContentBlockDynamicComponentInfo(iterData);
        result.push(freeBlockInfo);
      } else {
        const iterCompoentnInfo = this.getDynamicComponentInfoByCode(result, iterData.clSiteBlockCode);
        if (!!iterCompoentnInfo) {
          iterCompoentnInfo.id = iterData.siteBlockId
          iterCompoentnInfo.visible = iterData.siteBlockVisibleInd
          iterCompoentnInfo.visibleIndex = iterData.siteBlockPosition
          iterCompoentnInfo.dispalyName = iterData.clSiteBlockName
        }
      }
    });

    return result;
  }

  private getDynamicComponentInfoByCode (infos: DynamicComponentInfo[], code: number): DynamicComponentInfo {
    return infos.find((iter) => iter.code === code);
  }

  private getFreeContentBlockDynamicComponentInfo (iterData: any): DynamicComponentInfo {
    const freeContentBlock = new DynamicComponentInfo();
    freeContentBlock.id = iterData.siteBlockId;
    freeContentBlock.code = 6;
    freeContentBlock.name = 'FreeContentBlock';
    freeContentBlock.head = iterData.siteBlockHeader;
    freeContentBlock.dispalyName = !!iterData.siteBlockName ? iterData.siteBlockName : 'Конструктор'
    freeContentBlock.visible = iterData.siteBlockVisibleInd;
    freeContentBlock.visibleIndex = iterData.siteBlockPosition;
    freeContentBlock.props = {
      bottomPosition: true,
      leftBlock: iterData.siteBlockContent,
      rightBlock: iterData.siteBlockContentRight
    }

    return freeContentBlock;
  }
}
