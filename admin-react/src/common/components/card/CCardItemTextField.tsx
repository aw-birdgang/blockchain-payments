'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CTextField from '@/common/components/form/CTextField';
import CSearchField from '@/common/components/form/CSearchField';
import { SIZE_DEFAULT_TEXT_FIELD_WIDTH } from '@/common/constants/values';

export interface ITextField {
    title?: string;
    titleFont?: string;
    description?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    id: string;
    placeholder?: string;
    hint?: string;
    value: string;
    setValue?: Function;
    width?: number;
    validCheck?: (text: string) => boolean;
    maxLength?: number;
    fullWidth?: boolean;
    textDescription?: string;
    invalidMessage?: string;
    singleLine?: boolean;
    searchUrl?: string;
    unit?: string;
    onSearch?: Function;
    onClick?: Function;
    border?: boolean;
    fullBorder?: boolean;
    disabled?: boolean;
    className?: string;
    frontLabel?: string;
    frontLabelWidth?: number;
    label?: string;
    rows?: number;
}

export default function CCardItemTextField(props: ITextField) {
    const router = useRouter();
    const [isValid, setIsValid] = useState(true);
    const singleLine = props.singleLine === undefined ? true : props.singleLine;

    useEffect(() => {
        if (props.validCheck) {
            setIsValid(props.validCheck(props.value));
        }
    }, [props.value]);

    function onSubmit(e: any) {
        e.preventDefault();
        if (props.searchUrl) {
            router.push(`${props.searchUrl}${props.value}`);
            return;
        }
        alert(props.value);
        if (props.onSearch) props.onSearch(props.value);
    }

    return <form
        className={`flex flex-row justify-between 
		${singleLine ? 'items-center' : 'items-start'} 
		${props.border || props.border === undefined ? 'border-b border-gray30' : ''} 
		${props.fullBorder ? 'px-6' : 'mx-6'} py-5`}
        onSubmit={onSubmit}
    >
        <div className={`pe-6 flex-none`} style={{ userSelect: 'none' }}>
            {props.title ?
                <div className={`${props.titleFont ?? 'text-text text-base font-semibold text-gray90'}`}>{props.title}</div> :
                undefined}
            {props.description ?
                <div className={`text-sm font-normal text-gray50 ${props.title && props.description ? 'mt-1' : ''}`}>
                    {props.description.split('\n').map((line, index) => (
                        <span key={index}>
      				{line}
                            <br />
    				</span>
                    ))}
                </div> :
                <div></div>}
        </div>
        <div className={'flex flex-col flex-1 justify-start items-end'}>
            <div className={`flex flex-row items-center gap-x-2`}>
                <div className={'flex flex-1'}>
                    {
                        props.onSearch || props.searchUrl ?
                            <CSearchField
                                {...props}
                            /> :
                            <CTextField
                                {...props}
                            />
                    }
                </div>
                <div className={`flex flex-row flex-none justify-center text-sm font-semibold ${props.unit ? 'min-w-[50px]' : ''}`}>
                    {props.unit ? props.unit : undefined}
                </div>
            </div>
            <div className={'flex flex-row justify-end'} style={{ userSelect: 'none' }}>
                {props.invalidMessage && isValid === false ?
                    <p className='mt-1 text-sm text-red' id='email-description'>{props.invalidMessage}</p> :
                    props.textDescription ?
                        <p className='mt-1 text-sm text-gray-500' id='email-description'>{props.textDescription}</p> :
                        <div></div>}
            </div>
        </div>
    </form>;
}