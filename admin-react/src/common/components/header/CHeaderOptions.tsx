'use client';

import { Cog6ToothIcon, UserIcon, LightBulbIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { MenuUrl } from '@/common/constants/MenuUrl';
import { Popover } from '@headlessui/react';
import { useLanguageStore } from '@/common/states/locale';
import Link from 'next/link';
import CRadioGroup from '@/common/components/form/CRadioGroup';
import { LANG_EN, LANG_LO } from '@/common/locale/lang';
import { CookieUtil } from '@/common/utils/CookieUtil';

interface LangOption {
    id: string;
    value: { lang: string; langSet: any };
    name: string;
}

interface CHeaderOptionsProps {
    user: any;
}

const langRadioGroup: LangOption[] = [
    { id: 'en', value: { lang: 'en', langSet: LANG_EN }, name: 'English' },
    { id: 'lo', value: { lang: 'lo', langSet: LANG_LO }, name: 'Lao' },
];

export default function CHeaderOptions({ user }: CHeaderOptionsProps) {
    const router = useRouter();
    const lang = useLanguageStore.getState?.()?.langSet;

    async function onSignOut() {
        await signOut({ redirect: false });
        window.location.replace(MenuUrl.LOGIN);
    }

    const initialLocale = CookieUtil.getLanguage() ?? 'en';
    const initialSelectedLang = langRadioGroup.find((lang) => lang.id === initialLocale);
    const [selectedLang, setSelectedLang] = useState<LangOption>(initialSelectedLang ?? langRadioGroup[0]);

    useEffect(() => {
        const updatedLang = langRadioGroup.find((lang) => lang.id === selectedLang.id);
        if (!updatedLang) return;
        useLanguageStore.setState?.({ ...updatedLang.value });
        CookieUtil.setLanguage(updatedLang.id);
    }, [selectedLang]);

    return (
        <div className="hidden sm:flex sm:flex-row">
            {/* User */}
            <Popover className="relative me-4">
                <Popover.Button className="p-2">
                    <UserIcon className="h-5 w-5" aria-hidden="true" />
                </Popover.Button>

                <Popover.Panel className="absolute z-20 left-[-200px]">
                    <div className="w-[240px] flex flex-col items-start bg-white border shadow-xl">
                        <div className="w-full flex flex-col items-start p-4 border-b">
                            <div className="text-sm text-gray03">{lang.user}</div>
                            <div className="font-semibold text-lg">{user?.email ?? ''}</div>
                        </div>

                        <Link href={MenuUrl.SETTINGS_MY_PROFILE} className="w-full p-4 border-b text-start hover:font-semibold hover:bg-gray01">
                            {lang.edit_my_profile}
                        </Link>
                        <button onClick={onSignOut} className="w-full p-4 text-start hover:font-semibold hover:bg-gray01">
                            {lang.sign_out}
                        </button>
                    </div>
                </Popover.Panel>
            </Popover>

            {/* Setting */}
            <button className="p-2 me-4" onClick={() => router.push(MenuUrl.SETTINGS)}>
                <Cog6ToothIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Temp Language Change Button */}
            <Popover className="relative me-4">
                <Popover.Button className="p-2">
                    <LightBulbIcon className="h-5 w-5" aria-hidden="true" />
                </Popover.Button>

                <Popover.Panel className="absolute z-20 left-[-200px]">
                    <div className="w-[240px] flex flex-col items-start bg-white border shadow-xl">
                        <div className="w-full border-b p-4">Dev Functions</div>
                        <div className="p-4">
                            <CRadioGroup id="settings-language" list={langRadioGroup} selected={selectedLang} setSelected={setSelectedLang} />
                        </div>
                    </div>
                </Popover.Panel>
            </Popover>
        </div>
    );
}
