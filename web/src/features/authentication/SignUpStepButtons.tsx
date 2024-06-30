import { Button } from '@material-tailwind/react';
import { SignUpStepButtonsProps } from './types';

const SignupStepButtons = ({
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
}: SignUpStepButtonsProps) => (
    <div className="flex justify-end mt-10">
        <div className="flex justify-end gap-2 mr-2">
            {activeStep === 1 && (
                <Button variant="outlined" color="red" onClick={handlePrev} disabled={isFirstStep}>
                    Back
                </Button>
            )}
            {activeStep === 0 && (
                <Button color="red" type="submit" disabled={!isFormValid}>
                    Next
                </Button>
            )}
            {activeStep === 1 && (
                <>
                    <Button
                        className={`${isResendDisabled ? 'bg-gray-400' : 'bg-red-500'} text-white`}
                        onClick={() => {
                            startResendTimer();
                            fetchVerificationCode(getValues('email'));
                        }}
                        disabled={isResendDisabled}
                    >
                        Resend the code
                        {isResendDisabled && <span className="ml-2">{resendTimer}s</span>}
                    </Button>
                </>
            )}
        </div>
        {isLastStep && (
            <Button color="red" onClick={handleGetStart} fullWidth>
                GET START!
            </Button>
        )}
    </div>
);

export default SignupStepButtons;
