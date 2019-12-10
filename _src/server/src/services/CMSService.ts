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
      const promises = [];
      infos.forEach(
        (iterComponentInfo) => {
          const pr = this.adminSaveDynamicComponentSiteSection(siteSectionId, iterComponentInfo);
          promises.push(pr);
        })

      await Promise.all(promises);
      return {}
    }
    return {}
  }

  public async adminSaveDynamicComponentSiteSection (siteSectionId: number, info: DynamicComponentInfo) {
    return this.execFunction('f_admin_add_block_info_sitesection',
      [
        siteSectionId,
        info.code,
        !!info.visible ? info.visible : 0,
        !!info.visibleIndex ? info.visibleIndex : 0,
        !!info.dispalyName ? info.dispalyName : '',
        !!info.head ? info.head : '',
        !!info.props && !!info.props.leftBlock ? info.props.leftBlock : '',
        !!info.props && !!info.props.rightBlock ? info.props.rightBlock : '',
        info.id
      ]);
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

  public async adminDeleteDynamicComponent (id: number) {
    return await this.deleteById('site_block', 'site_block_id=$1', id);
  }

  public adminGetDynamicComponentsInfoDefault () {
    const result: DynamicComponentInfo[] = [];

    const brandList = new DynamicComponentInfo();
    brandList.id = 0;
    brandList.code = 1;
    brandList.head = 'Нас рекомендуют';
    brandList.headCentered = true;
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
    letters.headCentered = true;
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
    news.headCentered = true;
    news.dispalyName = 'Новости';
    news.name = 'ArticleList';
    news.visible = 1;
    news.visibleIndex = 6;
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
    bayService.visibleIndex = 1;
    bayService.props = {
      title: 'Заказать услугу'
    }


    const askExpert = new DynamicComponentInfo();
    askExpert.id = 0;
    askExpert.code = 5;
    askExpert.name = 'MessageForm';
    askExpert.dispalyName = 'Задать вопрос эксперту'
    askExpert.visible = 1;
    askExpert.visibleIndex = 7;
    askExpert.props = {
      title: 'Задать вопрос эксперту'
    }

    const clientTypeOfferList = new DynamicComponentInfo();
    clientTypeOfferList.id = 0;
    clientTypeOfferList.code = 7;
    clientTypeOfferList.head = 'Комплексные решения';
    clientTypeOfferList.headCentered = true;
    clientTypeOfferList.name = 'ClientTypeOfferList';
    clientTypeOfferList.dispalyName = 'Комплексные решения'
    clientTypeOfferList.visible = 1;
    clientTypeOfferList.visibleIndex = 4;

    const businessTypeOfferList = new DynamicComponentInfo();
    businessTypeOfferList.id = 0;
    businessTypeOfferList.code = 8;
    businessTypeOfferList.head = 'Индивидуальные предложения';
    businessTypeOfferList.headCentered = true;
    businessTypeOfferList.name = 'BusinessTypeOfferList';
    businessTypeOfferList.dispalyName = 'Индивидуальные предложения'
    businessTypeOfferList.visible = 1;
    businessTypeOfferList.visibleIndex = 5;
    businessTypeOfferList.props = {
      offerList: []
    }

    const serviceList = new DynamicComponentInfo();
    serviceList.id = 0;
    serviceList.code = 9;
    serviceList.head = 'Список услуг';
    serviceList.headCentered = true;
    serviceList.name = 'ServiceList';
    serviceList.dispalyName = 'Список услуг'
    serviceList.visible = 1;
    serviceList.visibleIndex = 0;
    serviceList.props = {
      serviceList: []
    }

    const servicePriceTable = new DynamicComponentInfo();
    servicePriceTable.id = 0;
    servicePriceTable.code = 10;
    servicePriceTable.head = 'Стоимость услуг';
    servicePriceTable.headCentered = true;
    servicePriceTable.name = 'ServicePriceTable';
    servicePriceTable.dispalyName = 'Стоимость услуг'
    servicePriceTable.visible = 1;
    servicePriceTable.visibleIndex = 1;
    servicePriceTable.props = {
      servicePriceList: [],
      allPricesPage: true
    }

    result.push(news, brandList, letters, bayService, askExpert, clientTypeOfferList, businessTypeOfferList, serviceList, servicePriceTable);

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
      //  bottomPosition: true,
      leftBlock: iterData.siteBlockContent,
      rightBlock: iterData.siteBlockContentRight
    }

    return freeContentBlock;
  }
}
