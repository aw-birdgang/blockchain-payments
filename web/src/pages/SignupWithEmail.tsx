import { useState, useEffect, useCallback } from 'react';
import { OnBaordingStepper } from '../components/OnBaordingStepper';
import SignupStep1 from '../features/authentication/SignupStep1';
import SignupStep2 from '../features/authentication/SignupStep2';
import SignupStep3 from '../features/authentication/SignupStep3';
import useEmailVerification from '../features/authentication/useEmailVerification';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useUser from '../features/authentication/useSignup';
import { SignupApiRequest } from '../services/types';
import { SignUpStepButtonsProps } from '../features/authentication/types';
import SignupStepButtons from '../features/authentication/SignUpStepButtons';

export default function SignupWithEmail() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
    const [isLastStep, setIsLastStep] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [errorsFromServer, setErrorsFromServer] = useState<string>('');

    const { signup } = useUser();
    const { sendVerificationCode } = useEmailVerification();
    const navigate = useNavigate();
    const methods = useForm<SignupApiRequest>();
    const { handleSubmit, getValues } = methods;

    const [resendTimer, setResendTimer] = useState(10);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [isResendTimerStarted, setIsResendTimerStarted] = useState(false);

    useEffect(() => {
        setIsFirstStep(activeStep === 0);
        setIsLastStep(activeStep === 2);
    }, [activeStep]);

    useEffect(() => {
        let timer: number;
        if (isResendDisabled && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        if (resendTimer === 0) {
            setIsResendDisabled(false);
            setIsResendTimerStarted(false);
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isResendDisabled, resendTimer]);

    const handleGetStart = () => {
        navigate('/auth/sign-in');
    };

    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const onSubmit = (data: SignupApiRequest) => {
        if (activeStep === 0) {
            signup(data, {
                onSuccess: () => {
                    setErrorsFromServer('');
                    setActiveStep((prevStep) => prevStep + 1);
                },
                onError: () => {
                    setErrorsFromServer('sign_up_error_msg_email_duplication');
                },
            });
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleVerify = (isVerified: boolean) => {
        if (isVerified) {
            setActiveStep((prevStep) => prevStep + 1);
        } else {
            if (!isResendTimerStarted) {
                setIsResendDisabled(true);
                setResendTimer(10);
                setIsResendTimerStarted(true);
            }
        }
    };

    const startResendTimer = () => {
        if (!isResendTimerStarted) {
            setIsResendDisabled(true);
            setResendTimer(10);
            setIsResendTimerStarted(true);
        }
    };

    const fetchVerificationCode = useCallback(
        async (email: string) => {
            await sendVerificationCode(email);
        },
        [sendVerificationCode],
    );

    const getSignUpStepComponent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <SignupStep1
                        errorsFromServer={errorsFromServer}
                        setErrorsFromServer={setErrorsFromServer}
                        setIsFormValid={setIsFormValid}
                    />
                );
            case 1:
                return (
                    <SignupStep2
                        onVerify={handleVerify}
                        startResendTimer={startResendTimer}
                        isResendTimerStarted={isResendTimerStarted}
                    />
                );
            case 2:
                return <SignupStep3 />;
            default:
                return null;
        }
    };

    const signupStepButtonsProps: SignUpStepButtonsProps = {
        activeStep,
        isFirstStep,
        isLastStep,
        handlePrev,
        handleGetStart,
        isFormValid,
        isResendDisabled,
        resendTimer,
        startResendTimer,
        fetchVerificationCode,
        getValues,
    };

    return (
        <FormProvider {...methods}>
            <form className="max-w-xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <OnBaordingStepper
                    activeStep={activeStep}
                    setIsLastStep={setIsLastStep}
                    setIsFirstStep={setIsFirstStep}
                    setActiveStep={setActiveStep}
                    isLastStep={false}
                    isFirstStep={false}
                />
                <div className="w-full lg:mt-36 mt-20">{getSignUpStepComponent()}</div>
                <SignupStepButtons {...signupStepButtonsProps} />
            </form>
        </FormProvider>
    );
}
