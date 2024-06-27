'use client';

import React from 'react';

interface IPageHeadingComponent {
    title: string;
    description?: string;
    firstButtonText?: string;
    firstButtonColor?: boolean;
    onFirstButtonClicked?: Function;
    secondButtonText?: string;
    secondButtonColor?: boolean;
    onSecondButtonClicked?: Function;
    className?: string;
}

export default function CCardHeading(props: IPageHeadingComponent) {
    return <div className={`w-full border rounded-xl border-gray30 bg-white px-6 ${props.className}`} style={{ userSelect: 'none' }}>
        <div className='-ml-4 flex flex-row flex-wrap items-center justify-between sm:flex-nowrap h-[104px]'>
            <div className='ml-4'>
                <h3 className='text-2xl font-bold text-gray-900 text-text'>{props.title}</h3>
                {props.description &&
                    <p className='text-base font-normal text-gray50 mt-1'>
                        {props.description}
                    </p>
                }
            </div>
            <div className='ml-4 flex flex-row items-center flex-shrink-0'>
                {props.firstButtonText ? <button
                    type='button'
                    className={props.firstButtonColor ?
                        'relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:text-white hover:bg-mainLight1' :
                        'relative inline-flex items-center rounded-md bg-white border border-gray30 px-3 py-2 text-sm font-semibold text-gray90'}
                    onClick={() => {
                        if (props.onFirstButtonClicked) props.onFirstButtonClicked();
                    }}
                >
                    {props.firstButtonText}
                </button> : <div></div>}
                {props.secondButtonText ? <button
                    type='button'
                    className={props.secondButtonColor ?
                        'relative inline-flex items-center rounded-md bg-primary ms-4 px-3 py-2 text-sm font-semibold text-white hover:text-white hover:bg-mainLight1' :
                        'relative inline-flex items-center rounded-md bg-white border border-gray30 ms-4 px-3 py-2 text-sm font-semibold text-gray90'}
                    onClick={() => {
                        if (props.onSecondButtonClicked) props.onSecondButtonClicked();
                    }}
                >
                    {props.secondButtonText}
                </button> : <div></div>}
            </div>
        </div>
    </div>;
}