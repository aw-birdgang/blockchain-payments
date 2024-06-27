'use client';

import { useEffect } from 'react';
import { LANG_EN, LANG_LO } from '@/common/locale/lang';
import { useLanguageStore } from '@/common/states/locale';
import { useMenuStore } from '@/common/states/menu';


interface StoreInitializerProps {
    lang: string;
    foldMenu: string;
}

export default function StoreInitializer({ lang, foldMenu }: StoreInitializerProps) {
    useEffect(() => {
        const langSet = (lang === 'en' || lang !== 'lo') ? LANG_EN : LANG_LO;
        useLanguageStore.setState?.({ language: lang, langSet: langSet });
        useMenuStore.setState?.({ fold: foldMenu === 'y' });
    }, [lang, foldMenu]);

    return null;
}
