import { ApiResponse } from "./ApiResponse";
import { Pagination } from "@/models/core/Pagination";
import { Sort } from "@/models/core/Sort";
import { RequestInterceptor, ResponseInterceptor } from "./ApiInterceptor";

export enum ResponseType {
    JSON,
    TEXT,
    ANY,
}

// if (error.response) {
//   // Request made and server responded
//   reject(response);
// } else if (error.request) {
//   // The request was made but no response was received
//   reject(response);
// } else {
//   // Something happened in setting up the request that triggered an Error
//   reject(response);
// }
// Сделать типизированные ошибки (сереверная, нет ответа, своя)

export abstract class RequestAPI {
    private _baseUrl?: string;
    private requestInterceptorList: RequestInterceptor[] = [];
    private responseInterceptorList: ResponseInterceptor[] = [];

    constructor(options?: any, baseUrl?: string) {
        this._baseUrl = baseUrl;
    }

    public addRequestInterceptor(interceptor: RequestInterceptor) {
        this.requestInterceptorList.push(interceptor);
        return this.requestInterceptorList;
    }

    public addResponseInterceptor(interceptor: ResponseInterceptor) {
        this.responseInterceptorList.push(interceptor);
        return this.responseInterceptorList;
    }

    public set baseUrl(baseUrl: string | undefined) {
        this._baseUrl = baseUrl;
    }

    public get baseUrl(): string | undefined {
        return this._baseUrl;
    }

    public async getJSON(url: string, config?: any, pagination?: Pagination, sort?: Sort): Promise<ApiResponse> {
        return this.doRequest(this.buildUrl(url, pagination, sort), ResponseType.JSON, { ...config, ...{ method: "GET" } });
    }

    public async getText(url: string, config?: any, pagination?: Pagination, sort?: Sort): Promise<ApiResponse> {
        return this.doRequest(this.buildUrl(url, pagination, sort), ResponseType.TEXT, { ...config, ...{ method: "GET" } });
    }

    public async post(url: string, config?: any, data?: any): Promise<ApiResponse> {
        return this.doRequest(this.buildUrl(url), ResponseType.JSON, { ...config, ...{ method: "POST" } }, data);
    }

    public async postForm(url: string, config?: any, formData?: FormData): Promise<ApiResponse> {
        config.headers = {
            ...config.headers,
            ...{
                "Content-Type": "multipart/form-data",
            },
        };

        return this.post(url, { ...config }, formData);
    }

    public async put(url: string, config?: any, data?: any): Promise<ApiResponse> {
        return this.doRequest(this.buildUrl(url), ResponseType.JSON, { ...config, ...{ method: "PUT", data } }, data);
    }

    public async patch(url: string, config?: any, data?: any): Promise<ApiResponse> {
        return this.doRequest(this.buildUrl(url), ResponseType.JSON, { ...config, ...{ method: "PATCH", data } }, data);
    }

    public async delete(url: string, config?: any): Promise<ApiResponse> {
        return this.doRequest(this.buildUrl(url), ResponseType.JSON, { ...config, ...{ method: "DELETE" } });
    }

    protected async doRequest(url: string, responseType: ResponseType, config?: any, data?: any): Promise<ApiResponse> {
        const extConfig = this.beforProcessRequest(config);
        const resp = await this.processRequest(url, responseType, extConfig, data);
        return this.afterProcessResponse(resp);
    }

    protected beforProcessRequest(config: any) {
        let extConfig = { ...config };
        if (!!this.requestInterceptorList) {
            for (const iter of this.requestInterceptorList) {
                const addOptions = iter(extConfig);
                if (!!addOptions) {
                    extConfig = { ...extConfig, addOptions };
                }
            }
        }
        return extConfig;
    }

    protected abstract processRequest(url: string, responseType: ResponseType, config?: any, data?: any): Promise<ApiResponse>;

    protected afterProcessResponse(resp: ApiResponse) {
        if (!!this.responseInterceptorList) {
            for (const iter of this.responseInterceptorList) {
                iter(resp);
            }
        }
        return resp;
    }

    protected createResponse(resp: any): ApiResponse {
        return {
            data: resp.data,
            status: resp.status,
            statusText: resp.statusText,
            headers: resp.headers,
        };
    }

    protected createErrorResponse(error: any): ApiResponse {
        return this.createResponse(!!error.response ? error.response : { data: null, status: 500, statusText: error.message });
    }

    //FIXME: тут надо с? решить 1 = 1
    // page может быть и без офсета может в самом пагинации сделать формирование и в сорте

    // или вообще как функцию передавать для форматирования урла извне
    protected buildUrl(query: string, pagination?: Pagination, sort?: Sort): string {
        let url = this._baseUrl ? `${this._baseUrl}/${query}` : query;
        if (!!sort && !!sort.sortField) {
            url = url + `&sortfield=${sort.sortField}&sorttype=${sort.sortType || "DESC"}`;
        }
        if (!!pagination) {
            pagination.limit = pagination.limit > 0 ? pagination.limit : 10;
            url = url + `&offset=${(pagination.currentPage - 1) * pagination.limit || 0}&limit=${pagination.limit}`;
        }
        return url;
    }
}
