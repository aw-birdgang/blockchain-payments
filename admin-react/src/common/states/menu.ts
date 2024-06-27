import { create } from 'zustand';
import { LANG_EN } from '@/common/locale/lang';

type TMenuState = {
    fold: boolean
}

type TMenuAction = {
    setFold: (fold: TMenuState['fold']) => void
}

/**
 * 언어 설정 상태 (쿠키에서 읽어온 후 상태로 저장)
 */
export const useMenuStore = create<TMenuState & TMenuAction>()((set) => ({
    fold: true,
    setFold: (fold) => set(() => ({ fold: fold })),
}));