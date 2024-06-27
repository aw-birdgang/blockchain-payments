'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SearchSvg from '@/common/assets/icons/search.svg';
import CalendarSvg from '@/common/assets/icons/calendar.svg';
import MCalendarModal from '@/common/components/modal/MCalendarModal';
import { useLanguageStore } from '@/common/states/locale';

interface IDateField {
    id: string;
    label?: string;
    placeholder?: string;
    hint?: string;
    value: string;
    setValue: Function;
    onDateSelected: Function;
    onSecondDateSelected?: Function;
    width?: number;
    maxWidth?: boolean;
    className?: string;
}

export default function CDateField(props: IDateField) {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const lang = useLanguageStore().langSet;

    return <>
        <MCalendarModal show={show} setShow={setShow} onYesClicked={(value: any) => {
            if (props.onDateSelected) {
                props.onDateSelected(value);
                if (props.onSecondDateSelected) setShow2(true);
            }
        }} />
        <MCalendarModal show={show2} setShow={setShow2} onYesClicked={(value: any) => {
            if (props.onSecondDateSelected) props.onSecondDateSelected(value);
        }} />
        <div className={`${props.className}`}>
            {props.label ? <label htmlFor='text' className='block text-sm font-medium leading-6 text-gray-900'>
                {props.label}
            </label> : <></>}
            <div
                className={'relative'}
                style={{ width: `${props.width ? `${props.width}px` : null}` }}>
                <input
                    name={props.id}
                    id={props.id}
                    type={'text'}
                    className={'block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'}
                    placeholder={props.placeholder ?? lang.message_enter_value}
                    value={props.value}
                    onChange={(e) => {
                        e.preventDefault();
                        if (props.setValue) props.setValue(e.target.value);
                    }}
                    disabled
                />
                {
                    <div
                        className={'cursor-pointer'}
                        onClick={() => setShow(true)}
                    >
                        <Image
                            className={'absolute right-3 top-2.5'}
                            src={CalendarSvg}
                            alt={'calendar'}
                            width={16} height={16}
                        />
                    </div>
                }
            </div>
        </div>
    </>;
}