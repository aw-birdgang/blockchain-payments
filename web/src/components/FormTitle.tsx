import { Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { FormTitleProps } from './types';

export default function FormTitle({ title, subtitle }: FormTitleProps) {
    const { t } = useTranslation();
    return (
        <>
            <Typography variant="h3" color="blue-gray" className="mb-2 text-left">
                {t(title)}
            </Typography>
            <Typography color="gray" className="mb-16 font-normal text-left">
                {t(subtitle)}
            </Typography>
        </>
    );
}
