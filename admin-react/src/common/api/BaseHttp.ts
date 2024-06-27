import { HEADER_AUTHORIZATION } from '@/common/constants/values';
import { IApiParameter } from '@/common/models/interfaces';
import { StringUtil } from '@/common/utils/StringUtil';
import { ApiUrl } from '@/common/api/ApiUrl';

export interface DataResponse<T> {
    statusCode?: number;
    success: boolean;
    data?: T;
    error?: any;
    logout?: boolean;
}

export class BaseHttp {
    private static instance: BaseHttp;

    private constructor() {
    }

    /**
     * ### 모든 http 호출에서 공통적으로 사용할 함수
     * @param data http 호출 시 필요한 모든 데이터에 대한 객체
     */
    public static async call(data: IApiParameter): Promise<DataResponse<any>> {
        let url = ApiUrl.get(data.url ?? '', data.target ?? 'web');
        const method = data.method ?? 'GET';
        try {
            // Params Settings
            const paramsOptions: any = {
                ...data.params,
            };


            if (data.path) {
                url += `/${data.path}`;
            }
            url = StringUtil.appendQueryParams(url, paramsOptions);

            // Header Settings
            let headerOptions: any = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
            if (data.headers) {
                headerOptions = {
                    ...headerOptions, ...data.headers,
                };
            }
            if (data.accessToken) {
                headerOptions[HEADER_AUTHORIZATION] = `Bearer ${data.accessToken}`;
            }

            const fetchOptions: any = {
                method: method,
                headers: headerOptions,
                cache: 'no-store',
                body: JSON.stringify(
                    data.body,
                ),
            };
            if (method === 'GET') delete fetchOptions.body;

            const result: Response = await fetch(url, fetchOptions);
            const resultData = await result.json();
            if (data.target === 'web') {
                return resultData;
            }
            if (Math.floor(result.status / 100) === 2) {
                if (resultData?.data?.errorCode && resultData?.data?.errorMessage) {
                    return {
                        data: null,
                        success: false,
                        statusCode: result.status,
                        error: resultData,
                        logout: false,
                    };
                }
                return {
                    data: resultData,
                    success: true,
                    statusCode: result.status,
                    error: null,
                    logout: false,
                };
            } else {
                return {
                    data: null,
                    success: false,
                    statusCode: result.status,
                    error: resultData,
                    logout: resultData && resultData.errorCode && (resultData.errorCode === 'AUT_ERROR_004' || resultData.errorCode === 'AUT_ERROR_007'),
                };
            }
        } catch (e: any) {
            return {
                data: null,
                success: false,
                statusCode: 400,
                error: e.message,
            };
        }
    }
}