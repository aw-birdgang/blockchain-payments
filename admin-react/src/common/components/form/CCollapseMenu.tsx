'use client';

import React from 'react';

export interface ISelectData {
    key: string;
    name: string;
}

export default function CCollapseMenu(props: {
    title: string
    dataList: ISelectData[]
    selectedDataList: ISelectData[]
    setSelectedDataList: Function
}) {
    // @ts-ignore
    return <div className='w-full'>
        <details className={'group rounded-md border border-gray-200 px-4'}>
            <summary className={'flex flex-row justify-between cursor-pointer py-4'}>
                <div>{props.title}</div>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4 mt-1 transition group-open:rotate-180'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                </svg>
            </summary>
            <div className={'flex flex-wrap gap-2 text-text font-semibold'}>
                {props.dataList.map((item) => {
                    const inList = props.selectedDataList.find((data) => data.key === item.key);
                    return (
                        <div
                            key={item.key}
                            className={`${inList ?
                                'px-4 py-2 mb-2 bg-mainLight1 rounded-lg cursor-pointer' :
                                'px-4 py-2 mb-2 bg-mainLight0 text-gray50 rounded-lg cursor-pointer'}`}
                            onClick={() => {
                                if (inList) {
                                    const newSelectedDataList = props.selectedDataList.filter((data) => data.key !== item.key);
                                    props.setSelectedDataList(newSelectedDataList);
                                } else {
                                    props.setSelectedDataList([...props.selectedDataList, item]);
                                }
                            }}
                        >
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </details>
    </div>;
}