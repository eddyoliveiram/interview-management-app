import React from 'react';
import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VagaDeleteConfirm from './VagaDeleteConfirm';

const VagaActions = ({ vaga, onEdit, onDelete }) => {
    return (
        <Box display="flex" alignItems="center">
            <IconButton color="primary" onClick={() => onEdit(vaga)}>
                <EditIcon />
            </IconButton>
            <VagaDeleteConfirm vaga={vaga} onDelete={onDelete} />
        </Box>
    );
};

export default VagaActions;
