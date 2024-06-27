import React from 'react';
import { IMenuItem } from '@/common/models/interfaces';
import CMenuBar from '@/common/components/menu/CMenuBar';
import { headers } from 'next/headers';

export default function CMainLayout({ children, menuList }: {
    children: React.ReactNode
    menuList: IMenuItem[]
}) {
    // const userInfo = TokenUtil.getUserInfoFromServer(headers());
  const userInfo = "";
    return <div
        style={{
            WebkitOverflowScrolling: 'touch',
            overflowY: 'scroll',
        }}
        className={'w-full h-full flex flex-row bg-lightBg text-lightFont'}>
        <div
            style={{
                position: 'fixed',
                // flex: '0 1 auto',
                width: 'auto',
                height: '140dvh',
                minHeight: '140dvh',
                backgroundColor: '#191F28',
                WebkitOverflowScrolling: 'touch',
                overflowY: 'scroll',
            }}
            className={'z-50'}>
            <CMenuBar userInfo={userInfo} menuList={menuList} />
        </div>
        <div
            style={{
                // flex: '1',
                width: '100%',
                minHeight: '100dvh',
                overflowX: 'clip',
                WebkitOverflowScrolling: 'touch',
                overflowY: 'scroll',
            }}>
            {children}
        </div>
    </div>;
}