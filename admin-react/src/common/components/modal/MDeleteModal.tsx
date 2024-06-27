'use client';

import WarnSvg from '../../assets/icons/warn.svg';
import Image from 'next/image';
import CButton from '@/common/components/form/CButton';
import { THEME_BUTTON } from '@/common/models/components';
import MDraggableFrame from '@/common/components/modal/MDraggableFrame';
import { useLanguageStore } from '@/common/states/locale';

export default function MDeleteModal(props: {
    title?: string
    item: any
    setItem: (value: any) => void
    onYesClicked: Function
    onNoClicked?: Function
}) {
    const lang = useLanguageStore().langSet;
    return (
        <MDraggableFrame show={props.item} setShow={props.setItem}>
            <div className={'flex flex-col w-full items-center'}>
                <Image
                    className={'my-4'}
                    src={WarnSvg}
                    alt={'warning'}
                    width={40} height={40}
                />
                <div className={'text-center text-2xl text-gray90 font-bold mb-4'}>{lang.warning}</div>
                <div className={'text-center mb-4'} style={{ whiteSpace: 'pre-line' }}>{`${props.title ?? lang.message_confirm_delete}`}</div>
                <div className={'flex w-full gap-x-4 p-4'}>
                    <CButton className={'flex flex-1 flex-row justify-center text-center'} text={lang.cancel} onClick={() => {
                        if (props.onNoClicked) props.onNoClicked();
                        props.setItem(null);
                    }} color={THEME_BUTTON.white} />
                    <CButton className={'flex flex-1 flex-row justify-center text-center'} text={lang.delete} onClick={() => {
                        if (props.onYesClicked) props.onYesClicked(props.item);
                        props.setItem(null);
                    }} color={THEME_BUTTON.warning} />
                </div>
            </div>
        </MDraggableFrame>
    );
}