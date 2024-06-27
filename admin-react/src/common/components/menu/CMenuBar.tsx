'use client';

import CMenuBarList from '@/common/components/menu/CMenuBarList';
import { IMenuItem } from '@/common/models/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SIZE_MENU_WIDTH_FOLD, SIZE_MENU_WIDTH_UNFOLD } from '@/common/constants/values';
import { useMenuStore } from '@/common/states/menu';
import { CookieUtil } from '@/common/utils/CookieUtil';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// fontawesome 아이콘 로딩
library.add(fas);

export default function CMenuBar({ userInfo, menuList }: {
    userInfo: any
    menuList: IMenuItem[]
}) {
    const { fold, setFold } = useMenuStore();
    const userInfoBox = <div className={`flex flex-row items-center gap-x-4 mb-4 h-[60px] ${fold ? 'justify-center' : 'px-2'} cursor-pointer`}>
        <div className={`${fold ? 'w-8 h-8 ' : 'w-12 h-12'} w-12 h-12 border border-white/20 rounded-md flex flex-row justify-center items-center`}>
            <FontAwesomeIcon icon={'user'} size={fold ? 'lg' : 'xl'} color={'white'} />
        </div>
        {
            !fold && <div className={`${fold ? 'hidden' : 'flex flex-col'}`}>
                {userInfo &&
                    <span>
                                    {userInfo && userInfo.member_name && <span className={'text-lg text-white font-semibold me-2'}>{userInfo.member_name}</span>}
                        {userInfo && userInfo.member_part && <span className={'text-sm text-white font-light'}>{userInfo.member_part}</span>}
                                </span>
                }
                {userInfo && userInfo.member_email && <div className={'text-base text-white font-normal'}>{userInfo.member_email}</div>}
            </div>
        }
    </div>;
    return (
        <div
            className={`flex flex-col rounded-rb-lg bg-gray07
                    ${fold ? `px-0 items-center` : ``} transform-all duration-200 ease-out
                    border-r border-gray01
                `}
            style={{
                userSelect: 'none',
                scrollbarColor: 'light',
                width: fold ? `${SIZE_MENU_WIDTH_FOLD}px` : `${SIZE_MENU_WIDTH_UNFOLD}px`,
                minHeight: '160dvh',
            }}>
            {/* 메뉴 로고 */}
            <div className={`flex flex-row w-full justify-center items-center h-16 shrink-0 mt-4 mb-6 py-4 bg-white text-2xl text-gray07 font-semibold cursor-pointer`}
                 onClick={() => {
                     setFold(!fold);
                     CookieUtil.setMenuFold(!fold ? 'y' : 'n');
                 }}>
                <div className={'w-full flex flex-row items-center text-center'}>
                    <div className={`flex flex-1 flex flex-row justify-center line-clamp-1 truncate`}>{fold ? '' : 'Lotto Laos Global'}</div>
                    <div className={`flex flex-row justify-center items-center flex-none bg-gray05 ${fold ? 'w-full' : `w-[${SIZE_MENU_WIDTH_FOLD}px]`} h-16 text-white transition-all duration-150`}>
                        <FontAwesomeIcon icon={fold ? 'caret-right' : 'caret-left'} size={'lg'} color={'white'} />
                    </div>
                </div>
            </div>
            {/* 현재 로그인 된 유저 정보 */}
            {
                userInfo ?
                    process.env.NODE_ENV === 'development' ?
                        <CopyToClipboard text={userInfo.access_token}
                                         onCopy={() => alert('Text has been copied to the clipboard.')}>
                            {userInfoBox}
                        </CopyToClipboard> :
                        <div>
                            {userInfoBox}
                        </div> : undefined

            }
            {/* 매뉴 리스트*/}
            <CMenuBarList menus={menuList} fold={fold} />
        </div>
    );
}