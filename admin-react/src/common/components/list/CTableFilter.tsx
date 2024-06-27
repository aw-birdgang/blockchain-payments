'use client';

import CDropdown, { IDropdown } from '@/common/components/form/CDropdown';
import CSearchField from '@/common/components/form/CSearchField';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * 공통 리스트의 필터 드롭다운 컴포넌트
 * 대량의 리스트 데이터를 서버에서 먼저 불러온 다음, 로컬에서 문자열 비교를 통해 일치하는 칼럼의 값을 보여줌
 *
 * @param props
 * @constructor
 */
export default function CTableFilter(props: {
    filter: string
    setFilter: Function
    searchHint?: string
    selectedFilterType?: IDropdown
    setSelectedFilterType?: Function
    dropdownList?: IDropdown[]
    onDatePicked?: Function
    onSecondDatePicked?: Function
    onSearch?: Function
}) {
    return <div className={'w-full flex flex-wrap justify-end items-center gap-x-2 gap-y-2'}>
        {
            props.dropdownList && props.selectedFilterType && props.setSelectedFilterType &&
            <CDropdown width={180}
                       value={props.selectedFilterType}
                       setValue={props.setSelectedFilterType}
                       list={props.dropdownList ?? []} />
        }
        <CSearchField
            id={'user-save-search'}
            width={240}
            value={props.filter} setValue={props.setFilter}
            onDatePicked={props.onDatePicked}
            onSecondDatePicked={props.onSecondDatePicked}
            placeholder={props.searchHint}
        />
    </div>;
}