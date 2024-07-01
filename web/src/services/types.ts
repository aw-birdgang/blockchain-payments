import { AxiosError, AxiosResponse } from 'axios';
import { RemoteAnnouncement } from '../models/RemoteAnnouncement';
import { RemoteCarryOverPrize } from '../models/RemoteCarryOverPrize';
import { RemotePreviousDrawInfo } from '../models/RemotePreviousDrawInfo';

export type SignupApiRequest = {
    email: string;
    password: string;
};

export type SignInApiRequest = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export type SignupApiResponse = {
    data: RemoteUser;
};

export type SigninWithGoogleApiResponse = {
    data: RemoteUser;
};

export type ProviderSigninWithGoogleApiRequest = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

export interface RemoteUser {
    member_type?: string;
    member_idx?: number;
    member_id?: string;
    member_email?: string;
    member_name?: string;
    access_token: string;
    access_token_expire?: string;
    refresh_token: string;
    refresh_token_expire?: string;
    emailVerified?: boolean;
    kycVerified?: boolean;
}

export type GetWinningNumbersApiResponse = {
    data: RemoteWinningNumbers[];
};

export type GetWinningNumbersApiRequest = {
    page: number;
    offset: number;
};

export type GetDrawVideosApiRequest = {
    page: number;
    offset: number;
};

export type RemoteWinningNumbers = {
    draw_idx: string;
    winning_date: string | null;
    winning_number: string;
    bonus_number: string;
    prizing_confirm_date: string;
    prizing_start_date: string;
    prizing_end_date: string;
    draw_start_date: string;
    draw_end_date: string;
};

export type GetDrawVideosApiResponse = {
    data: RemoteDrawVideo[];
};

export type RemoteDrawVideo = {
    draw_video_idx: string;
    draw_video_url: string;
    draw_idx: string;
    winning_date: string | null;
};

export type GetAnnouncementsApiRequest = {
    page_rows: number;
    page_number: number;
    board_subject?: string;
    language_type: string;
};

export type GetAnnouncementsApiResponse = {
    data: RemoteAnnouncement[];
};

export type GetPreviousDrawResponse = {
    data: RemotePreviousDrawInfo;
};

export type GetCarryOverPrizeResponse = {
    data: RemoteCarryOverPrize;
};

export interface CustomAxiosError extends AxiosError {
    response?: AxiosResponse<{
        message?: string[];
    }>;
}

export type SendVerificationCodeApiResponse = {
    data: {
        Result: string;
    };
};

export type VerifyCodeApiResponse = {
    data: {
        Result: boolean;
    };
};

export interface GoogleUserInfo {
    id: string;
    email: string;
    given_name: string;
    family_name: string;
}
