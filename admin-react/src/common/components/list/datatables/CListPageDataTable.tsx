'use client';

import DataTable from 'react-data-table-component';
import React, { useState } from 'react';
import { IListPage } from '@/common/components/list/CListPage';
import CLoading from '@/common/components/etc/CLoading';
import { THEME_COLOR } from '@/common/theme/colors';
import MRowDetailModal from '@/common/components/modal/MRowDetailModal';
import { useLanguageStore } from '@/common/states/locale';

/**
 * React-Datatables 라이브러리 구현한 컴포넌트
 * @param props IListPage 객체
 * @constructor
 */
export default function CListPageDataTable(props: IListPage) {
    const lang = useLanguageStore().langSet;
    const [showPopup, setShowPopup] = useState<any>();

    const ExpandedComponent = props.expandableComponent ? props.expandableComponent : ({ data }: any) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    // filter 를 거쳐서 통과한 데이터만 출력하도록 처리
    const filter = props.filter ? props.filter.toLowerCase() : undefined;
    const filterType = props.filterType;
    const filteredItems =
        filter !== undefined ?
            filterType !== undefined ?
                props.list.filter((item: any) => {
                    if (filterType in item) {
                        try {
                            return (`${item[filterType]}`).toLowerCase().indexOf(filter.toLowerCase()) !== -1;
                        } catch (e) {
                            return true;
                        }
                    } else return false;
                }) :
                props.list.filter(item =>
                    JSON.stringify(item)
                        .toLowerCase()
                        .indexOf(filter.toLowerCase()) !== -1,
                ) :
            props.list;

    return <div className={'w-full overflow-x-scroll bg-white'}>
        <MRowDetailModal item={showPopup} setItem={setShowPopup} onClosed={() => {
            setShowPopup(undefined);
        }} />
        <CLoading loading={props.loading}>
            <DataTable
                progressPending={props.loading}
                progressComponent={<div></div>}
                columns={props.columnList}
                data={filteredItems}
                striped                                         // 한 칸 마다 색깔 변경됨
                highlightOnHover                                // 마우스를 올렸을 때 색깔 변함
                pointerOnHover                                  // 마우스를 올렸을 때 커서가 클릭 가능으로 변함

                /** Expandable */
                expandableRows={props.expandable}               // 각 row 를 펼칠 수 있는 하위 메뉴 추가
                expandableRowsComponent={ExpandedComponent}     // row 를 펼쳤을 때 보여지는 UI 컴포넌트

                /** Selectable */
                selectableRows={props.checkbox}                                 // 각 row 에 선택 가능한 체크박스 추가
                onSelectedRowsChange={(value: any) => {                         // row 를 선택하면 실행할 콜백 함수 (인자로 체크된 row 의 리스트 전달)
                    if (props.checkbox && props.onCheckboxSelected)
                        props.onCheckboxSelected(value);
                }}

                /** Pagination */

                pagination                                      // 페이지네이션 활성화
                paginationPerPage={props.pageSize}              // 한 페이지의 크기
                paginationRowsPerPageOptions={[10, 20, 50, 100]}    // 페이지 크기 설정 옵션에 들어갈 갯수 목록
                paginationComponentOptions={{
                    // noRowsPerPage: true,     // 리스트 하단의 페이지별 행 갯수 설정 기능 사라짐
                }}
                onRowClicked={(row: any, event) => {        // 리스트의 한 row 를 클릭했을 때 발생할 이벤트
                    if (props.onRowClicked) props.onRowClicked(row);
                    else setShowPopup(row);
                }}

                noDataComponent={<div className={'py-24'}>{lang.message_no_record}</div>}

                /** Style */
                customStyles={{
                    rows: {
                        style: {
                            height: '30px',
                            minHeight: '30px',
                        },
                    },
                    headRow: {
                        style: {
                            backgroundColor: THEME_COLOR.gray06,
                            color: THEME_COLOR.white,
                            fontWeight: 600,
                            fontSize: '12px',
                            height: '36px',
                            minHeight: '36px',
                            marginBottom: '1px',
                        },
                    },
                }}
            />
        </CLoading>
    </div>;
}