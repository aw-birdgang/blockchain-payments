'use client';

import { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import CUnderConstructionIcon from '@/common/components/etc/CUnderConstructionIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IMenuItem } from '@/common/models/interfaces';
import { library } from '@fortawesome/fontawesome-svg-core';
import { StringUtil } from '@/common/utils/StringUtil';
import { SIZE_MENU_HEIGHT } from '@/common/constants/values';

// fontawesome 아이콘 로딩
library.add(fas);

// 중복되는 키의 메뉴가 로딩됐을 경우 제거
function removeDuplicatesByKey<T>(arr: T[], key: keyof T): T[] {
    const seen = new Set();
    return arr.filter((item) => {
        const value = item[key];
        if (!seen.has(value)) {
            seen.add(value);
            return true;
        }
        return false;
    });
}

/**
 * 좌측 메뉴의 카테고리/페이지 레벨의 단일 아이템
 * @param props
 * @constructor
 */
export default function CMenuItem(props: {
    item: IMenuItem
    fold: boolean
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    // 메뉴가 중복으로 생성되는 현상 발생하여 삽입함. 원인은 파악안 됨. 예상 -> material tailwind
    const arr = removeDuplicatesByKey(props.item.children ?? [], 'menu_code');

    const [overlayY, setOverlayY] = useState(0);
    const [overlayText, setOverlayText] = useState('');

    return <div className={'w-full'}>
        {/* 메뉴가 접혔을 때 이름 오버레이 표시 */}
        {
            props.fold && overlayY !== 0 && StringUtil.checkEmptyText(overlayText) &&
            <div
                key={`menu-item-overlay-${props.item.menu_code}`}
                style={{
                    position: 'fixed',
                    // left: 0,
                    // top: 0,
                    left: 52,
                    top: overlayY + 6,
                    width: 'fit-content',
                    height: 'fit-content',
                    padding: '8px 16px',
                    zIndex: 9999,
                }}
                className={'shadow-md shadow-gray03 bg-gray06 text-white z-10'}
            >
                {overlayText}
            </div>
        }
        <Accordion
            className={`flex flex-col border-b border-b-white/20`}
            key={`sub_item_${props.item.menu_code}`}
            open={open}
            placeholder={''}>
            {

                // 하위 페이지가 없는 카테고리
                props.item.children === undefined || props.item.children.length === 0 ?
                    <div>
                        <div
                            style={{ height: `${SIZE_MENU_HEIGHT}px` }}
                            className={`w-full flex flex-row justify-between items-center text-sm font-semibold text-gray02 ' +
                                    'hover:bg-gray06 hover:text-white hover:duration-100 cursor-pointer`}
                            key={`sub_item_2_${props.item.menu_code}`}
                            onMouseEnter={(e) => {
                                e.preventDefault();
                                const rect = e.currentTarget.getBoundingClientRect();
                                setOverlayY(rect.y);
                                setOverlayText(props.item.menu_name);
                            }}
                            onMouseLeave={(e) => {
                                e.preventDefault();
                                setOverlayY(0);
                                setOverlayText('');
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                if (props.item.menu_lv === '2') router.push(`/console${props.item.menu_href}`);
                            }}>
                        <span className={`w-full flex flex-row items-center text-left px-5 gap-x-2`}>
                            {/* @ts-ignore */}
                            <FontAwesomeIcon className={`flex-none`} icon={props.item.menu_icon} />
                            <span className={`flex-1 line-clamp-1 ${props.fold ? `text-transparent` : ``}`}>
                                {props.item.menu_name}
                            </span>
                            {props.item.use_tag === 'N' ? <CUnderConstructionIcon /> : undefined}
                        </span>
                        </div>
                    </div> :

                    // 하위 페이지가 있는 카테고리
                    <div>
                        <div>
                            <AccordionHeader
                                style={{ border: 'hidden', height: `${SIZE_MENU_HEIGHT}px` }}
                                className={'w-full flex flex-row justify-between items-center text-sm font-semibold text-gray02 ' +
                                    'hover:bg-gray06 hover:text-white hover:duration-100 cursor-pointer'}
                                onMouseEnter={(e) => {
                                    e.preventDefault();
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    setOverlayY(rect.y);
                                    setOverlayText(props.item.menu_name);
                                }}
                                onMouseLeave={(e) => {
                                    e.preventDefault();
                                    setOverlayY(0);
                                    setOverlayText('');
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpen(!open);
                                }}
                                placeholder={''}
                            >
                        <span className={`w-full flex flex-row items-center text-left px-5 gap-x-2`}>
                            {/* @ts-ignore */}
                            <FontAwesomeIcon className={`flex-none`} icon={props.item.menu_icon} />
                            <span className={`flex-1 line-clamp-1 ${props.fold ? `text-transparent` : ``}`}>
                                {props.item.menu_name}
                            </span>
                            {props.item.use_tag === 'N' ? <CUnderConstructionIcon /> : undefined}
                        </span>
                            </AccordionHeader>
                        </div>

                        {/* 카테고리 하위 페이지 아이템 */}
                        <AccordionBody className={'w-full py-2'}>
                            {arr.map((item) => {
                                return <div
                                    style={{ height: `${SIZE_MENU_HEIGHT}px` }}
                                    className={'w-full flex flex-row justify-between items-center text-sm font-semibold text-gray04 ' +
                                        'hover:bg-gray06 hover:text-white hover:duration-100 cursor-pointer'}
                                    key={`sub_item_2_${item.menu_code}`}
                                    onMouseEnter={(e) => {
                                        e.preventDefault();
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        setOverlayY(rect.y);
                                        setOverlayText(item.menu_name);
                                    }}
                                    onMouseLeave={(e) => {
                                        e.preventDefault();
                                        setOverlayY(0);
                                        setOverlayText('');
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (item.menu_href) router.push(`/console${item.menu_href}`);
                                    }}>
                                <span className={`w-full flex flex-row items-center text-left px-5 gap-x-2 ${props.fold ? '' : 'ms-4'}`}>
                                    {/* @ts-ignore */}
                                    <FontAwesomeIcon className={'flex-none'} icon={props.item.menu_icon} />
                                    <span className={`flex-1 line-clamp-1 ${props.fold ? `text-transparent` : ``}`}>
                                        {item.menu_name}
                                    </span>
                                    {item.use_tag == 'N' ? <CUnderConstructionIcon /> : undefined}
                                </span>
                                </div>;
                            })}
                        </AccordionBody>
                    </div>
            }
        </Accordion>
    </div>;
}