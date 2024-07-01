import axios from 'axios';
import {ProviderSigninWithGoogleApiRequest, SignInApiRequest, SignupApiRequest,} from '../services/types';

export default class UserClient {
    private httpClient;

    constructor() {
        this.httpClient = axios.create({
            baseURL: "",
        });
    }

    async signup(requestData: SignupApiRequest) {
        return this.httpClient.post('member-join', requestData);
    }

    async signin(requestData: SignInApiRequest) {
        return this.httpClient.post('member-login', requestData);
    }

    async providerSigninWithGoogle(requestData: ProviderSigninWithGoogleApiRequest) {
        return this.httpClient.post('member-google-login', requestData);
    }
}
