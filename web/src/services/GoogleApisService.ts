import { GoogleApisClient } from '../httpClient/GoogleApisClient';
import { GoogleUserInfo } from './types';

export class GoogleApisService {
    private googleAuthClient: GoogleApisClient;

    constructor(googleUserClient: GoogleApisClient) {
        this.googleAuthClient = googleUserClient;
    }

    async getUserInfoFromGoogle(accessToken: string): Promise<GoogleUserInfo> {
        const userInfo = await this.googleAuthClient.getUserInfoFromGoogle(accessToken);
        return userInfo;
    }
}
