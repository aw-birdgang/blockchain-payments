'use client';

import React from 'react';
import CClickableText from '@/common/components/etc/CClickableText';

export default function CCardItemText(props: {
    title: string
    titleFont?: string
    description?: string
    text?: string
    textFont?: string
    className?: string
    onClick?: Function
    border?: boolean
    fullBorder?: boolean
    alignTop?: boolean
    unit?: string
    between?: boolean
}) {
    return <div className={`w-full ${!props.fullBorder ? 'px-6' : ''}`}>
        <div
            className={`flex flex-row ${props.between === undefined || props.between === true ? 'justify-between' : 'justify-start'} ${props.alignTop ? 'items-start' : 'items-center'} ${props.border || props.border === undefined ? 'border-b border-gray30' : ''} ${props.fullBorder ? 'px-6' : ''} py-6 ${props.className}`}>
            <div className={`${props.between === undefined || props.between === true ? 'flex-1' : 'w-[200px]'} flex flex-col ${props.text ? 'pe-6' : ''}`} style={{ userSelect: 'none' }}>
                {props.title ?
                    <div className={`${props.titleFont ?? 'text-text text-base font-semibold text-gray90'}`}>{props.title}</div> :
                    <div></div>}
                {props.description ?
                    <div className={`text-sm font-normal text-gray50 ${props.title && props.description ? 'mt-1' : ''}`}>
                        {props.description.split('\n').map((line, index) => (
                            <span key={index}>
      				{line}<br />
    				</span>
                        ))}
                    </div> :
                    <div></div>}
            </div>
            <div className={'flex-none flex flex-row justify-end text-sm'}>
                {props.text ? <div
                    className={`relative inline-flex text-end items-center rounded-md px-3`}>
                    {
                        props.onClick ?
                            <CClickableText text={props.text} onClick={() => {
                                if (props.onClick) props.onClick();
                            }} /> :
                            <div className={`${props.textFont ?? 'font-semibold text-gray90'}`} style={{ whiteSpace: 'pre-line' }}>{props.text}</div>
                    }
                </div> : <div></div>}
                <div className={'flex flex-none text-gray50 text-sm'}>
                    {props.unit ? props.unit : undefined}
                </div>
            </div>
        </div>
    </div>;
}