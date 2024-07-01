import { Locale } from 'date-fns/locale';

export interface LocaleMap {
    [key: string]: Locale;
}

export interface LocalizedDateFormat {
    [key: string]: string;
}

export interface FormatDateFunction {
    (date: Date, language: string): string;
}
