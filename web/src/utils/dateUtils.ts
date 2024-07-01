import {format} from 'date-fns';
import {enUS, ko} from 'date-fns/locale';
import {FormatDateFunction, LocaleMap, LocalizedDateFormat} from './types';

const localeMap: LocaleMap = {
    en: enUS,
    ko: ko,
};

const dateFormatMap: LocalizedDateFormat = {
    en: 'MM-dd-yyyy',
    ko: 'yyyy 년 MM월 dd일',
};

const formatDate: FormatDateFunction = (date, language) => {
    const locale = localeMap[language] || enUS;
    const dateFormat = dateFormatMap[language] || 'yyyy-MM-dd';
    return format(date, dateFormat, { locale });
};

export { formatDate };
