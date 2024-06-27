'use client';

import { useEffect } from 'react';
import { BaseHttp } from '@/common/api/BaseHttp';
import { ApiUrl } from '@/common/api/ApiUrl';
import { signOut } from 'next-auth/react';

/**
 * 일정 간격마다 현재 인증 상태가 올바른지 확인하고, 올바르지 않다면 로그아웃 처리
 * @param userInfo
 * @constructor
 */
export default function AuthChecker({ userInfo }: {
    userInfo: any
}) {
    async function checkAuth() {
        const accessToken = userInfo && userInfo.access_token ? userInfo.access_token.toString() : undefined;
        if (!accessToken) return false;
        const result = await BaseHttp.call({
            url: ApiUrl.ADMIN_LOGIN_INFO,
            method: 'GET',
            target: 'api',
            accessToken,
        });
        if (!result.success) {
            const redirectionUrl = process.env.NEXT_PUBLIC_WEB_SERVER_URL ?? 'http://localhost:3000';
            await signOut({
                redirect: true,
                callbackUrl: redirectionUrl,
            });
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkAuth();
        }, 10 * 1000); // 1000ms (1초) 간격으로 실행

        // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
        return () => clearInterval(interval);
    }, []);

    return null;
}