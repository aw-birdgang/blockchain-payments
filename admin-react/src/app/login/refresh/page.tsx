'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ApiUrl } from '@/common/api/ApiUrl';

export default function LoginPage({ params }: any) {
    const router = useRouter();
    const { data: session, update } = useSession();
    let initialized = false;

    async function refresh() {
        if (initialized) return;
        initialized = true;
        if (!session) {
            return;
        }
        const result = await (await fetch(ApiUrl.get(ApiUrl.ADMIN_ADMIN_REFRESH, 'web'), {
            method: 'POST',
            body: JSON.stringify({
                // @ts-ignore
                RefreshToken: session.refresh_token,
            }),
        })).json();
        if (result.success && result.data &&
            result.data.access_token && result.data.refresh_token && result.data.access_token_expire) {
            await update({
                ...session,
                access_token: result.data.access_token,
                access_token_expire: result.data.access_token_expire,
                refresh_token: result.data.refresh_token,
                test: {
                    data: 'test',
                },
            });
            window.location.href = '/console/dashboard';
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return <div>
        {`Loading...`}
    </div>;
}
