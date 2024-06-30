import {Card, CardBody, CardFooter} from '@material-tailwind/react';
import {TopCenterProps} from '../types';

export default function TopCenter({ className }: TopCenterProps) {
    return (
        <>
            <Card className={`mt-6 w-full bg-blue-600 ${className}`}>
                <CardBody className="text-center">
                </CardBody>
                <CardFooter className="text-center pt-0">
                </CardFooter>
            </Card>
        </>
    );
}
