'use client';

import React, { useState } from 'react';
import { ITextField } from '@/common/components/card/CCardItemTextField';
import { useLanguageStore } from '@/common/states/locale';

export default function CTextField(props: ITextField) {
    const [isValid, setIsValid] = useState(true);
    const lang = useLanguageStore().langSet;

    const disabled = props.disabled === undefined ? false : props.disabled;

    return <div className={`${props.className}`}>
        {props.label ? <label htmlFor='text' className='block text-sm font-medium leading-6 text-gray-900'>
            {props.label}
        </label> : <></>}
        <div
            className={`flex flex-row justify-start items-center gap-x-4`}
            style={{ width: `${props.width ? `${props.width}px` : null}` }}>
            {props.frontLabel ? <div style={{ width: `${props.frontLabelWidth}px` }} className={'text-gray06 font-semibold'}>{props.frontLabel}</div> : undefined}
            {props.singleLine === undefined || props.singleLine ?
                <input
                    name={props.id}
                    id={props.id}
                    type={props.type ?? 'text'}
                    title={props.title ?? undefined}
                    className={`block w-full rounded-md border-0 px-2 h-8 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-main outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6 ${isValid ? 'focus:ring-main' : 'focus:ring-red'} ${props.onClick ? 'cursor-pointer' : ''}`}
                    placeholder={props.placeholder ?? lang.message_enter_value}
                    maxLength={props.maxLength}
                    value={props.value}
                    disabled={disabled}
                    onChange={(e) => {
                        e.preventDefault();
                        if (props.setValue) props.setValue(e.target.value);
                        if (props.validCheck) {
                            const valid = props.validCheck(e.target.value);
                            setIsValid(valid);
                        }
                    }}
                /> :
                <textarea
                    name={props.id}
                    id={props.id}
                    className={`block w-full rounded-md border-0 px-2 h-8 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-main outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6 ${isValid ? 'focus:ring-main' : 'focus:ring-red'} ${props.onClick ? 'cursor-pointer' : ''}`}
                    placeholder={props.placeholder ?? lang.message_enter_value}
                    maxLength={props.maxLength}
                    disabled={disabled}
                    value={props.value}
                    rows={props.rows}
                    onChange={(e) => {
                        e.preventDefault();
                        if (props.setValue) props.setValue(e.target.value);
                        if (props.validCheck) {
                            const valid = props.validCheck(e.target.value);
                            setIsValid(valid);
                        }
                    }}
                    style={{ resize: 'none' }}
                />
            }
        </div>
        {props.invalidMessage && !isValid ?
            <p className='mt-2 text-sm text-red' id='email-description'>{props.invalidMessage}</p> :
            props.hint ?
                <p className='mt-2 text-sm text-gray50' id='email-description'>{props.hint}</p> :
                <div></div>}
    </div>;
}