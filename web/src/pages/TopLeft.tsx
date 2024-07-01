import {Card, CardBody} from '@material-tailwind/react';
import {TopLeftProps} from "./types";

export default function TopLeft({ className, }: TopLeftProps) {
    return (
        <>
            <Card className={`mt-6 w-50 bg-blue-gray-500  ${className}`}>
                <CardBody>
                </CardBody>
            </Card>
        </>
    );
}
