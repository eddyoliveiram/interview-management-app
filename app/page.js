"use client";
import React, { useState, useEffect } from 'react';
import VagaTable from '@/app/components/VagaTable';
import VagaFormModal from '@/app/components/VagaFormModal';
import { fetchVagas, deleteVaga } from '@/app/services/VagaService';
import { Button } from '@mui/material';
import Swal from 'sweetalert2';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const Home = () => {
    const [vagas, setVagas] = useState([]);
    const [currentVaga, setCurrentVaga] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalVagas, setTotalVagas] = useState(0);

    const refreshVagas = async (currentPage = 0, limit = 5) => {
        const { data, total } = await fetchVagas(currentPage, limit);
        setVagas(data);
        setTotalVagas(total);
    };

    useEffect(() => {
        refreshVagas(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const handleEdit = (vaga) => {
        setCurrentVaga(vaga);
        setModalOpen(true);
    };

    const handleDelete = async (vagaId, fileUrl) => {
        console.log('ID da vaga a ser deletada:', vagaId);
        console.log('URL do arquivo a ser deletado:', fileUrl);
        const result = await Swal.fire({
            title: 'Tem certeza que deseja deletar esta vaga?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, deletar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            await deleteVaga(vagaId, fileUrl);

            const remainingVagas = vagas.length - 1;

            if (remainingVagas === 0 && page > 0) {
                setPage(page - 1);
            }

            await refreshVagas(page, rowsPerPage);

            Swal.fire({
                icon: 'success',
                title: 'Deletado!',
                text: 'A vaga foi deletada com sucesso.',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };

    const handleSave = async () => {
        setPage(0);
        await refreshVagas(0, rowsPerPage);
        setModalOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button
                variant="contained"
                color="success"
                onClick={() => handleEdit(null)}
                startIcon={<AddCircleIcon />}
            >
                Adicionar Vaga
            </Button>
            <VagaTable
                vagas={vagas}
                onEdit={handleEdit}
                onDelete={handleDelete}
                page={page}
                rowsPerPage={rowsPerPage}
                totalVagas={totalVagas}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <VagaFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                vaga={currentVaga}
                refreshVagas={refreshVagas}
            />
        </div>
    );
};

export default Home;
