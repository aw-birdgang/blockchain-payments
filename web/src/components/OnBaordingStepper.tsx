import React from 'react';
import { Stepper, Step, Typography } from '@material-tailwind/react';
import { UserIcon, DocumentIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { OnboardingStepperProps } from './types';

export const OnBaordingStepper: React.FC<OnboardingStepperProps> = ({
    activeStep,
    setActiveStep,
    setIsLastStep,
    setIsFirstStep,
}) => {
    return (
        <div className="max-w-xl px-3">
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
                className=""
                lineClassName=""
                activeLineClassName="bg-red-500"
            >
                <Step
                    className="rounded-md bg-gray-300 text-white"
                    activeClassName="bg-red-500"
                    completedClassName="bg-red-500"
                    onClick={() => setActiveStep(0)}
                >
                    <DocumentIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography variant="h6" color={activeStep >= 0 ? 'red' : 'gray'}>
                            Step 1
                        </Typography>
                    </div>
                </Step>
                <Step
                    className="rounded-md bg-gray-300 text-white"
                    activeClassName="bg-red-500"
                    completedClassName="bg-red-500"
                    onClick={() => setActiveStep(1)}
                >
                    <UserIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography variant="h6" color={activeStep >= 1 ? 'red' : 'gray'}>
                            Step 2
                        </Typography>
                    </div>
                </Step>
                <Step
                    className="rounded-md bg-gray-300 text-white"
                    activeClassName="bg-red-500"
                    completedClassName="bg-red-500"
                    onClick={() => setActiveStep(2)}
                >
                    <CheckCircleIcon className="h-5 w-5" />

                    <div className="absolute -bottom-[2.5rem] w-max text-center">
                        <Typography variant="h6" color={activeStep >= 2 ? 'red' : 'gray'}>
                            Step 3
                        </Typography>
                    </div>
                </Step>
            </Stepper>
        </div>
    );
};
