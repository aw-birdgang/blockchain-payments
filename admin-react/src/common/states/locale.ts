import { create } from 'zustand';
import { LANG_EN } from '@/common/locale/lang';

type TLocaleState = {
    language: string
    langSet: typeof LANG_EN
}

type TLocaleAction = {
    setLocale: (locale: TLocaleState['language']) => void
    setLangSet: (langSet: TLocaleState['langSet']) => void
}

export const useLanguageStore = create<TLocaleState & TLocaleAction>()((set) => ({
    language: 'en',
    langSet: LANG_EN,
    setLocale: (lang) => set(() => ({ language: lang })),
    setLangSet: (langSet) => set(() => ({ langSet: langSet })),
}));