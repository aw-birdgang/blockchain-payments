'use client';

import React from 'react';

// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export interface ITabItem {
    key: string;
    name: string;
}

export default function CSectionHeadingWithTabs(props: {
    selected: ITabItem
    setSelected: Function
    itemList: ITabItem[]
    onClick: Function
}) {
    // @ts-ignore
    return <div className='w-full'>
        <nav className='flex border-b border-gray30' aria-label='Tabs'>
            {props.itemList.map((item) => (
                <button
                    key={item.name}
                    onClick={() => {
                        props.setSelected(item);
                    }}
                    className={classNames(
                        item.key === props.selected.key
                            ? 'border-primary text-text'
                            : 'border-transparent text-gray50 hover:border-gray30 hover:text-gray50',
                        'flex-1 whitespace-nowrap border-b-2 pb-4 font-semibold',
                    )}>
                    {item.name}
                </button>
            ))}
        </nav>
    </div>;
}