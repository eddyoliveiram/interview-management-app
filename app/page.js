"use client"
import React, { useState, useEffect } from 'react';
import VagaTable from '@/app/components/VagaTable';
import VagaFormModal from '@/app/components/VagaFormModal';
import { fetchVagas, createVaga, updateVaga, deleteVaga } from '@/app/services/VagaService';
import { Button } from '@mui/material';

const Home = () => {
    const [vagas, setVagas] = useState([]);
    const [currentVaga, setCurrentVaga] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const loadVagas = async () => {
            const data = await fetchVagas();
            setVagas(data);
        };
        loadVagas();
    }, []);

    const handleEdit = (vaga) => {
        setCurrentVaga(vaga);
        setModalOpen(true);
    };

    const handleDelete = async (vagaId) => {
        if (confirm("Tem certeza que deseja deletar esta vaga?")) {
            await deleteVaga(vagaId);
            const updatedVagas = await fetchVagas();
            setVagas(updatedVagas);
        }
    };

    const handleSave = async (vaga) => {
        if (vaga._id) {
            await updateVaga(vaga);
        } else {
            await createVaga(vaga);
        }
        const updatedVagas = await fetchVagas();
        setVagas(updatedVagas);
        setModalOpen(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button variant="contained" color="success" onClick={() => handleEdit(null)}>
                Adicionar Vaga
            </Button>
            <VagaTable vagas={vagas} onEdit={handleEdit} onDelete={handleDelete} />
            <VagaFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                vaga={currentVaga}
                onSave={handleSave}
            />
        </div>
    );
};

export default Home;
