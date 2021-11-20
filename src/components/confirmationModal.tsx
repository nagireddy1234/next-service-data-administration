import { Button, Grid, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';

interface Props {
    openOrNot: boolean;
    onClose: () => void;
    children: React.ReactElement;
}

const ConfirmationModal: FC<Props> = ({ openOrNot, onClose, children }) => {
    return (
        <Modal
            keepMounted
            open={openOrNot}
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            {children}
        </Modal>
    );
};

export default ConfirmationModal;
