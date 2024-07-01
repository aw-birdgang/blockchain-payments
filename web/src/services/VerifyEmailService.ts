import VerifyEmailClient from '../httpClient/VerifyEmailClient';
import {SendVerificationCodeApiResponse, VerifyCodeApiResponse} from './types';

export class VerifyEmailService {
    private verifyEmailClient: VerifyEmailClient;

    constructor(apiClient: VerifyEmailClient) {
        this.verifyEmailClient = apiClient;
    }

    async sendVerificationCode(member_email: string): Promise<string> {
        const response: SendVerificationCodeApiResponse =
            await this.verifyEmailClient.sendVerificationCode({
                member_email,
            });

        return response.data.Result;
    }

    async verifyCode(member_email: string, verificationCode: string): Promise<boolean> {
        const response: VerifyCodeApiResponse = await this.verifyEmailClient.verifyCode({
            member_email,
            verificationCode,
        });

        return response.data.Result;
    }
}
