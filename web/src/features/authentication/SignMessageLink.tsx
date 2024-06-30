import { Typography } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthMessageLinkProps } from '../types';

export default function AuthMessageLink({ message, linkText, linkTo }: AuthMessageLinkProps) {
    const { t } = useTranslation();
    return (
        <Typography color="gray" className="mt-6 text-center font-normal">
            {t(message)}{' '}
            <NavLink to={linkTo} className="font-medium text-red-900">
                {t(linkText)}
            </NavLink>
        </Typography>
    );
}
