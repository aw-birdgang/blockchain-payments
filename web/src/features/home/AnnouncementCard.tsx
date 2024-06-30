import {Card, CardBody} from '@material-tailwind/react';
import {useTranslation} from 'react-i18next';
import React from 'react';

export default function AnnouncementCard() {
    const { i18n } = useTranslation();
    return (
        <Card className="mt-6">
            <CardBody>
                <div className="grid grid-cols-[auto_1fr] gap-2">
                </div>
            </CardBody>
        </Card>
    );
}
