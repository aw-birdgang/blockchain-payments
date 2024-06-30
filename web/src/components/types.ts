import { ReactNode } from 'react';

export type FormRowVerticalProps = {
    //label?: string;
    //error?: string;
    children: ReactNode;
};

export type NavItemProps = {
    label: string;
    to: string;
};

export interface MenuItemProps {
    url: string;
    label: string;
}

export interface ProtectedRouteProps {
    children: ReactNode;
}

export interface SearchProps {
    searchPath: string;
}

export type NavListMenusProps = {
    isDrawer: boolean;
};

export type HeaderDrawerProps = {
    openNav: boolean;
    toggleDrawer: () => void;
    navigateToLogin: () => void;
};

export type SignInOutButtonProps = {
    className?: string;
    auth: boolean;
};

export type FormTitleProps = {
    title: string;
    subtitle: string;
};

export type OnboardingStepperProps = {
    activeStep: number;
    setActiveStep: (step: number) => void;
    isLastStep: boolean;
    isFirstStep: boolean;
    setIsLastStep: (value: boolean) => void;
    setIsFirstStep: (value: boolean) => void;
};

export type CustomDialogProps = {
    open: boolean;
    title: string;
    bodyContent: string;
    onCancel: () => void;
    onConfirm: () => void;
};

export type FormRowProps = {
    label: string;
    error: string;
    children: React.ReactNode;
};

export type Country = {
    name: string;
    language: string;
    flags: {
        svg: string;
    };
};

export interface OpenMenusState {
    isLotteryInfoOpen: boolean;
    isResultOpen: boolean;
    isStore: boolean;
    isAboutDlpe: boolean;
}

export interface MenuItemType {
    key: string;
    label: string | null;
    icon: string | null;
    link: string;
}

export type AccordionItemProps = {
    index: number;
    header: string;
    body: string;
    open: number;
    handleOpen: (value: number) => void;
};

export interface DefaultAccordionProps {
    items: {
        header: string;
        body: string;
    }[];
    defaultOpenIndex?: number;
}

export interface PageTitleProps {
    title?: string;
    subtitle?: string;
}
