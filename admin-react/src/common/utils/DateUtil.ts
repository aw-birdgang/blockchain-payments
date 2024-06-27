import { StringUtil } from '@/common/utils/StringUtil';

export class DateUtil {
    public static getFullDate(str: string, locale: string = 'en') {
        const localeMap: { [key: string]: string } = {
            ko: 'ko',
            lo: 'en-GB',
            en: 'en'
        };
        const code = localeMap[locale] || 'en';
        if (StringUtil.isBlank(str)) return '-';
        const date = new Date(str).toLocaleDateString(code);
        return date;
    }

    public static getFullDateTime(date: Date | string = new Date(Date.now()), locale: string = 'en') {
        if (typeof date === 'string') date = new Date(date);

        const localeMap: { [key: string]: string } = {
            ko: 'ko',
            lo: 'en-GB',
            en: 'en'
        };
        const code = localeMap[locale] || 'en';
        const dateString = date.toLocaleDateString(code);
        const timeString = date.toLocaleTimeString(code, {
            hour12: false,
            timeStyle: 'medium'
        });

        return `${dateString} ${timeString}`;
    }

}