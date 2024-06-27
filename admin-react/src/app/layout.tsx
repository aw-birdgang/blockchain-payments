import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/app/SessionProvider';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { cookies } from 'next/headers';
import { COOKIE_LANGUAGE_CODE, COOKIE_MENU_FOLD } from '@/common/constants/values';
import StoreInitializer from '@/app/StoreInitializer';
import { useLanguageStore } from '@/common/states/locale';
import { LANG_EN, LANG_LO } from '@/common/locale/lang';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

// 글로벌 폰트 정의
const inter = Inter({ subsets: ['latin'] });

// nextjs 에서 fontawesome 을 사용하는 경우 아이콘이 깨지는 현상 수정
config.autoAddCss = false;

// 앱의 헤더 태그에 표시될 기본 메타데이터 정의 (nextjs 내장 기능)
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * 쿠키로부터 현재 설정된 언어 종류를 읽어와 상태를 설정
 */
function setLanguage(cookies: ReadonlyRequestCookies) {
  const langCookie = cookies.get(COOKIE_LANGUAGE_CODE)?.value ?? 'en';
  const language = langCookie === 'en' ? LANG_EN : LANG_LO;
  useLanguageStore.setState?.({
    language: langCookie,
    langSet: language,
  });
  return langCookie;
}

/**
 * 쿠키로부터 현재 메뉴 폴딩 상태를 읽어옴
 */
function getMenuFold(cookies: ReadonlyRequestCookies) {
  return cookies.get(COOKIE_MENU_FOLD)?.value ?? 'y';
}

/**
 * 최상위 루트 레이아웃. provider 및 상태 정의
 *
 * @param children
 * @constructor
 */
export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  // next-auth 현재 인증된 세션 객체 가져오기
  const session = await getServerSession();
  const currentCookies = cookies();
  const lang = setLanguage(currentCookies);
  const foldMenu = getMenuFold(currentCookies);

  return (
    <html lang={lang}>
    <body className={inter.className}>
    {/* next-auth 의 세션 상태 정의 프로바이더 */}
    <SessionProvider session={session}>
      {/* 그 밖에 전역으로 선언되어야 할 provider 정의 */}
      <Providers>
        {children}
        {/* 서버사이드에 저장된 상태 변수를 클라이언트 쪽으로 전파 */}
        <StoreInitializer lang={lang} foldMenu={foldMenu} />
      </Providers>
    </SessionProvider>
    </body>
    </html>
  );
}