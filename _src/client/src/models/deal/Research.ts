import { BaseViewModel } from '../core/BaseViewModel'

export default class Research extends BaseViewModel {
  public researchId: number
  public researchName: string
  public researchStatus: string
  public researchDate: string
  public researchProtocol: string


  public partnerName: string
  public contractNumber: string
  public contractId: number
}
