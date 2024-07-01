export interface SignUpStepButtonsProps {
    activeStep: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    handlePrev: () => void;
    handleGetStart: () => void;
    isFormValid: boolean;
    isResendDisabled: boolean;
    resendTimer: number;
    startResendTimer: () => void;
    fetchVerificationCode: (email: string) => void;
    getValues: (field: string) => string;
}

export interface SignUpStepButtonsProps {
    activeStep: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    handlePrev: () => void;
    handleGetStart: () => void;
    isFormValid: boolean;
    isResendDisabled: boolean;
    resendTimer: number;
    startResendTimer: () => void;
    fetchVerificationCode: (email: string) => void;
    getValues: (field: string) => string;
}

export interface TokenInfo {
    access_token: string;
    refresh_token: string;
}
