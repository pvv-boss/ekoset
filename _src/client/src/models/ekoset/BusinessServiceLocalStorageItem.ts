import BusinessService from './BusinessService'

export class BusinessServiceLocalStorageItem {

  public static createFromBusinessService (businessService: BusinessService) {
    const serv = new BusinessServiceLocalStorageItem()
    serv.serviceName = businessService.businessServiceName
    serv.serviceUrl = businessService.businessServiceUrl
    return serv
  }

  public static createFromServicePrice (servicePrice: any) {
    const serv = new BusinessServiceLocalStorageItem()
    serv.serviceName = servicePrice.name ? servicePrice.name : servicePrice.businesservicename
    serv.serviceUrl = servicePrice.businesserviceurl
    return serv
  }

  public serviceUrl: string
  public serviceName: string
}
