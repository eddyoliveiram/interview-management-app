import Swal from 'sweetalert2';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const VagaDeleteConfirm = ({ vaga, onDelete }) => {
    const handleDelete = () => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/vagas/${vaga._id}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Erro ao deletar vaga');
                    }

                    // Exibir mensagem de sucesso e atualizar a lista
                    Swal.fire('Excluído!', 'A vaga foi excluída com sucesso.', 'success');
                    onDelete(vaga._id); // Atualiza a lista de vagas após a exclusão
                } catch (error) {
                    // Exibir erro, caso ocorra
                    Swal.fire('Erro!', error.message, 'error');
                }
            }
        });
    };

    return (
        <IconButton color="error" onClick={handleDelete} style={{ marginLeft: '10px' }}>
            <DeleteIcon />
        </IconButton>
    );
};

export default VagaDeleteConfirm;
