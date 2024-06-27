'use client';

import 'react-calendar/dist/Calendar.css';
import MDraggableFrame from '@/common/components/modal/MDraggableFrame';
import { useLanguageStore } from '@/common/states/locale';

export default function MTicketReceiptModal(props: {
    title?: string
    show: boolean
    setShow: (value: boolean) => void
    onYesClicked: Function
    onNoClicked?: Function
}) {
    const lang = useLanguageStore().langSet;
    return (
        <MDraggableFrame title={'Ticket Popup'} show={props.show} setShow={props.setShow}>
            <div className={'flex flex-col w-full items-center py-10'}>
                <div className={'border rounded-xl px-10 py-8'}>
                    <div className={'text-lg font-semibold mb-6'}>Purchase Receipt</div>
                    <div className={'flex flex-row justify-between'}>
                        <div className={'flex flex-col'}>
                            <div className={'font-semibold'}>Lanka Point</div>
                            <div className={''}>2023-07-10 17:50:01</div>
                        </div>
                        <div className={''}>Head Office</div>
                    </div>
                </div>
            </div>
        </MDraggableFrame>
    );
}