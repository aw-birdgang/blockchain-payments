import { useRef, useEffect, FocusEvent, KeyboardEvent, FormEvent } from 'react';
import { Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import useEmailVerification from './useEmailVerification';
import { SignupStep2Props } from '../types';

export default function SignupStep2({
    onVerify,
    startResendTimer,
    isResendTimerStarted,
}: SignupStep2Props) {
    const { t } = useTranslation();
    const inputRefs = useRef(Array(6).fill(null));
    const {
        getValues,

        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();
    const email = getValues('email');

    const { sendVerificationCode, verifyCode } = useEmailVerification();

    const fetchVerificationCode = async (email: string) => {
        await sendVerificationCode(email);
    };

    useEffect(() => {
        inputRefs.current[0].focus();
        fetchVerificationCode(email);
    }, []);

    const handleChange = async () => {
        const enteredCode = inputRefs.current.map((ref) => ref.value).join('');
        if (enteredCode.length < 6) {
            clearErrors('verificationCode');
        } else if (enteredCode.length === 6) {
            const isVerified = await verifyCode({ email, verificationCode: enteredCode });

            if (isVerified) {
                clearErrors('verificationCode');
                onVerify(true);
            } else {
                setError('verificationCode', {
                    type: 'manual',
                    message: t('Verification code does not match. Please check again.'),
                });
                onVerify(false);
                if (!isResendTimerStarted) {
                    startResendTimer();
                }
                inputRefs.current.forEach((ref) => (ref.value = ''));
                inputRefs.current[0].focus();
            }
        }
    };

    const handleInput = (e: FormEvent<HTMLInputElement>, index: number) => {
        const { value } = e.currentTarget;
        const isValidInput = /^[0-9]$/.test(value);

        if (isValidInput) {
            inputRefs.current[index]!.value = value;
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        } else {
            e.currentTarget.value = '';
        }
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        e.target.value = '';
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        const { key } = e;

        if (key === 'Backspace') {
            e.preventDefault();
            inputRefs.current[index].value = '';
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    return (
        <>
            <Typography variant="h4">{t('Verify your email')}</Typography>
            <Typography className="mt-3 font-medium text-gray-500">
                {t(
                    'Please enter the verification code we sent to your email address to complete the verification process.',
                )}
            </Typography>
            <div className="mt-10 mb-3 flex flex-row items-center justify-center gap-3">
                {inputRefs.current.map((_, index) => (
                    <div key={index} className="h-16 w-14">
                        <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            className={`flex h-full w-full rounded-lg border ${errors.verificationCode ? 'border-red-600' : 'border-gray-300'} bg-white px-4 text-center text-lg outline-none ring-gray-900 focus:bg-gray-50 focus:ring-1`}
                            type="text"
                            maxLength={1}
                            onInput={(e) => handleInput(e, index)}
                            onFocus={handleFocus}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            {errors.verificationCode && (
                <Typography className="text-red-600 text-center mb-5">
                    {errors.verificationCode.message as string}
                </Typography>
            )}
        </>
    );
}
