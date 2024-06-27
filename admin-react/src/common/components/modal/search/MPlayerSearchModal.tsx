'use client';

import { useState } from 'react';
import CButton from '@/common/components/form/CButton';
import MDraggableFrame from '@/common/components/modal/MDraggableFrame';
import CListPage from '@/common/components/list/CListPage';
import { VALUE_LIST_DEFAULT_SIZE } from '@/common/constants/values';

export default function MPlayerSearchModal(props: {
    title?: string
    show: boolean
    setShow: (value: boolean) => void
    onPlayerSelected?: Function
    onClosed?: Function
}) {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(VALUE_LIST_DEFAULT_SIZE);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [newShow, setNewShow] = useState(false);
    return (
        <div>
            <MDraggableFrame show={props.show} setShow={props.setShow}>
                <div className={'flex flex-col'}>
                    {/* 리스트 */}
                    <button onClick={() => {
                        setNewShow(true);
                    }}>pop
                    </button>
                    <CListPage
                        id={'search_player_modal'}
                        url={''}
                        loading={loading} setLoading={setLoading}
                        list={list} setList={setList}
                        totalCount={totalCount} setTotalCount={setTotalCount}
                        pageSize={pageSize} setPageSize={setPageSize}
                        page={page} setPage={setPage}
                        filter={search}
                        filterList={[]}
                        columnList={[
                            {
                                name: 'ID',
                                selector: (row: any) => 'player@srilotto.com',
                                sortable: true,
                            },
                            {
                                name: 'Account Creation Date',
                                selector: (row: any) => '2023.08.30  15:00:00',
                                sortable: true,
                            },
                            {
                                name: 'KYC',
                                selector: (row: any) => 'O',
                                sortable: true,
                            },
                            {
                                name: 'Status',
                                selector: (row: any) => 'Enabled',
                                sortable: true,
                            },
                            {
                                name: 'Select',
                                cell: (row: any) => <CButton text={'Select'} onClick={() => {
                                    if (props.onPlayerSelected) {
                                        props.onPlayerSelected(row);
                                    }
                                    props.setShow(false);
                                }} />,
                                sortable: true,
                            },
                        ]}
                    />
                </div>
            </MDraggableFrame>
            <MDraggableFrame show={newShow} setShow={setNewShow}>
                <div className={'p-8 flex flex-col justify-center items-center'}>hahahaha</div>
            </MDraggableFrame>
        </div>
    );
}