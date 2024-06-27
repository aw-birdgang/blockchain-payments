'use client';

import React from 'react';

export default function CCustomListBoardItem(props: {
    date: string
    title: string
    onClick?: Function
    border?: boolean
    fullBorder?: boolean
}) {
    return <button
        key={`${JSON.stringify(props.date)}-${JSON.stringify(props.title)}`}
        className={'flex flex-row w-full justify-start items-center px-10 py-4'}
        onClick={() => {
            if (props.onClick) props.onClick();
        }}
    >
        <div className={'flex flex-1'}>
            <div className={'w-auto hover:text-primary hover:font-semibold'}>
                {props.title}
            </div>
        </div>
        <div className={'w-auto flex flex-none text-sm text-gray-400'}>{props.date}</div>
    </button>;
}