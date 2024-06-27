'use client';

import React, {useEffect} from "react";
import {StringUtil} from "@/common/utils/StringUtil";
import CCardContainer from "@/common/components/card/CCardContainer";
import CCardItemText from "@/common/components/card/CCardItemText";
import {TableColumn} from "react-data-table-component";
import CCardItemAction from "@/common/components/card/CCardItemAction";
import CTableFilter from "@/common/components/list/CTableFilter";

export interface IListPage {
	id: string
	title?: string
	description?: string
	action?: React.ReactNode
	url: string
	loading: boolean
	setLoading: Function
	list: any[]
	setList: Function
	totalCount: number
	setTotalCount: Function
	pageSize: number
	setPageSize: Function
	page: number
	setPage: Function
	search?: string
	setSearch?: Function
	onDatePicked?: Function
	onSecondDatePicked?: Function
	searchHint?: string
	fetchData?: Function
	checkbox?: boolean
	onCheckboxSelected?: Function
	columns: TableColumn<any>[]
	expandable?: boolean
	expandableComponent?: any
}

export default function CListPageOld(props: IListPage) {

	useEffect(() => {
		fetchData(props.pageSize, props.page);
	}, [])

	async function fetchData(size: number, page: number, search?: string) {
		props.setLoading(true);
		try {
			const params: any = {size, page}
			if(search) params.search = search;
			const url = StringUtil.appendQueryParams(`${props.url}`, params)
			const response = await(await fetch(url)).json();
			if(response && response.data && response.data.list && response.data.pagingInfo) {
				props.setTotalCount(response.data.pagingInfo.totalCount);
				props.setPage(page);
				props.setPageSize(size);
				props.setList(response.data.list);
			}
		} catch(e) {

		} finally {
			props.setLoading(false);
		}
	}

	return <div className={'flex flex-col items-end my-2'}>
		{props.search !== undefined && props.setSearch !== undefined ?
			<CTableFilter filter={props.search!} setFilter={props.setSearch!}
			              searchHint={props.searchHint}
			              onDatePicked={props.onDatePicked}
			              onSecondDatePicked={props.onSecondDatePicked}
			              onSearch={(search: string) => {
				             fetchData(props.pageSize, props.page, search)
			             }}/> : undefined}
		<CCardContainer
			id={props.id} className={'mb-6'}>
			{
				props.title && props.action ?
					<CCardItemAction title={props.title ?? ''} description={props.description ?? ''}
					                 fullBorder={true}>
						{props.action}
					</CCardItemAction> :
					props.title ?
						<CCardItemText title={props.title ?? ''} description={props.description ?? ''} fullBorder={true}/> :
						undefined
			}
			<div className={'pb-4'}>
				{/*<DynamicList {...props} fetchData={fetchData}/>*/}
			</div>
		</CCardContainer>
	</div>
}