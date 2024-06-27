'use client';

import CMenuItem from '@/common/components/menu/CMenuItem';
import { IMenuItem } from '@/common/models/interfaces';
import { MENU_DEV_FUNCTIONS, MENU_SETTINGS } from '@/common/constants/values';

export default function CMenuBarList(props: {
    menus: Object
    fold: boolean
}) {
    return (
        <>
            <div className={`h-full flex flex-1 flex-col w-full`}>
                <ul role='list' className='' style={{ border: 'hidden' }}>
                    {Object.values(props.menus).map((item: IMenuItem) => {
                        const now = new Date();
                        return <div key={`group_item_${item.menu_code}_${now.getMilliseconds()}`}>
                            <CMenuItem item={item} fold={props.fold} />
                        </div>;
                    })}
                </ul>
            </div>
        </>
    );
}
