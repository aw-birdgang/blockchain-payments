'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { TableColumn } from 'react-data-table-component';
import { ITableColumn } from '@/common/models/interfaces';
import { IDropdown } from '@/common/components/form/CDropdown';
import { convertFilterListToDropdown } from '@/common/utils/utils';
import CTableFilter from '@/common/components/list/CTableFilter';

// data-tables 라이브러리는 client-side 에서 렌더링되기 때문에 nextjs 의 dynamic 을 이용해서 lazy loading
const DynamicList = dynamic(() => import('./datatables/CListPageDataTable'), { ssr: false });

// 리스트 컴포넌트의 인자 인터페이스
export interface IListPage {
    id: string;
    url: string;
    loading: boolean;
    setLoading: Function;
    list: any[];
    setList: Function;
    totalCount: number;
    setTotalCount: Function;
    pageSize: number;
    setPageSize: Function;
    page: number;
    setPage: Function;
    onDatePicked?: Function;
    onSecondDatePicked?: Function;
    searchHint?: string;
    checkbox?: boolean;
    onCheckboxSelected?: Function;
    onRowClicked?: Function;
    columnList: TableColumn<any>[];
    filterList: ITableColumn[];
    expandable?: boolean;
    expandableComponent?: any;

    // do not assign value directly
    filter?: string;
    filterType?: string;
    fetchData?: Function;
}

/**
 * 공통 리스트 컴포넌트 (React-datatables 이용)
 * 필터 UI 도 포함되어 있음
 * @param props
 * @constructor
 */
export default function CListPage(props: IListPage) {
    const [filter, setFilter] = useState('');
    const filterDropdownList: IDropdown[] = convertFilterListToDropdown(props.filterList);
    const [selectedFilterTypeDropdown, setSelectedFilterTypeDropdown] = useState<IDropdown>(filterDropdownList[0]);

    // 서버 페이징 방식 용도
    // async function fetchData(size: number, page: number) {
    // 	props.setLoading(true);
    // 	try {
    // 		const params: any = {size, page}
    // 		const url = StringUtil.appendQueryParams(`${props.url}`, params)
    // 		const response = await(await fetch(url)).json();
    // 		if(response && response.data && response.data.list && response.data.pagingInfo) {
    // 			props.setTotalCount(response.data.pagingInfo.totalCount);
    // 			props.setPage(page);
    // 			props.setPageSize(size);
    // 			props.setList(response.data.list);
    // 		}
    // 	} catch(e) {
    //
    // 	} finally {
    // 		props.setLoading(false);
    // 	}
    // }
    //
    // useEffect(() => {
    // 	fetchData(props.pageSize, props.page);
    // }, [])

    return <div className={'w-full flex flex-col items-end my-2 gap-y-2'}>
        <CTableFilter
            filter={filter} setFilter={setFilter}
            selectedFilterType={selectedFilterTypeDropdown} setSelectedFilterType={setSelectedFilterTypeDropdown}
            dropdownList={filterDropdownList}
        />
        <DynamicList {...props} filter={filter} filterType={selectedFilterTypeDropdown?.id} />
    </div>;
}