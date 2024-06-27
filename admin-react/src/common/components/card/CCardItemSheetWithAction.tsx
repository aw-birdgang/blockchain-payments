'use client';

import React from 'react';

export default function CCardItemSheetWithAction(props: {
    dataList: string[]
    head?: boolean
    onClick?: Function
    border?: boolean
    fullBorder?: boolean
    action?: React.ReactNode
    secondAction?: React.ReactNode
    thirdAction?: React.ReactNode
}) {
    return <div
        key={JSON.stringify(props.dataList)}
        className={`flex flex-row justify-between items-center 
			${props.border || props.border === undefined ? 'border-b border-gray30 ' : ''} 
			${props.fullBorder ? 'px-6' : 'mx-6'} py-6 ${props.onClick ? 'cursor-pointer ' : ''}
			${props.head ? 'border-b-2 border-main ' : ''}
			${props.onClick ? 'cursor-pointer ' : ''}
			`}
        onClick={() => {
            if (props.onClick) props.onClick();
        }}>
        {props.dataList.map((data) => {
            return <div
                key={data}
                className={`flex-1 flex flex-row justify-center items-start text-center text-sm ${props.head ? 'text-text' : 'text-gray50'}`}
                style={{ whiteSpace: 'pre-line' }}>
                {data}
            </div>;
        })}
        {props.action ?
            <div className={'flex-1  flex flex-row justify-center items-center'}>{props.action}</div> : <></>}
        {props.secondAction ?
            <div className={'flex-1  flex flex-row justify-center items-center'}>{props.secondAction}</div> : <></>}
        {props.thirdAction ?
            <div className={'flex-1  flex flex-row justify-center items-center'}>{props.thirdAction}</div> : <></>}
    </div>;
}