import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import SignFormControls from '../features/authentication/SignFormControls';
import FormTitle from '../components/FormTitle';
import SignButtonGroup from '../features/authentication/SignButtonGroup';
import SignMainImg from '../components/SignMainImg';
import { Alert, Button } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { useSignin } from '../features/authentication/useSignin';
import { SignInApiRequest } from '../services/types';
import { CustomError, SignInFormData } from './types';
import { useNavigate } from 'react-router-dom';
import AlertIcon from '../components/AlertIcon';

export default function SignIn() {
    const methods = useForm<SignInFormData>();
    const { handleSubmit } = methods;
    const { t } = useTranslation();
    const { signin } = useSignin();
    const navigate = useNavigate();

    const [isButtonEnabled, setIsButtonEnabled] = React.useState(false);
    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const [errorsFromServer, setErrorsFromServer] = useState<string>('');

    const onSubmit = (data: SignInApiRequest) => {
        signin(data, {
            onSuccess: () => {
                navigate('/home');
            },
            // axios error response 표준 형태에 맞게 변경요청.
            // TODO : 에러 메시지가 여러가지 형태임. 일관성 있게 수정해야 함.
            onError: (error: Error) => {
                const customError = error as CustomError;

                const errorMessage =
                    customError.response?.data?.message[0] ||
                    'Provided email or password are incorrect';
                setErrorsFromServer(errorMessage);
                setOpenErrorMessage(true);

                // TODO: 아래 라우터에서 처리할 수 있는 형태로 변경
                throw new Error(errorMessage);
            },
        });
    };

    const signInButtonsConfig = {
        message: 'dont_have_an_account',
        linkText: 'sign_up_exclamation_mark',
        linkTo: '/auth/sign-up',
        buttonText: 'sign_in_menu',
        googleButtonText: 'sign_in_with_google',
        buttonLink: '/auth/signup-with-email',
    };

    return (
        <FormProvider {...methods}>
            <section className="grid items-center lg:grid-cols-2">
                <div className="my-auto text-center sm:p-10 md:p-20 xl:px-32 xl:py-24">
                    <FormTitle title="sign_in_title" subtitle="sign_in_subtitle" />
                    {errorsFromServer && (
                        <Alert
                            className="mt-4"
                            open={openErrorMessage}
                            onClose={() => {
                                setOpenErrorMessage(false);
                                setErrorsFromServer('');
                            }}
                            icon={<AlertIcon />}
                            color="red"
                        >
                            {errorsFromServer}
                        </Alert>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <SignFormControls setButtonEnabled={setIsButtonEnabled} />

                        <SignButtonGroup config={signInButtonsConfig}>
                            <Button
                                color="red"
                                size="lg"
                                className="mt-6"
                                fullWidth
                                type="submit"
                                disabled={!isButtonEnabled}
                            >
                                {t('sign_in_menu')}
                            </Button>
                        </SignButtonGroup>
                    </form>
                </div>
                <SignMainImg />
            </section>
        </FormProvider>
    );
}
