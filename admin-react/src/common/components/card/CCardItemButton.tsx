'use client';

import React from 'react';
import CButton from '../form/CButton';
import { THEME_BUTTON } from '@/common/models/components';
import { useRouter } from 'next/navigation';

export default function CCardItemButton(props: {
    title?: string
    titleFont?: string
    description?: string
    actionHint?: string
    firstButtonText?: string
    firstButtonColor?: THEME_BUTTON
    firstButtonLink?: string
    onFirstButtonClicked?: Function
    secondButtonText?: string
    secondButtonColor?: THEME_BUTTON
    secondButtonLink?: string
    onSecondButtonClicked?: Function
    actionDescription?: string
    border?: boolean
    fullBorder?: boolean
    className?: string
}) {
    const router = useRouter();
    return <div className={`${props.className}`}>
        <div
            className={`flex flex-row justify-between ${props.description ? 'items-start ' : 'items-center '} 
		${props.border || props.border === undefined ? 'border-b border-gray30' : ''} ${props.fullBorder ? 'px-6' : 'mx-6'} py-6`}>
            <div className={`${props.firstButtonText || props.secondButtonText ? 'pe-6' : ''} flex-1`} style={{ userSelect: 'none' }}>
                {props.title ?
                    <div className={`${props.titleFont ?? `text-base font-bold text-text leading-6 text-gray90`}`}>{props.title}</div> :
                    <></>}
                {props.description ?
                    <div className={`text-sm font-normal text-gray50 ${props.title && props.description ? 'mt-1' : ''}`}>
                        {props.description.split('\n').map((line, index) => (
                            <span key={index}>
      				{line}
                                <br />
    				</span>
                        ))}
                    </div> :
                    <></>}
            </div>
            <div className={'flex flex-col justify-start items-end flex-none'}>
                <div>
                    {props.actionDescription ? <span className={'text-sm text-text me-4'} style={{ userSelect: 'none' }}>{props.actionDescription}</span> : <span></span>}
                    {props.firstButtonText ?
                        <CButton text={props.firstButtonText} color={props.firstButtonColor} onClick={() => {
                            if (props.firstButtonLink) router.push(props.firstButtonLink);
                            else if (props.onFirstButtonClicked) props.onFirstButtonClicked();
                        }} marginRight={!!(props.firstButtonText && props.secondButtonText)} /> :
                        <div></div>}
                    {props.secondButtonText ?
                        <CButton text={props.secondButtonText} color={props.secondButtonColor} onClick={() => {
                            if (props.secondButtonLink) router.push(props.secondButtonLink);
                            else if (props.onSecondButtonClicked) props.onSecondButtonClicked();
                        }} /> :
                        <div></div>}
                </div>
                {props.actionHint ? <div className={'text-sm text-red mt-1'} style={{ userSelect: 'none' }}>{props.actionHint}</div> : <span></span>}
            </div>
        </div>
    </div>;
}