import axios from 'axios';

export interface GoogleUserInfo {
    id: string;
    email: string;
    given_name: string;
    family_name: string;
}

export class GoogleApisClient {
    private googleApiClient;
    constructor() {
        this.googleApiClient = axios.create({
            baseURL: "",
        });
    }

    async getUserInfoFromGoogle(accessToken: string): Promise<GoogleUserInfo> {
        const response = await this.googleApiClient.get('/oauth2/v1/userinfo', {
            params: {
                access_token: accessToken,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
            },
        });
        return response.data;
    }
}
