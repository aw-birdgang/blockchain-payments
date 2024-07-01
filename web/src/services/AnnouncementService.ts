import AnnouncementClient from '../httpClient/AnnouncementClient';
import {Announcement} from '../models/Announcement';
import {RemoteAnnouncement} from '../models/RemoteAnnouncement';
import {GetAnnouncementsApiRequest, GetAnnouncementsApiResponse} from './types';

export class AnnouncementService {
    private announcementClient: AnnouncementClient;

    constructor(apiClient: AnnouncementClient) {
        this.announcementClient = apiClient;
    }

    async getAnnouncements(
        page_rows: number = 10,
        page_number: number = 1,
        board_subject?: string,
        language_type: string = 'en',
    ): Promise<Announcement[]> {
        const requestData: GetAnnouncementsApiRequest = {
            page_rows,
            page_number,
            board_subject,
            language_type,
        };

        const response: GetAnnouncementsApiResponse =
            await this.announcementClient.getAnnouncements(requestData);

        const remoteAnnouncements: RemoteAnnouncement[] = response.data;
        const announcements = remoteAnnouncements.map((data) => new Announcement(data));

        return announcements;
    }
}
