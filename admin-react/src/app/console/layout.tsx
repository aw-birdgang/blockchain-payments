import '../globals.css';
import CMainLayout from '../../common/components/layout/CMainLayout';
import { MenuUtil } from '@/common/utils/MenuUtil';
import { TokenUtil } from '@/common/utils/TokenUtil';
import { headers } from 'next/headers';
import { BaseHttp, DataResponse } from '@/common/api/BaseHttp';
import { ApiUrl } from '@/common/api/ApiUrl';
import { IMenuItem } from '@/common/models/interfaces';
import AuthChecker from '@/app/AuthChecker';
import { MENU_DASHBOARD, MENU_DEV_FUNCTIONS, MENU_SETTINGS } from '@/common/constants/values';

/**
 * ### 내 현재 계정이 접근할 수 있는 메뉴 목록을 불러옵니다.
 * @param accessToken
 */
async function getMyMenu(accessToken: string): Promise<DataResponse<any>> {
    const result = await BaseHttp.call({
        method: 'GET',
        url: ApiUrl.ADMIN_MY_MENU,
        target: 'api',
        accessToken,
    });
    return result;
}

/**
 * ### (마스터 계정일 경우) 전체 메뉴 목록을 불러옵니다.
 * @param accessToken
 */
async function getAllMenu(accessToken: string): Promise<DataResponse<any>> {
    const result = await BaseHttp.call({
        method: 'GET',
        url: ApiUrl.ADMIN_ALL_MENU_TYPE,
        target: 'api',
        accessToken,
    });
    return result;
}

function putLocalMenus(menuList: IMenuItem[]) {
    // 대시보드 메뉴 삽입
    menuList.splice(0, 0, MENU_DASHBOARD);
    menuList.splice(menuList.length, 0, MENU_DEV_FUNCTIONS);
    menuList.splice(menuList.length, 0, MENU_SETTINGS);
}

export default async function RootLayout({ children }: {
    children: React.ReactNode
}) {
    const userInfo = await TokenUtil.getUserInfoFromServer(headers());
    // const myMenuResult = user ? user.isMaster === 'Y' ? await getAllMenu(user.access_token) : await getMyMenu(user.access_token) : undefined;
    // 임시로 all menu 열람하도록 변경
    const myMenuResult = await getAllMenu(userInfo?.access_token);
    const myMenu: IMenuItem[] = myMenuResult?.data ?? [];
    const menuList = MenuUtil.alignMenuList(myMenu);
    putLocalMenus(menuList);
    return (
        <div>
            {/* 주기적으로 현재 인증 상태를 확인하여 문제가 있다면 로그아웃하고 로그인 페이지로 이동 */}
            <AuthChecker userInfo={userInfo} />
            <CMainLayout menuList={menuList}>
                {children}
            </CMainLayout>
        </div>
    );
}