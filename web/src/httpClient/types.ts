import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RefreshAuthFunction = (failedRequest: AxiosResponse) => Promise<any>;

export interface FailedRequest {
    response: {
        config: AxiosRequestConfig;
    };
}
