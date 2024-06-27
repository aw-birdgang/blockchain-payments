import { IMenuItem } from '@/common/models/interfaces';

export const FETCH_SIZE = 20;
export const GAME_ID = 1;
export const SELECT_BALL_NUMBER = 5;
export const TOTAL_BALL_NUMBER = 50;

// [ 쿠키 이름 ]
export const COOKIE_LANGUAGE_CODE = 'lang';                  // 언어 설정 키
export const COOKIE_REMEMBER_ACCOUNT = 'remember_account';   // 계정 저장 여부
export const COOKIE_ACCOUNT_EMAIL = 'email';                 // 저장된 이메일
export const COOKIE_MENU_FOLD = 'menu_fold';                  // 언어 설정 키

// [ 헤더 ]
export const HEADER_X_URL = 'x-url';
export const HEADER_X_ORIGIN = 'x-origin';
export const HEADER_X_PATHNAME = 'x-pathname';
export const HEADER_LANGUAGE_CODE = 'language_code';
export const HEADER_AUTHORIZATION = 'Authorization';
export const HEADER_ACCESS_TOKEN = 'x-server-access-token';
export const HEADER_REFRESH_TOKEN = 'x-server-refresh-token';
export const HEADER_TOKEN_EXPIRE = 'x-server-token-expire';

export const HEADER_USER_INFO = 'x-server-user-info';

export const SHOW_API_LOG = false;
export const SHOW_UNDER_CONSTRUCTION = true;

// [ 사이즈 ]
export const SIZE_DEFAULT_TEXT_FIELD_WIDTH = 300;
export const SIZE_DEFAULT_MODAL_WIDTH = 640;
export const SIZE_ROW_INDEX_WIDTH = 80;
export const SIZE_ROW_SHORT_WIDTH = 100;
export const SIZE_ROW_MIDDLE_WIDTH = 160;
export const SIZE_ROW_NUMBER_LIST_WIDTH = 200;

export const SIZE_MENU_WIDTH_FOLD = 50;
export const SIZE_MENU_WIDTH_UNFOLD = 280;
export const SIZE_MENU_HEIGHT = 48;

// [ 값 ]
export const VALUE_LIST_DEFAULT_SIZE = 20;

// [ 공통 드롭다운 ]
export const DROPDOWN_DEFAULT_BOOLEAN = [
    { id: 'true', value: true, name: 'YES' },
    { id: 'false', value: false, name: 'NO' },
];

// [ 로컬 메뉴 ]
export const MENU_DASHBOARD: IMenuItem = {
    menu_code: 'A0000000',
    menu_name: 'Dashboard',
    menu_lv: '2',
    menu_align: 'A0000',
    menu_href: '/dashboard',
    menu_icon: 'fa-home',
    menu_text: 'dev',
    menu_type: 'Page',
    use_tag: 'Y',
};

export const MENU_DEV_FUNCTIONS: IMenuItem = {
    menu_code: 'A0000001',
    menu_name: 'Dev Functions',
    menu_lv: '2',
    menu_align: 'A0000',
    menu_href: '/dev',
    menu_icon: 'fa-cube',
    menu_text: 'dev',
    menu_type: 'Page',
    use_tag: 'Y',
};

export const MENU_SETTINGS: IMenuItem = {
    menu_code: 'A0000002',
    menu_name: 'Settings',
    menu_lv: '2',
    menu_align: 'A0000',
    menu_href: '/settings',
    menu_icon: 'fa-gear',
    menu_text: 'dev',
    menu_type: 'Page',
    use_tag: 'Y',
};