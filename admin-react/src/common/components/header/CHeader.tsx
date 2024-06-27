'use client';

import React from 'react';
import CHeaderTitle from '@/common/components/header/CHeaderTitle';
import CHeaderOptions from '@/common/components/header/CHeaderOptions';

export default function CHeader({ title, description, userInfo }: {
    title?: string
    description?: string
    userInfo: any
}) {
    return <div className={'w-full flex flex-row justify-between items-center h-16 bg-gray01 text-gray06 px-8 shadow-md'}>
        <CHeaderTitle title={title ?? 'Title'} description={description ?? ''} />
        <CHeaderOptions user={userInfo} />
    </div>;
}