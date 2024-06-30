import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { PasswordCriteriaProps } from '../types';

const PasswordCriteria: React.FC<PasswordCriteriaProps> = ({
    isMinLengthValid,
    isCapitalAndNumberValid,
}) => {
    return (
        <ul>
            <li
                className={`text-sm font-normal ${isMinLengthValid ? 'text-red-600' : 'text-gray-600'}`}
            >
                <CheckIcon className="h-4 inline-block mr-1" />
                At least 8 characters
            </li>
            <li
                className={`text-sm font-normal ${isCapitalAndNumberValid ? 'text-red-600' : 'text-gray-600'}`}
            >
                <CheckIcon className="h-4 inline-block mr-1" />
                At least 1 capital character & number
            </li>
        </ul>
    );
};

export default PasswordCriteria;
