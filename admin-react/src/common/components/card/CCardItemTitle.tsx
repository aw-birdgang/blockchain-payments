'use client';

import React from 'react';

export default function CCardItemTitle(props: {
    title?: string
    titleFont?: string
    description?: string
    textFont?: string
    border?: boolean
    action?: React.ReactNode
    fullBorder?: boolean
    alignTop?: boolean
}) {
    return <div className={`w-full ${!props.fullBorder ? 'px-6' : ''}`}>
        <div className={`flex flex-row justify-between ${props.alignTop ? 'items-start' : 'items-center'} ${props.border || props.border === undefined ? 'border-b border-gray30' : ''} ${props.fullBorder ? 'px-6' : ''} py-6`}>
            <div className={`flex flex-col flex-1 ${props.action ? 'pe-6' : ''}`} style={{ userSelect: 'none' }}>
                {props.title ?
                    <div className={`${props.titleFont ?? 'text-text text-base font-semibold'}`}>{props.title}</div> :
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
            <div className={'flex-1 flex flex-row justify-end'}>
                {props.action ? <div
                    className={`relative inline-flex text-end items-center rounded-md px-3`}>
                    {props.action}
                </div> : <div></div>}
            </div>
        </div>
    </div>;
}