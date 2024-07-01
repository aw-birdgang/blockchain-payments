import { FormRowVerticalProps } from './types';

export default function FormRowVertical({ children }: FormRowVerticalProps) {
    return <div className="flex flex-col mt-3">{children}</div>;
}
