import axios, { AxiosRequestConfig } from 'axios';
import { GetAnnouncementsApiRequest } from '../services/types';

export default class AnnouncementClient {
    private httpClient;

    constructor() {
        this.httpClient = axios.create({
            baseURL: "",
        });
    }

    async getAnnouncements(requestData: GetAnnouncementsApiRequest) {
        const config: AxiosRequestConfig = {
            params: requestData,
        };
        return this.httpClient.get('Notice-List', config);
    }
}
