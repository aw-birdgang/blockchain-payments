import { formatDate } from '../utils/dateUtils'; // formatDate 함수 import
import { useTranslation } from 'react-i18next';

export default function DateComponent({ date }: { date?: Date | null }) {
    const { i18n } = useTranslation();
    const currentDate = date || new Date();

    const formattedDate = formatDate(currentDate, i18n.language);

    return <span>{formattedDate}</span>;
}
