import {Card, CardBody} from '@material-tailwind/react';
import {TopRightProps} from './types';

export default function TopRight({ className }: TopRightProps) {
    return (
        <>
            <Card className={`mt-6 w-50 col-span-1 bg-blue-gray-500  ${className}`}>
                <CardBody>
                </CardBody>
            </Card>
        </>
    );
}
