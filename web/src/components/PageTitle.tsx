import { Typography } from '@material-tailwind/react';
import { PageTitleProps } from './types';

export default function PageTitle({ title, subtitle }: PageTitleProps): JSX.Element {
    return (
        <div className="flex flex-col gap-3 my-10">
            <Typography color="black" variant="h1" className="text-3xl font-bold mb-2">
                {title}
            </Typography>
            <Typography variant="lead" className="text-lg">
                {subtitle}
            </Typography>
        </div>
    );
}
