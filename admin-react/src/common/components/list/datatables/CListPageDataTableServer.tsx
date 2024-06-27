'use client';

import DataTable from "react-data-table-component";
import React from "react";
import {IListPage} from "@/common/components/list/CListPage";

export default function CListPageDataTable(props: IListPage) {
	const ExpandedComponent = props.expandableComponent ? props.expandableComponent : ({ data }: any) =>  <pre>{JSON.stringify(data, null, 2)}</pre>;

	return <DataTable
		progressPending={props.loading}
		progressComponent={<div></div>}
		columns={props.columnList}
		data={props.list}
		striped                                         // 한 칸 마다 색깔 변경됨
		highlightOnHover                                // 마우스를 올렸을 때 색깔 변함
		pointerOnHover                                  // 마우스를 올렸을 때 커서가 클릭 가능으로 변함

		/** Expandable */
		expandableRows={props.expandable}                                  // 각 row 를 펼칠 수 있는 하위 메뉴 추가
		expandableRowsComponent={ExpandedComponent}     // row 를 펼쳤을 때 보여지는 UI 컴포넌트

		/**  Selectable */
		selectableRows={props.checkbox}                                 // 각 row 에 선택 가능한 체크박스 추가
		onSelectedRowsChange={(value: any) => {                         // row 를 선택하면 실행할 콜백 함수 (인자로 체크된 row 의 리스트 전달)
			if(props.checkbox && props.onCheckboxSelected)
				props.onCheckboxSelected(value)
		}}

		/** Pagination */
		pagination
		paginationServer                                                            // 서버에서 페이지네이션 처리 (API 호출 단계에서 페이지 정해서 가져오는 방식)
		onChangePage={async (page: number, totalRows: number) =>        // 페이지를 변경했을 때 콜백 이벤트
		{if(props.fetchData) await props.fetchData(props.pageSize, page)}}
		onChangeRowsPerPage={async (size: number, page: number) =>    // 페이지당 행 수를 변경했을 때 콜백 이벤트
		{if(props.fetchData) await props.fetchData(size, page)}}
		paginationTotalRows={props.totalCount}                                      // 서버에서 가져 온 총 아이템의 수
		paginationPerPage={props.pageSize}
		// paginationRowsPerPageOptions={[10, 20, 50, 100]}
		paginationComponentOptions={{
			noRowsPerPage: true,     // 리스트 하단의 페이지별 행 갯수 설정 기능 사라짐
		}}
		onRowClicked={(row: any, event) => {
			// alert(JSON.stringify(row))
		}}
	/>
}