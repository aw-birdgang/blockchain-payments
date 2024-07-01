import { Button } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { GoogleSignInButtonProps } from '../types';
import { useSignInWithGoogle } from './useSignInWithGoogle';

const GoogleSignInButton = ({ googleButtonText }: GoogleSignInButtonProps) => {
    const { t } = useTranslation();
    const signInWithGoogle = useSignInWithGoogle();

    return (
        <Button
            onClick={() => signInWithGoogle()}
            color="white"
            size="lg"
            className="flex h-12 items-center justify-center gap-2"
            fullWidth
        >
            <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
            />
            {t(googleButtonText)}
        </Button>
    );
};

export default GoogleSignInButton;
