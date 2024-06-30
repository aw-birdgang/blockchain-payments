import { useEffect, useState } from 'react';
import FormRowVertical from '../../components/FormRowVertical';
import { Input, Typography } from '@material-tailwind/react';
import { useFormContext } from 'react-hook-form';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { SignFormControlsProps } from '../types';

export default function SignFormControls({ setButtonEnabled }: SignFormControlsProps) {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
        trigger,
    } = useFormContext();

    const email = watch('email', '');
    const password = watch('password', '');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

    const handleEmailBlur = async () => {
        const isValid = await trigger('email');
        if (!isValid) {
            setValue('email', '');
        }
    };

    useEffect(() => {
        setButtonEnabled(email.length > 0 && password.length > 0);
    }, [email, password, setButtonEnabled]);

    return (
        <>
            <FormRowVertical>
                <Input
                    type="email"
                    id="email"
                    label="Your email"
                    className="w-full"
                    error={!!errors.email}
                    {...register('email', {
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Please provide a valid email address',
                        },
                        onBlur: handleEmailBlur,
                    })}
                    crossOrigin=""
                />
                {errors.email && (
                    <Typography color="red">{errors.email.message as string}</Typography>
                )}
            </FormRowVertical>
            <FormRowVertical>
                <Input
                    type={passwordShown ? 'text' : 'password'}
                    icon={
                        <i onClick={togglePasswordVisibility}>
                            {passwordShown ? (
                                <EyeIcon className="h-5 w-5" />
                            ) : (
                                <EyeSlashIcon className="h-5 w-5" />
                            )}
                        </i>
                    }
                    id="password"
                    label="Password"
                    className="w-full"
                    {...register('password', {})}
                    crossOrigin=""
                />
            </FormRowVertical>
        </>
    );
}
