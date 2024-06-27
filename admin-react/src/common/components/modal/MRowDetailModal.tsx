'use client';

import MDraggableFrame from '@/common/components/modal/MDraggableFrame';
import CCardItemText from '@/common/components/card/CCardItemText';

export default function MRowDetailModal(props: {
    item: any
    setItem: (value: any) => void
    onClosed?: Function
}) {
    return (
        <MDraggableFrame show={!!props.item} setShow={props.setItem} title={'Row Data'}>
            <div className={'flex flex-col max-h-[600px] overflow-y-scroll'}>
                {
                    props.item && Object.keys(props.item).map((i, index) => {
                        return <div key={`${JSON.stringify(props.item[i])}_${index}`}>
                            <CCardItemText title={i} text={`${props.item[i]}`} border={Object.keys(props.item).length > index} />
                        </div>;
                    })
                }
            </div>
        </MDraggableFrame>
    );
}