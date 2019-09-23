import axios, { AxiosInstance, AxiosPromise, AxiosResponse, AxiosRequestConfig } from 'axios'
import AppConfig from '@/AppConfig'
import { getServiceContainer } from '@/api/ServiceContainer'
import BrcDialogPlugin from '@/plugins/brc-dialog/brc-dialog'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition'
import VueRouter from 'vue-router'

class HttpUtil {
  public router?: VueRouter
  private isAuth = true
  private axiosInstance: AxiosInstance

  constructor () {
    this.axiosInstance = axios.create({
      baseURL: AppConfig.endPoint
    })

    if (this.isAuth) {
      // Перед отправокой запроса
      this.axiosInstance.interceptors.request.use(
        (request: AxiosRequestConfig) => {
          try {
            const token = getServiceContainer().authService.getAccessToken()
            if (!token || token === 'undefined' || token === undefined) {
              deleteJwtHeader(request)
            } else {
              request.headers.Authorization = `Bearer ${token}`
            }
          } catch {
            deleteJwtHeader(request)
          }
          return request
        },
        (error) => {
          return Promise.reject(error)
        })

      // После получения ответа (кладем полученный токен обратно)
      this.axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
          const jwt = response.headers[getServiceContainer().authService.appConfig.jwtHeaderName]
          if (!!jwt) {
            getServiceContainer().authService.setAccessToken(jwt)
          }
          return response
        }, (error) => {
          return Promise.reject(error)
        })

      const deleteJwtHeader = (request: AxiosRequestConfig) => {
        request.headers.Authorization = ' '
        delete request.headers.Authorization
      }
    }
  }

  public async httpGet (url: string) {
    return this.processResponse(this.axiosInstance.get(url))
  }

  public async httpPost (url: string, data?) {
    return this.processResponse(this.axiosInstance.post(url, data))
  }

  public async httpPut (url: string, data?) {
    return this.processResponse(this.axiosInstance.put(url, data))
  }

  public async httpDelete (url: string) {
    return this.processResponse(this.axiosInstance.delete(url))
  }

  public async httpPostForm (url: string, formData?) {
    const conf = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return this.processResponse(this.axiosInstance.post(url, formData, conf))
  }

  private async processResponse (axiosResult: AxiosPromise<any>) {
    try {
      const response = await axiosResult

      const data = response != null ? response.data : null
      const status = parseInt(data.status, 0)

      if (data == null || status === 0 || status > 399) {
        return this.handleError({ message: 'Failed to retrieve API data', status: data.status })
      }

      if (data && data.success === false) {
        return this.handleError(data)
      }

      if (data) {
        if (data.showNotify) {
          this.showNotify(data.showNotify.alert, data.showNotify.title, data.showNotify.text)
        }
        if (!!data.redirectUrl && this.router) {
          this.router.push(data.redirectUrl)
        }
        return data.data ? data.data : data.body
      }
    } catch (err) {
      return this.handleError(err)
    }
  }

  private handleError (error) {
    let errorResponse: any = {}
    if (error.response && error.response.data) {
      errorResponse.message = error.response.data.message
      errorResponse.status = error.response.data.status
      errorResponse.success = false
    } else {
      errorResponse = { message: error.message ? error.message : error, status: error.status ? error.status : 500 }
    }
    this.redirect(errorResponse)
    return { message: errorResponse.message, status: errorResponse.status, success: false }
  }

  private redirect (errorResponse: any) {
    const routerName = errorResponse.status === 401 || errorResponse.status === 403 ? 'auth-login' : 'error-page'
    if (this.router) {
      this.router.push({ name: 'error', params: { errorMessage: errorResponse.message, status: errorResponse.status } })
      this.router.push({ name: routerName, params: { errorMessage: errorResponse.message, status: errorResponse.status, mode: 'login' } })
    }
  }

  private showNotify (alert: boolean, title: string, text: string) {
    if (alert) {
      BrcDialogPlugin.showInfoAlert(title, text)
    } else {
      BrcDialogPlugin.showNotify(BrcDialogType.Success, title, text, 3000, { position: BrcDialogPosition.Central })
    }
  }
}

const request: HttpUtil = new HttpUtil()

export default request
