import { useQuery } from '@tanstack/react-query';
import { WinningNumber } from '../../models/WinningNumber';
import HomeClient from '../../httpClient/HomeClient';
import { HomeService } from '../../services/HomeService';

export default function useWinningNumbers(page: number, offset: number) {
    const homeClient = new HomeClient();
    const homeService = new HomeService(homeClient);

    const { data: winningNumberInfos } = useQuery({
        queryKey: ['winningNumbers', page, offset],
        queryFn: async (): Promise<WinningNumber[] | null> =>
            homeService.getWinningNumbers(page, offset),
    });

    return winningNumberInfos;
}
