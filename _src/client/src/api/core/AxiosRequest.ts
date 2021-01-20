import { RequestAPI, ResponseType } from './RequestAPI'
import { ApiResponse } from './ApiResponse'
import axios, { AxiosInstance } from 'axios'

// FIXME: options использовать в processRequest extConfig
export default class AxiosRequest extends RequestAPI {
  private options?: any
  private axiosInstance: AxiosInstance

  constructor (options?: any, baseUrl?: string) {
    super(options, baseUrl)
    this.options = options
    this.axiosInstance = axios.create(this.options)
  }

  protected async processRequest (url: string, responseType: ResponseType, config?: any, data?: any): Promise<ApiResponse> {
    const extConfig = { ...config, ...{ data, url } }

    try {
      const result = await this.axiosInstance.request(extConfig);
      return this.createResponse(result)
    } catch (err) {
      return Promise.reject(this.createErrorResponse(err))
    }
  }
}

