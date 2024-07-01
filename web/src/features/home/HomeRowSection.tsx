import { useTranslation } from 'react-i18next';
import { HomeCardProps } from '../types';
import { Typography } from '@material-tailwind/react';

export default function HomeRowSection({ title, children }: HomeCardProps) {
    const { t } = useTranslation();

    return (
        <div className="mb-3">
            <div className="flex justify-between">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                    {/* {t('information_menu')}
                    {title} */}
                    {t(`${title}`)}
                </Typography>
                <Typography color="gray" className="mb-2">
                    {'View all'}
                </Typography>
            </div>
            {children}
        </div>
    );
}
