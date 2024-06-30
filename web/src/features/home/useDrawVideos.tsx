import HomeClient from '../../httpClient/HomeClient';
import { HomeService } from '../../services/HomeService';
import { DrawVideo } from './../../models/DrawVideo';
import { useQuery } from '@tanstack/react-query';

export default function useDrawVideos(page: number, offset: number) {
    const homeClient = new HomeClient();
    const homeService = new HomeService(homeClient);

    const { data: drawVideos } = useQuery({
        queryKey: ['drawVideos', page, offset],
        queryFn: async (): Promise<DrawVideo[] | null> => homeService.getDrawVideos(page, offset),
    });

    return drawVideos;
}
