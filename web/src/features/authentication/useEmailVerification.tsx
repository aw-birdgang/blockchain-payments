import { useMutation } from '@tanstack/react-query';
import { VerifyEmailService } from '../../services/VerifyEmailService';
import VerifyEmailClient from '../../httpClient/VerifyEmailClient';

export default function useEmailVerification() {
    const verifyEmailClient = new VerifyEmailClient();
    const verifyEmailService = new VerifyEmailService(verifyEmailClient);

    const { mutateAsync: sendVerificationCode } = useMutation({
        mutationFn: async (email: string): Promise<string | null> => {
            return verifyEmailService.sendVerificationCode(email);
        },
    });

    const { mutateAsync: verifyCode } = useMutation({
        mutationFn: async (data: {
            email: string;
            verificationCode: string;
        }): Promise<boolean | null> => {
            return verifyEmailService.verifyCode(data.email, data.verificationCode);
        },
    });

    return { sendVerificationCode, verifyCode };
}
