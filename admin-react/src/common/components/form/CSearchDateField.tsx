'use client';

import React, { useState } from 'react';
import MCalendarModal from '@/common/components/modal/MCalendarModal';
import { useLanguageStore } from '@/common/states/locale';
import { DateUtil } from '@/common/utils/DateUtil';

interface IDateField {
    id: string;
    label?: string;
    placeholder?: string;
    hint?: string;
    title?: string;
    firstDate?: Date;
    setFirstDate: (value?: Date) => void;
    secondDate?: Date;
    setSecondDate: (value?: Date) => void;
    width?: number;
    maxWidth?: boolean;
    className?: string;
}

export default function CSearchDateField(props: IDateField) {
    const lang = useLanguageStore().langSet;
    const locale = useLanguageStore().language;

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    return <>
        <MCalendarModal show={show} setShow={setShow} onYesClicked={(value: any) => {
            if (props.setFirstDate) {
                props.setFirstDate(value);
                setShow2(true);
            }
        }} />
        <MCalendarModal show={show2} setShow={setShow2} onYesClicked={(value: any) => {
            if (props.setSecondDate) props.setSecondDate(value);
        }} />
        <div className={`${props.className}`}>
            {props.label ? <label htmlFor='text' className='block text-sm font-medium leading-6 text-gray-900'>
                {props.label}
            </label> : <></>}
            <div>
                <div className={'flex flex-wrap items-center gap-x-2 gap-y-2'}>
                    <div className={'font-semibold text-gray06 me-4'}>{props.title ?? ''}</div>
                    <div className={'px-2 py-1 min-w-44 h-8 bg-white border rounded-lg text-center'}
                         onClick={(e) => {
                             e.preventDefault();
                             setShow(true);
                         }}>
                        {props.firstDate ? DateUtil.getFullDateTime(props.firstDate, locale) : '-'}
                    </div>
                    <div className={'px-2'}>{'~'}</div>
                    <div className={'px-2 py-1 min-w-44 h-8 bg-white border rounded-lg text-center'}
                         onClick={(e) => {
                             e.preventDefault();
                             setShow2(true);
                         }}>
                        {props.secondDate ? DateUtil.getFullDateTime(props.secondDate, locale) : '-'}
                    </div>
                </div>
            </div>
        </div>
    </>;
}