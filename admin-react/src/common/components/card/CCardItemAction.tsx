'use client';

import React from 'react';

export default function CCardItemAction(props: {
    title?: string
    titleFont?: string
    description?: string
    type?: 'horizontal' | 'vertical'
    className?: string
    border?: boolean
    fullBorder?: boolean
    alignTop?: boolean
    children: React.ReactNode
}) {
    return <div
        className={` 
			${props.type && props.type === 'vertical' ?
            'flex flex-col justify-start items-start ' :
            props.alignTop ?
                'flex flex-row justify-between items-start ' :
                'flex flex-row justify-between items-center '}
			${props.border || props.border === undefined ? 'border-b border-gray30' : ''} ${props.fullBorder ? 'px-6' : 'mx-6'} py-6 ${props.className}`}>
        <div className={`pe-6 flex-1`} style={{ userSelect: 'none' }}>
            {props.title ?
                <div className={`${props.titleFont ?? 'text-text text-base font-semibold text-gray90'}`}>{props.title}</div> :
                <div></div>}
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
        <div className={`flex-none flex flex-row justify-end ${props.type && props.type === 'vertical' ? 'mt-6' : ''}`}>
            {props.children}
        </div>
    </div>;
}