import { ApiResponse } from "./ApiResponse";

export type RequestInterceptor = (config: any) => any;

export type ResponseInterceptor = (response: ApiResponse) => any;
