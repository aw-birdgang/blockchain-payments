'use client';

import CDropdown, { IDropdown } from '@/common/components/form/CDropdown';
import CSearchField from '@/common/components/form/CSearchField';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CButton from '@/common/components/form/CButton';

export default function CListSearch(props: {
    search: string
    setSearch: Function
    searchHint?: string
    selectedDropdown?: IDropdown
    setSelectedDropdown?: Function
    dropdownList?: IDropdown[]
    onDatePicked?: Function
    onSecondDatePicked?: Function
    onSearch?: Function
    actions?: React.ReactNode
}) {
    const router = useRouter();
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    return <div className={'flex flex-row justify-between w-full bg-mainLight1 transition-all duration-500 ease-out border border-gray30 p-4 mb-8'}>
        <div className={'flex flex-row justify-start items-center gap-x-2'}>
            <div className={'text-text font-semibold text-base pe-4'}>Search</div>
            <div className={''}>
                {
                    props.dropdownList && props.selectedDropdown && props.setSelectedDropdown &&
                    <CDropdown width={120}
                               value={props.selectedDropdown}
                               setValue={props.setSelectedDropdown}
                               list={props.dropdownList ?? []} />
                }
            </div>
            <CSearchField
                id={'user-Save-search'}
                width={320}
                value={props.search} setValue={props.setSearch}
                onDatePicked={props.onDatePicked}
                onSecondDatePicked={props.onSecondDatePicked}
                placeholder={props.searchHint}
                onSearched={(value: string) => {
                    if (props.onSearch) props.onSearch(value);
                    else if (props.search.length > 0) {
                        router.push(`${currentUrl}?search=${props.search}`);
                    } else if (props.search.length === 0) {
                        router.push(currentUrl);
                    }
                }}
            />
        </div>

        {/* button group */}
        <div className={'flex flex-row'}>
            {props.actions ? props.actions : undefined}
        </div>
    </div>;
}