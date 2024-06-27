import { Props } from 'react-apexcharts';

/** 모든 API 호출 시 첨부해하는 데이터 타입. BaseHttp 메소드에서 해당 타입을 입력 인자로 받아서 처리함 */
export interface IApiParameter {
    url?: string;

    method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

    /**
     * web: this web server
     * auth: auth server
     * api: admin api server
     */
    target?: 'web' | 'api';

    /** Query params of API request */
    params?: object;

    /** Path params of API request */
    path?: string | undefined | null;

    /** Body of API Request */
    body?: any;

    /** Header of API Request */
    headers?: object;

    /** Access token that stored in the cookies */
    accessToken?: string;

    /** Refresh token that stored in the cookies */
    refreshToken?: string;

    /** Indicates that retrying API request after token refresh */
    refresh?: boolean;
}

/** 페이지의 쿼리 파라미터 타입. server component 에서 페이지 정보 및 데이터를 불러올 때 이용 */
export interface ISearchParams {
    id?: string;
    page?: string;
    totalPage?: string;
    search?: string;
    order?: string;
    orderBy?: string;
    size?: string;
    edit?: string;
}

/**
 * 공통 리스트의 필터 목록에 대한 아이템
 */
export interface ITableColumn {
    id: string;
    name: string;
}

/**
 * 리액트 ApexChart 라이브러리에 대한 기본 객체 타입
 */
export interface IApexChart extends Props {

}

/**
 * 서비스 내에서 사용할 Common code 에 대한 객체 타입
 */
export interface ICommonCode {
    code_index: string;
    code_key: string;
    code_value: string;
    code_temp1: string;
    code_temp2: string;
    code_temp3: string;
    code_temp4: string;
    code_temp5: string;
}

/**
 * ### 유저 등급 enum
 * admin - 0
 *
 * manager - 1
 *
 * agent - 2
 *
 * seller - 3
 *
 * player - 4
 */
export enum USER_GRADE {
    'ADMIN', 'MANAGER', 'AGENT', 'SELLER', 'PLAYER'
}

/**
 * 메뉴 목록의 각 아이템에 대한 타입
 */
export interface IMenuItem {
    menu_code: string;
    menu_lv: string;
    menu_type: 'Page' | 'Category';
    menu_text: string;
    menu_name: string;
    menu_href: string;
    menu_icon?: string;
    menu_align: string;
    use_tag: 'Y' | 'N';

    // local properties
    children?: IMenuItem[];
}