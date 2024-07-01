import {useGoogleLogin} from '@react-oauth/google';
import {useProviderSigninWithGoogle} from './useProviderSigninWithGoogle';
import {GoogleApisClient} from '../../httpClient/GoogleApisClient';
import {GoogleApisService} from '../../services/GoogleApisService';

export function useSignInWithGoogle() {
    const providerSignInWithGoogle = useProviderSigninWithGoogle();
    const googleApisClient = new GoogleApisClient();
    const googleAuthService = new GoogleApisService(googleApisClient);

    const signInWithGoogle = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            if (codeResponse && codeResponse.access_token) {
                const userInfo = await googleAuthService.getUserInfoFromGoogle(
                    codeResponse.access_token,
                );
                const { id, email, given_name, family_name } = userInfo;
                const requestData = {
                    id,
                    email,
                    firstName: given_name,
                    lastName: family_name,
                };

                await providerSignInWithGoogle(requestData);
            }
        },
    });

    return signInWithGoogle;
}
