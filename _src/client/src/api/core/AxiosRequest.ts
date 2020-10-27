import { AbstractApiRequest, ResponseType } from './AbstractApiRequest'
import { ApiResponse } from './ApiResponse'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import BrcDialogPlugin from '@/plugins/brc-dialog/brc-dialog'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition'


export default class AxiosRequest extends AbstractApiRequest {
  private options?: any
  private axiosInstance: AxiosInstance

  constructor (options?: any, baseUrl?: string) {
    super(options, baseUrl)
    this.options = options
    this.axiosInstance = axios.create(this.options)
  }

  protected async processRequest (url: string, responseType: ResponseType, config?: any, data?: any): Promise<ApiResponse> {
    const extConfig = { ...config, ...{ data, url } }
    return this.processResponse(this.axiosInstance.request(extConfig))
  }

  private async processResponse (axiosResult: Promise<AxiosResponse<any>>): Promise<ApiResponse> {
    let response: ApiResponse
    try {
      const result = await axiosResult
      response = this.createResponse(result)

      if (result.data?.showNotify) {
        BrcDialogPlugin.showNotify(BrcDialogType.Info, result.data?.showNotify.title, result.data?.showNotify.text, 2500, { position: BrcDialogPosition.Central })

      }

      return Promise.resolve(response)
    } catch (err) {
      return Promise.reject(this.createErrorResponse(err))
    }
  }
}

