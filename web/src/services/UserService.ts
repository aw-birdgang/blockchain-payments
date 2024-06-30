import UserClient from '../httpClient/UserClient';
import User from '../models/User';
import {RemoteUser, SigninWithGoogleApiResponse, SignupApiRequest, SignupApiResponse,} from './types';

export class UserService {
    private userClient: UserClient;

    constructor(apiClient: UserClient) {
        this.userClient = apiClient;
    }

    async signup(email: string, password: string): Promise<User> {
        const requestData: SignupApiRequest = { email, password };
        const response: SignupApiResponse = await this.userClient.signup(requestData);
        const remoteUser: RemoteUser = response.data;
        return new User(remoteUser);
    }

    async providerSigninWithGoogle(
        id: string,
        email: string,
        firstName: string,
        lastName: string,
    ): Promise<User> {
        const requestData = { id, email, firstName, lastName };
        const response: SigninWithGoogleApiResponse =
            await this.userClient.providerSigninWithGoogle(requestData);
        const remoteUser: RemoteUser = response.data;

        const user = new User(remoteUser);
        console.log('SigninWithGoogleApiResponse :', user);
        return user;
    }

    async signin(email: string, password: string): Promise<User> {
        const response = await this.userClient.signin({
            email,
            password,
        });

        const responseDData: RemoteUser = response.data;

        return new User(responseDData);
    }
}
