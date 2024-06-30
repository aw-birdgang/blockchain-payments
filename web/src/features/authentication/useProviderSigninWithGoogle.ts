import { useMutation, useQueryClient, UseMutateFunction } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { QUERY_KEY } from '../../utils/queryKeys';

import { useUserServiceStore } from '../../store/useUserServiceStore';
import {ProviderSigninWithGoogleApiRequest} from '../../services/types';

export function useProviderSigninWithGoogle(): UseMutateFunction<
    User,
    unknown,
    ProviderSigninWithGoogleApiRequest,
    unknown
> {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { userService } = useUserServiceStore();

    const { mutate: providerSignInWithGoogle } = useMutation<
        User,
        unknown,
        ProviderSigninWithGoogleApiRequest,
        unknown
    >({
        mutationFn: async ({
            id,
            email,
            firstName,
            lastName,
        }: ProviderSigninWithGoogleApiRequest): Promise<User> => {
            return await userService.providerSigninWithGoogle(
                id,
                email,
                firstName,
                lastName,
            ) as Promise<User>;
        },
        onSuccess: (data) => {
            console.log('google user data: ', data);
            queryClient.setQueryData([QUERY_KEY.user], {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            navigate('/');
        },
        onError: (error) => {
            console.error('Error on sign in:', error);
        },
    });

    return providerSignInWithGoogle;
}
