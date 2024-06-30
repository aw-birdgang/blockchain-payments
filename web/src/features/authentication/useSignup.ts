import { useMutation } from '@tanstack/react-query';
import { useUserServiceStore } from '../../store/useUserServiceStore';
import { SignupApiRequest } from '../../services/types';

export default function useSignup() {
    const { userService } = useUserServiceStore();

    const { mutate: signup } = useMutation({
        mutationFn: (data: SignupApiRequest) => {
            return userService.signup(data.email, data.password);
        },
    });

    return { signup };
}
