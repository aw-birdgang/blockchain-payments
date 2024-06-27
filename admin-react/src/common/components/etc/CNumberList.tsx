import { useState } from 'react';
import MNumberSelector from '@/common/components/modal/MNumberSelector';

export default function CNumberList(props: {
    customKey: string
    list: number[]
    setList?: Function
    size?: 'sm' | 'md' | 'lg'
    isBonus?: boolean
    bonus?: number
    onSelected?: Function
    onOpened?: Function
    onClosed?: Function
}) {
    const [show, setShow] = useState(false);

    const newList = [];
    for (let i = 0; i < 5; i++) {
        try {
            newList.push(props.list[i]);
        } catch (e) {
            newList.push(0);
        }
    }
    const bonus = props.bonus === undefined || props.bonus === 0 ? '-' : props.bonus.toString();
    return <>
        <MNumberSelector
            show={show} setShow={setShow} bonus={props.isBonus}
            onSelected={(list: number[]) => {
                if (props.onSelected) props.onSelected(list);
            }}
            onClosed={() => {
                if (props.onClosed) props.onClosed();
            }}
        />
        <div
            className={`flex flex-row items-center gap-x-1 ${props.onSelected ? 'cursor-pointer' : ''}`}
            onClick={() => {
                if (props.onSelected) {
                    if (props.onOpened) props.onOpened();
                    setShow(true);
                }
            }}
        >
            {newList.map((item, index) => {
                const number = item === undefined || item === 0 ? '-' : item.toString();
                return <div
                    key={`${props.customKey}-number-list-${item}-${index}`}
                    className={`flex flex-row justify-center items-center rounded-full border-2 border-main/70 ${props.size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}>
                    <div className={'text-text font-bold'}>{number}</div>
                </div>;
            })}
            {
                props.bonus !== undefined && props.bonus !== 0 ? <div className={'flex flex-row justify-start items-center'}>
                    <div className={'me-1'}>+</div>
                    <div className={`flex flex-row justify-center items-center rounded-full border-2 border-yellow ${props.size === 'sm' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}>
                        <div className={'text-text text-sm font-bold'}>{bonus}</div>
                    </div>
                </div> : undefined
            }
        </div>
    </>;
}