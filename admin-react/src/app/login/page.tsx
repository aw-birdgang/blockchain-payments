import React from 'react';
import './../globals.css';
import LoginClientPage from '@/app/login/client_page';
import { BaseHttp } from '@/common/api/BaseHttp';
import { ApiUrl } from '@/common/api/ApiUrl';
import { redirect } from 'next/navigation';
import { MenuUrl } from '@/common/constants/MenuUrl';
import { TokenUtil } from '@/common/utils/TokenUtil';
import { headers } from 'next/headers';

export default async function LoginPage({ searchParams }: {
    searchParams: {
        reason?: string
    }
}) {
    const currentHeaders = headers();
    const accessToken = TokenUtil.getUserInfoFromServer(currentHeaders)?.access_token ?? '';

    const loginInfo = await BaseHttp.call({
        url: ApiUrl.ADMIN_LOGIN_INFO,
        method: 'GET',
        target: 'api',
        accessToken,
    });

    if (loginInfo.success) {
        redirect(MenuUrl.CONSOLE_DASHBOARD);
    }

    return <LoginClientPage searchParams={searchParams} />;
}
