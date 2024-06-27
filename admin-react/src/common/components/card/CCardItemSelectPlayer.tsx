'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CSearchPlayerField from '@/common/components/form/CSearchPlayerField';

export default function CCardItemSelectPlayer(props: {
    title?: string
    titleFont?: string
    description?: string
    type?: 'text' | 'password' | 'email'
    id: string
    placeholder?: string
    hint?: string
    value: string
    setValue: Function
    validCheck?: (text: string) => boolean
    maxLength?: number
    fullWidth?: boolean
    textDescription?: string
    invalidMessage?: string
    singleLine?: boolean
    border?: boolean
    fullBorder?: boolean
}) {
    const router = useRouter();
    const [isValid, setIsValid] = useState(true);
    const singleLine = props.singleLine === undefined ? true : props.singleLine;

    function onSubmit(e: any) {
        e.preventDefault();
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
        <div className={'flex flex-row flex-1 justify-end'}>
            <CSearchPlayerField
                id={props.id}
                type={props.type}
                value={props.value} setValue={props.setValue}
                width={300}
                placeholder={props.placeholder}
                hint={props.hint}
                maxLength={props.maxLength}
            />
            <div className={'flex flex-row justify-end'} style={{ userSelect: 'none' }}>
                {props.invalidMessage && !isValid ?
                    <p className='mt-1 text-sm text-red' id='email-description'>{props.invalidMessage}</p> :
                    props.textDescription ?
                        <p className='mt-1 text-sm text-gray-500' id='email-description'>{props.textDescription}</p> :
                        <div></div>}
            </div>
        </div>
    </form>;
}