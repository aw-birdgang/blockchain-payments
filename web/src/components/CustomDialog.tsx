import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography,
} from '@material-tailwind/react';
import { CustomDialogProps } from './types';

export default function CustomDialog({
    open,
    title,
    bodyContent,
    onCancel,
    onConfirm,
}: CustomDialogProps) {
    return (
        <Dialog open={open} handler={onCancel}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody className="h-[42rem] overflow-scroll">
                <Typography className="font-normal">{bodyContent}</Typography>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="text" color="red" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="gradient" color="red" onClick={onConfirm}>
                    Confirm
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
