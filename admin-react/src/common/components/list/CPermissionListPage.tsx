'use client';

import DataTable, {TableColumn} from "react-data-table-component";
import React, {useEffect} from "react";
import {StringUtil} from "@/common/utils/StringUtil";
import dynamic from "next/dynamic";

export interface IPermissionListPage {
	id: string
	title?: string
	description?: string
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
	searchHint?: string
	columns: TableColumn<any>[]
	expandableComponent?: React.ReactNode
}

export default function CPermissionListPage(props: IPermissionListPage) {
	useEffect(() => {

	}, [])

	return <div className={'flex flex-col items-end my-2'}>
		<DataTable
			progressPending={props.loading}
			progressComponent={<div></div>}
			columns={props.columns}
			data={props.list}
			striped                                         // 한 칸 마다 색깔 변경됨
			highlightOnHover                                // 마우스를 올렸을 때 색깔 변함
			pointerOnHover                                  // 마우스를 올렸을 때 커서가 클릭 가능으로 변함

			/** Pagination */
			paginationTotalRows={300}                                      // 서버에서 가져 온 총 아이템의 수
			paginationPerPage={300}
			paginationComponentOptions={{
				noRowsPerPage: true,     // 리스트 하단의 페이지별 행 갯수 설정 기능 사라짐
			}}
		/>
	</div>
}