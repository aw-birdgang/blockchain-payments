import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../../utils/queryKeys';
import { SignInApiRequest } from '../../services/types';
import UserClient from '../../httpClient/UserClient';
import { UserService } from '../../services/UserService';
import User from '../../models/User';

export function useSignin() {
    //TODO: store로 바꾸기
    //const { userService } = useUserServiceStore();
    const userClient = new UserClient();
    const userService = new UserService(userClient);
    const queryClient = useQueryClient();

    const { mutate: signin } = useMutation({
        mutationFn: (requestData: SignInApiRequest) => {
            return userService.signin(requestData.email, requestData.password);
        },
        onSuccess: (data: User) => {
            queryClient.setQueryData([QUERY_KEY.user], {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
        },
    });

    return { signin };
}
