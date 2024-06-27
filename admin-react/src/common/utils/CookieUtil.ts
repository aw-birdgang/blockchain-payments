import Cookies from 'js-cookie';
import { COOKIE_ACCOUNT_EMAIL, COOKIE_LANGUAGE_CODE, COOKIE_MENU_FOLD, COOKIE_REMEMBER_ACCOUNT } from '@/common/constants/values';

export class CookieUtil {
    private static instance: CookieUtil;

    /**
     * (private) 쿠키에 값 저장
     * @param {string} name 쿠키 이름
     * @param {string} value 저장될 값
     * @param {number} expire 만료 기간 (초)
     * @private
     */
    private static setCookie(name: string, value: string, expire: number) {
        Cookies.set(name, value, {
            path: '/',
            expires: expire,
            secure: false,
            sameSite: 'strict',
        });
    }

    /**
     * (private) 쿠키 불러오기
     * @param {string} name 쿠키 이름
     * @private
     */
    private static getCookie(name: string) {
        return Cookies.get(name);
    }

    /**
     * (private) 쿠키 삭제
     * @param {string} name 쿠키 이름
     * @private
     */
    private static deleteCookie(name: string) {
        return Cookies.remove(name);
    }

    /**
     * 언어 설정 쿠키에 저장
     * @param {string} locale 언어 키 (영어: en, 싱할라어: si, 라오스: lo)
     */
    public static setLanguage(locale: string): void {
        return this.setCookie(COOKIE_LANGUAGE_CODE, locale, 30);
    }

    /**
     * 언어 설정 쿠키로부터 불러오기
     */
    public static getLanguage(): { [p: string]: string } {
        return this.getCookie(COOKIE_LANGUAGE_CODE);
    }

    /**
     * 계정 비밀번호 저장 여부 쿠키에 저장
     * @param remember
     */
    public static setRememberAccount(remember: 'y' | 'n') {
        return this.setCookie(COOKIE_REMEMBER_ACCOUNT, remember, 30);
    }

    /**
     * 계정 비밀번호 저장 여부 쿠키에서 불러오기
     */
    public static getRememberAccount() {
        return this.getCookie(COOKIE_REMEMBER_ACCOUNT);
    }

    /**
     * 계정 이메일 쿠키에 저장
     * @param {string} email
     */
    public static setAccountEmail(email: string) {
        return this.setCookie(COOKIE_ACCOUNT_EMAIL, email, 30);
    }

    /**
     * 계정 이메일 쿠키에서 불러오기
     */
    public static getAccountEmail() {
        return this.getCookie(COOKIE_ACCOUNT_EMAIL);
    }

    /**
     * 계정 이메일 쿠키에서 삭제
     */
    public static deleteAccountEmail() {
        return this.deleteCookie(COOKIE_ACCOUNT_EMAIL);
    }

    /**
     * 메뉴가 열려있는지 여부 쿠키에 저장
     * @param {string} fold
     */
    public static setMenuFold(fold: string) {
        return this.setCookie(COOKIE_MENU_FOLD, fold, 30);
    }

    /**
     * 메뉴가 열려있는지 여부 불러오기
     */
    public static getMenuFold() {
        return this.getCookie(COOKIE_MENU_FOLD);
    }
}