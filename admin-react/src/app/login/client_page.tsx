'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CButton from '@/common/components/form/CButton';
import { signIn, SignInResponse } from 'next-auth/react';
import { MenuUrl } from '@/common/constants/MenuUrl';
import MQuickSignInModal from '@/common/components/modal/MQuickSignInModal';
import { THEME_BUTTON } from '@/common/models/components';
import CTextField from '@/common/components/form/CTextField';
import { useLanguageStore } from '@/common/states/locale';
import './../globals.css';
import { CookieUtil } from '@/common/utils/CookieUtil';

interface SearchParams {
    reason?: string;
}

export default function LoginClientPage({ searchParams }: { searchParams: SearchParams }) {
    const router = useRouter();
    const lang = useLanguageStore.getState?.().langSet;

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showQuickSignIn, setShowQuickSignIn] = useState(false);

    useEffect(() => {
        if (searchParams.reason === MenuUrl.REDIRECT_REASON_DUPLICATE_LOGIN) {
            alert(lang.message_login_elsewhere);
            window.location.href = MenuUrl.LOGIN;
        }
    }, [searchParams, lang]);

    useEffect(() => {
        const cookieRemember = CookieUtil.getRememberAccount();
        setRemember(cookieRemember === 'y');
        if (cookieRemember === 'y') {
            const cookieEmail = CookieUtil.getAccountEmail();
            if (cookieEmail) setEmail(cookieEmail);
        }
    }, []);

    const handleSignIn = async (e : any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result: SignInResponse | undefined = await signIn('credentials', {
                username: email,
                password,
                redirect: false,
            });

            if (!result || result.status === 401 || result.ok === false) {
                alert(lang.message_login_failed);
            } else {
                remember ? CookieUtil.setAccountEmail(email) : CookieUtil.deleteAccountEmail();
                window.location.replace(MenuUrl.CONSOLE_DASHBOARD);
            }
        } catch (error) {
            console.error('## signIn() error >> ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRememberChange = () => {
        const newRemember = !remember;
        setRemember(newRemember);
        CookieUtil.setRememberAccount(newRemember ? 'y' : 'n');
    };

    return (
      <>
          <MQuickSignInModal show={showQuickSignIn} setShow={setShowQuickSignIn} targetUrl={MenuUrl.CONSOLE_DASHBOARD} />
          <div className="h-screen bg-gradient-to-br from-gray07 to-gray06">
              <div className="w-full flex min-h-full">
                  <div className="w-full flex flex-col justify-center items-center px-4 py-12">
                      <div className="mx-auto bg-white p-8 sm:p-14 rounded-xl shadow-2xl shadow-white/30">
                          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                              Sign in to your account
                          </h2>
                          <div className="mt-6">
                              <form className="space-y-4" onSubmit={handleSignIn}>
                                  <CTextField
                                    id="login-email-textfield"
                                    className="w-[280px] sm:w-[360px]"
                                    value={email}
                                    setValue={setEmail}
                                    label="Email"
                                    singleLine
                                  />
                                  <CTextField
                                    id="login-password-textfield"
                                    className="w-[280px] sm:w-[360px]"
                                    value={password}
                                    setValue={setPassword}
                                    type="password"
                                    label="Password"
                                    singleLine
                                  />
                                  <div className="flex flex-row gap-x-2 select-none cursor-pointer" onClick={handleRememberChange}>
                                      <input type="checkbox" checked={remember} readOnly />
                                      <div>{lang.remember_this_account}</div>
                                  </div>
                                  <CButton type="submit" text="Sign In" className="w-[280px] sm:w-[360px]" disabled={loading} />
                                  <CButton
                                    type="button"
                                    text="Quick Sign In"
                                    className="w-[280px] sm:w-[360px]"
                                    disabled={loading}
                                    color={THEME_BUTTON.white}
                                    onClick={() => setShowQuickSignIn(true)}
                                  />
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
}
