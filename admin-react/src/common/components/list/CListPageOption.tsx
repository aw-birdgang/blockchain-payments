'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faEye, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLanguageStore } from '@/common/states/locale';

export default function CListPageOption(props: {
    onView?: Function
    onEdit?: Function
    onDelete?: Function
    customTitle?: string
    customTitle2?: string
    onCustomOption?: Function
    onCustomOption2?: Function
}) {
    const lang = useLanguageStore().langSet;
    return <div>
        <div className={'flex flex-row justify-start gap-x-1 text-sm'}>
            {
                props.onView && <button
                    className={'flex flex-row w-[60px] justify-center items-center py-1 border bg-white hover:text-white hover:bg-gray06'}
                    onClick={() => {
                        if (props.onView) props.onView();
                    }}>
                    <FontAwesomeIcon icon={faEye} />
                    <div className={'ms-1 font-semibold'}>{'View'}</div>
                </button>
            }
            {
                props.onEdit && <button
                    className={'flex flex-row w-[60px] justify-center items-center py-1 border bg-white hover:text-white hover:bg-gray06'}
                    onClick={() => {
                        if (props.onEdit) props.onEdit();
                    }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <div className={'ms-1 font-semibold'}>{'Edit'}</div>
                </button>
            }
            {
                props.onDelete && <button
                    className={'flex flex-row w-[60px] justify-center items-center py-1 border bg-white hover:text-white hover:bg-gray06'}
                    onClick={() => {
                        if (props.onDelete) props.onDelete();
                    }}>
                    <FontAwesomeIcon icon={faTrash} />
                    <div className={'ms-1 font-semibold'}>{'Delete'}</div>
                </button>
            }
            {
                props.onCustomOption && <button
                    className={'flex flex-row w-fit justify-center items-center px-2 py-1 border bg-white hover:text-white hover:bg-gray06'}
                    onClick={() => {
                        if (props.onCustomOption) props.onCustomOption();
                    }}>
                    <FontAwesomeIcon icon={faCheck} />
                    <div className={'ms-1 font-semibold'}>{props.customTitle ?? lang.option}</div>
                </button>
            }
            {
                props.onCustomOption2 && <button
                    className={'flex flex-row w-fit justify-center items-center px-2 py-1 border bg-white hover:text-white hover:bg-gray06'}
                    onClick={() => {
                        if (props.onCustomOption2) props.onCustomOption2();
                    }}>
                    <FontAwesomeIcon icon={faCheck} />
                    <div className={'ms-1 font-semibold'}>{props.customTitle2 ?? lang.option}</div>
                </button>
            }
        </div>
    </div>;
}


