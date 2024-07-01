import {useQuery} from '@tanstack/react-query';
import {Announcement} from '../../models/Announcement';
import {AnnouncementService} from '../../services/AnnouncementService';
import AnnouncementClient from '../../httpClient/AnnouncementClient';

export default function useAnnouncements(
    language_type?: string,
    page_rows?: number,
    page_number?: number,
    board_subject?: string,
) {
    const announceClient = new AnnouncementClient();
    const announcementService = new AnnouncementService(announceClient);

    const { data: announcements } = useQuery({
        queryKey: ['announcements', page_rows, page_number, board_subject, language_type],
        queryFn: async (): Promise<Announcement[] | null> =>
            announcementService.getAnnouncements(
                page_rows,
                page_number,
                board_subject,
                language_type,
            ),
    });

    return announcements;
}
