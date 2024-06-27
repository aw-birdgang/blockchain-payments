'use client';

import React from 'react';
import CBasicPagePopAlert from '@/common/components/layout/CBasicPagePopAlert';
import CBasicPageLogout from '@/common/components/layout/CBasicPageLogout';
import { useMenuStore } from '@/common/states/menu';
import { SIZE_MENU_WIDTH_FOLD, SIZE_MENU_WIDTH_UNFOLD } from '@/common/constants/values';
import CHeader from '@/common/components/header/CHeader';

/**
 * 모든 관리자 페이지 화면의 기본 페이지. 좌측 메뉴를 제외한 페이지의 헤더와 본문 영역을 포함함
 *
 * @param children
 * @param title 헤더에 표시될 제목
 * @param description 헤더의 제목 옆에 표시될 설명글
 * @param alertMessage 페이지가 처음 열렸을 때 alert 이 표시되는 경우, 표시될 메세지
 * @constructor
 */
export default function CBasicPage({ children, userInfo, title, description, alertMessage, logout }: {
    children: React.ReactNode
    userInfo: any
    title?: string
    description?: string
    alertMessage?: string
    logout?: boolean
}) {
    const { fold } = useMenuStore();

    return <div
        className={`w-full flex-1 flex flex-col justify-start items-start desktop:items-center
            transition-all duration-200 ease-out min-h-dvh
            ${fold ?
            `pl-[50px]` :
            `pl-[50px] sm:pl-[280px]`
        }    
        `}>
        <CHeader title={title} description={description} userInfo={userInfo} />
        <div className='w-full px-2 py-4'>
            {children}
        </div>
        {alertMessage && <CBasicPagePopAlert alertMessage={alertMessage} />}
        {logout && <CBasicPageLogout logout={logout} />}
    </div>;
}