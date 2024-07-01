import React, { useState, useEffect } from 'react';
import { Alert, Checkbox, Typography } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import AlertIcon from '../../components/AlertIcon';
import CustomDialog from '../../components/CustomDialog';
import { TERMSCONTENT } from '../../utils/termsContent';
import { useFormContext } from 'react-hook-form';
import SignFormControls from './SignFormControls';
import PasswordCriteria from './PasswordCriteria';
import { SignupStep1Props } from '../types';

export default function SignupStep1({
    errorsFromServer,
    setErrorsFromServer,
    setIsFormValid,
}: SignupStep1Props) {
    const { t } = useTranslation();
    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const { watch } = useFormContext();
    const password = watch('password', '');
    const isMinLengthValid = password.length >= 8;
    const isCapitalAndNumberValid = /[A-Z]/.test(password) && /\d/.test(password);

    const handleOpenDialog = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        setOpenDialog(!openDialog);
    };

    const handleConfirm = () => {
        setIsChecked(true);
        setOpenDialog(false);
    };

    const handleCancel = () => {
        setIsChecked(false);
        setOpenDialog(false);
    };

    useEffect(() => {
        if (errorsFromServer) {
            setOpenErrorMessage(true);
        }
    }, [errorsFromServer]);

    useEffect(() => {
        setIsFormValid(isMinLengthValid && isCapitalAndNumberValid && isChecked);
    }, [isMinLengthValid, isCapitalAndNumberValid, isChecked, setIsFormValid]);

    const handleCheckboxChange = () => {
        //noop
    };

    return (
        <>
            <Typography variant="h5">계정 정보를 입력해주세요.</Typography>
            <Typography variant="small">Sign up에 필요한 정보를 작성해주세요.</Typography>
            {openErrorMessage && (
                <Alert
                    className="mt-4"
                    open={openErrorMessage}
                    onClose={() => {
                        setOpenErrorMessage(false);
                        setErrorsFromServer('');
                    }}
                    icon={<AlertIcon />}
                    color="red"
                >
                    {t(`${errorsFromServer}`)}
                </Alert>
            )}
            {/* TODO : setButtonEnabled 사인업에서는 안 쓰이니까 없애는 방향으로 리팩토링 하기 */}
            <SignFormControls setButtonEnabled={() => {}} />
            <PasswordCriteria
                isMinLengthValid={isMinLengthValid}
                isCapitalAndNumberValid={isCapitalAndNumberValid}
            />
            <Checkbox
                label={
                    <div color="blue-gray" className="flex font-medium">
                        I agree with the
                        <Typography color="red" className="font-medium">
                            &nbsp;terms and conditions
                        </Typography>
                        .
                    </div>
                }
                crossOrigin={null}
                containerProps={{ className: '-ml-2.5' }}
                color="red"
                checked={isChecked}
                onClick={handleOpenDialog}
                onChange={handleCheckboxChange}
            />
            <CustomDialog
                open={openDialog}
                title="Terms of Service"
                bodyContent={TERMSCONTENT}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
}
