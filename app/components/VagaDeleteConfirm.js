import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const VagaDeleteConfirm = ({ vaga, onDelete }) => {
    const handleDelete = () => {
        onDelete(vaga._id);
    };

    return (
        <IconButton color="error" onClick={handleDelete} style={{ marginLeft: '10px' }}>
            <DeleteIcon />
        </IconButton>
    );
};

export default VagaDeleteConfirm;
