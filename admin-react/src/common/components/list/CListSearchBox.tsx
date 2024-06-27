'use client';

import { useRouter } from 'next/navigation';
import React, { FormEventHandler } from 'react';
import { useLanguageStore } from '@/common/states/locale';

export default function CListSearchBox(props: {
    children: React.ReactNode
    actions?: React.ReactNode
    onSearch?: FormEventHandler<HTMLFormElement> | undefined
}) {
    const lang = useLanguageStore().langSet;
    return <form onSubmit={props.onSearch}>
        <div
            style={{ whiteSpace: 'nowrap' }}
            className={'flex flex-wrap justify-between w-full bg-white transition-all duration-500 ease-out border border-gray30 p-4 mb-8 gap-x-4 gap-y-2'}>
            <div className={'flex flex-wrap justify-start items-start gap-x-4 gap-y-2'}>
                <div className={'flex flex-col items-start gap-y-4'}>
                    {props.children}
                </div>
                <button
                    type={'submit'}
                    className={'flex flex-row justify-center items-center bg-gray06 text-white font-semibold rounded-md px-4 py-1.5'}>
                    {lang.search}
                </button>
            </div>

            {/* button group */}
            <div className={'flex flex-row'}>
                {props.actions ? props.actions : undefined}
            </div>
        </div>
    </form>;
}