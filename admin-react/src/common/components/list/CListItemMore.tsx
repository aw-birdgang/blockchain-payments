'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import MBasicModal from './../modal/MBasicModal';

export default function CListBoardMore(props: {
    onEdit?: Function
    onDelete?: Function
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    return <>
        <div className={'flex flex-row justify-start'}>
            <button
                className={'flex flex-row me-4 px-2 py-2 border bg-white hover:bg-primary/20'}
                onClick={() => {
                    if (props.onEdit) props.onEdit();
                }}>
                <FontAwesomeIcon icon={faPenToSquare} />
                <div className={'ms-2 font-semibold'}>{'Edit'}</div>
            </button>
            <button
                className={'flex flex-row me-4 px-2 py-2 border bg-white hover:bg-primary/20'}
                onClick={() => {
                    setShowDeleteModal(true);
                }}>
                <FontAwesomeIcon icon={faTrash} />
                <div className={'ms-2 font-semibold'}>{'Delete'}</div>
            </button>
        </div>
        <MBasicModal show={showDeleteModal} setShow={setShowDeleteModal} onYesClicked={async () => {
            if (props.onDelete) props.onDelete();
        }} />
    </>;
}