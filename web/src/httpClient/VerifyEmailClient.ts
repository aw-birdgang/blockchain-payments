import axios from 'axios';

export default class VerifyEmailClient {
    private httpClient;

    constructor() {
        this.httpClient = axios.create({
            baseURL: import.meta.env.VITE_VERIFY_EMAIL_API_URL,
        });
    }

    /**
     * 검증 코드를 달라는 요청을 보냅니다.
     * @param member_email - 이메일을 포함한 객체
     * @returns 검증 코드의 응답 결과를 반환합니다.
     */
    async sendVerificationCode(params: { member_email: string }) {
        return this.httpClient.post('send-verify-signup-email', params);
    }

    /**
     * 검증 코드를 확인하는 요청을 보냅니다.
     * @param params - 이메일과 검증 코드를 포함한 객체
     * @returns 검증 코드 확인의 응답 결과를 반환합니다.
     */
    async verifyCode(params: { member_email: string; verificationCode: string }) {
        return this.httpClient.post('verify-signup-code', params);
    }
}
