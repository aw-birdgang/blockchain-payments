import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as userLocalStorage from './userLocalStorageStore';
import { QUERY_KEY } from '../../utils/queryKeys';
import { TokenInfo } from './types';

export function useUser(): TokenInfo | null {
    const { data: tokenInfo } = useQuery({
        queryKey: [QUERY_KEY.user],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        initialData: userLocalStorage.getUser,
    });

    useEffect(() => {
        if (!tokenInfo) userLocalStorage.removeUser();
        else {
            userLocalStorage.saveUser(tokenInfo);
        }
    }, [tokenInfo]);

    return tokenInfo ?? null;
}
