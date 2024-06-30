import { ReactNode } from 'react';
import TopCenter from "./home/TopCenter";

export interface Notice {
    no: string;
    title: string;
    date: string;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface NoticeResponse {
    kind: string;
    etag: string;
    items: Notice[];
    pageInfo: PageInfo;
    nextPageToken?: string;
}

export interface SearchStoreResponse {
    kind: string;
    etag: string;
    items: SearchStore[];
    pageInfo: PageInfo;
    nextPageToken?: string;
}

export interface SearchStore {
    distributor: string;
    tel: string;
    location: string;
    map: string;
}

export interface FaqResponse {
    kind: string;
    etag: string;
    items: Faq[];
    pageInfo: PageInfo;
    nextPageToken?: string;
}

export interface Faq {
    id: number;
    question: string;
    answer: string;
}

export type PasswordCriteriaProps = {
    isMinLengthValid: boolean;
    isCapitalAndNumberValid: boolean;
};

export type SignOutFunction = () => void;

export type GoogleSignInButtonProps = {
    googleButtonText: string;
};

export interface Config {
    message: string;
    linkText: string;
    linkTo: string;
    googleButtonText: string;
}

export interface SignButtonGroupProps {
    config: Config;
    children: ReactNode;
}

export interface SignFormControlsProps {
    setButtonEnabled: (enabled: boolean) => void;
}

export interface SignupStep1Props {
    errorsFromServer: string;
    setErrorsFromServer: (error: string) => void;
    setIsFormValid: (isValid: boolean) => void;
}

export interface SignupStep2Props {
    onVerify: (isVerified: boolean) => void;
    startResendTimer: () => void;
    isResendTimerStarted: boolean;
}

export interface AuthMessageLinkProps {
    message: string;
    linkText: string;
    linkTo: string;
}

export type HomeCardProps = {
    title: string;
    children?: ReactNode;
};

export type TopCenterProps = {
    className?: string;
};
