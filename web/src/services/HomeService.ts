import HomeClient from '../httpClient/HomeClient';
import {DrawVideo} from '../models/DrawVideo';

import {WinningNumber} from '../models/WinningNumber';

import {
    GetDrawVideosApiRequest,
    GetDrawVideosApiResponse,
    GetWinningNumbersApiRequest,
    GetWinningNumbersApiResponse,
    RemoteDrawVideo,
    RemoteWinningNumbers,
} from './types';

export class HomeService {
    private apiClient: HomeClient;

    constructor(apiClient: HomeClient) {
        this.apiClient = apiClient;
    }

    async getWinningNumbers(page: number, offset: number): Promise<WinningNumber[] | null> {
        const requestData: GetWinningNumbersApiRequest = { page, offset };
        const response: GetWinningNumbersApiResponse =
            await this.apiClient.getWinningNumbers(requestData);

        const remoteWinningNumbers: RemoteWinningNumbers[] = response.data;
        const winningNumbers = remoteWinningNumbers.map((data) => new WinningNumber(data));
        return winningNumbers;
    }


    async getDrawVideos(page: number, offset: number): Promise<DrawVideo[] | null> {
        const requestData: GetDrawVideosApiRequest = { page, offset };
        const response: GetDrawVideosApiResponse = await this.apiClient.getDrawVideos(requestData);
        const remoteDrawVideos: RemoteDrawVideo[] = response.data;
        const drawVideos = remoteDrawVideos.map((data) => new DrawVideo(data));
        return drawVideos;
    }

}
