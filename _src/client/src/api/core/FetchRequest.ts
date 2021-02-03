import { RequestAPI, ResponseType } from "./RequestAPI";
import { ApiResponse } from "./ApiResponse";

// FIXME: Надо базовые настройки в конструктор как у аксиоса
export default class FetchRequest extends RequestAPI {
    protected async processRequest(url: string, responseType: ResponseType, config?: any, data?: any): Promise<ApiResponse> {
        const reqData =
            !!data && data instanceof FormData ? data : !!data ? (Object(data) === data ? JSON.stringify(data) : data) : null;

        if (!!reqData && !(data instanceof FormData)) {
            config.headers = {
                ...config.headers,
                ...{
                    "Content-Type": "application/json",
                },
            };
        }

        const extConfig = { ...config, ...{ body: reqData } };
        let response: ApiResponse;

        try {
            const result = await fetch(url, extConfig);
            response = this.createResponse(result);
            response.data = responseType === ResponseType.JSON ? await result.json() : await result.text();
            if (!result.ok || result.status > 399) {
                return Promise.reject(this.createErrorResponse({ response }));
            }

            return response;
        } catch (err) {
            return Promise.reject(this.createErrorResponse(err));
        }
    }
}
