import { Typography } from '@material-tailwind/react';

export default function SignupStep3() {
    return (
        <>
            <Typography className="mt-6" variant="h4">
                All done!
            </Typography>
            <Typography className="mt-3 mb-14 text-base font-medium text-gray-500" variant="lead">
                Your account verification has been successfully completed.
            </Typography>
        </>
    );
}
