import axios, {AxiosRequestConfig} from 'axios';
import {GetDrawVideosApiRequest, GetWinningNumbersApiRequest} from '../services/types';

export default class HomeClient {
    private homeClient;

    constructor() {
        this.homeClient = axios.create({
            baseURL: import.meta.env.VITE_HOME_API_URL,
        });
    }

    async getWinningNumbers(requestData: GetWinningNumbersApiRequest) {
        const config: AxiosRequestConfig = {
            params: requestData,
        };
        return this.homeClient.get('winning-number', config);
    }


    async getDrawVideos(requestData: GetDrawVideosApiRequest) {
        const config: AxiosRequestConfig = {
            params: requestData,
        };
        return this.homeClient.get('draw-videos', config);
    }

}
