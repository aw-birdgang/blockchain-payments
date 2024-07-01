export type SignInFormData = {
    email: string;
    password: string;
};

export type TopRightProps = {
    className?: string;
};

export type TopLeftProps = {
    className?: string;
};

import { AxiosError, AxiosResponse } from 'axios';

export interface CustomError extends AxiosError {
    response: AxiosResponse<{
        message: string[];
    }>;
}
