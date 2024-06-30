import GoogleSignInButton from './GoogleSignInButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignMessageLink from './SignMessageLink';
import { SignButtonGroupProps } from '../types';

function SignButtonGroup({ config, children }: SignButtonGroupProps) {
    const { message, linkText, linkTo, googleButtonText } = config;

    return (
        <>
            <section className="w-full min-w-[200px]">
                <div className="flex flex-col gap-4">
                    {children}

                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <GoogleSignInButton googleButtonText={googleButtonText} />
                    </GoogleOAuthProvider>
                    <SignMessageLink message={message} linkText={linkText} linkTo={linkTo} />
                </div>
            </section>
        </>
    );
}

export default SignButtonGroup;
