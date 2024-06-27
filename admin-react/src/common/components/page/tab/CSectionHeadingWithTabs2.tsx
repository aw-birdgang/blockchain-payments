'use client';

import React from 'react';

// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

interface ITabItem {
    key: string;
    name: string;
}

export default function CSectionHeadingWithTabs2(props: {
    selected: ITabItem
    setSelected: Function
    itemList: ITabItem[]
    onClick: Function
}) {
    return (
        <div className='w-full'>
            <nav className='flex space-x-4' aria-label='Tabs'>
                {props.itemList.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => {
                            props.setSelected(item);
                        }}
                        className={classNames(
                            // @ts-ignore
                            item.key === props.selected.key ? 'bg-gray06 text-white' : 'bg-gray02 text-white hover:text-gray03',
                            'flex-1 rounded-md px-3 py-2 text-sm font-bold',
                        )}>
                        {item.name}
                    </button>
                ))}
            </nav>
        </div>
    );
}