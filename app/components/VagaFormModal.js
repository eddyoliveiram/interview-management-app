import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import FormFields from '@/app/components/VagaFormModal/FormFields';
import { createVaga, updateVaga } from '@/app/services/VagaService';

const VagaFormModal = ({ open, onClose, vaga, refreshVagas }) => {
    const [formData, setFormData] = useState({
        empresa: '',
        cargo: '',
        descricaoVaga: '',
        curriculoEnviado: null,
        salarioModalidade: '',
        origem: 'Jobs',
        status: 'Currículo Enviado',
        oldCurriculoEnviado: null,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (vaga) {
            setFormData({
                empresa: vaga.empresa || '',
                cargo: vaga.cargo || '',
                descricaoVaga: vaga.descricaoVaga || '',
                curriculoEnviado: null,
                salarioModalidade: vaga.salarioModalidade || '',
                origem: vaga.origem || 'Jobs',
                status: vaga.status || 'Currículo Enviado',
                oldCurriculoEnviado: vaga.curriculoEnviado || null,
            });
        } else {
            setFormData({
                empresa: '',
                cargo: '',
                descricaoVaga: '',
                curriculoEnviado: null,
                salarioModalidade: '',
                origem: 'Jobs',
                status: 'Currículo Enviado',
                oldCurriculoEnviado: null,
            });
        }
        setErrors({});
    }, [vaga]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (
            file &&
            (file.type === 'application/pdf' ||
                file.type ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        ) {
            setFormData({
                ...formData,
                curriculoEnviado: file,
            });
        } else {
            alert('Apenas arquivos PDF ou Word (.docx) são permitidos');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.empresa) validationErrors.empresa = 'Campo obrigatório';
        if (!formData.cargo) validationErrors.cargo = 'Campo obrigatório';
        if (!formData.salarioModalidade)
            validationErrors.salarioModalidade = 'Campo obrigatório';
        if (!formData.descricaoVaga)
            validationErrors.descricaoVaga = 'Campo obrigatório';
        if (!formData.origem) validationErrors.origem = 'Campo obrigatório';
        if (!formData.status) validationErrors.status = 'Campo obrigatório';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            let vagaData = { ...formData };

            if (formData.curriculoEnviado instanceof File) {
                const uniqueFilename = `${Date.now()}_${formData.curriculoEnviado.name}`;
                const formDataUpload = new FormData();
                formDataUpload.append('file', formData.curriculoEnviado, uniqueFilename);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formDataUpload,
                });

                const result = await response.json();
                if (response.ok) {
                    vagaData.curriculoEnviado = result.fileUrl;
                    if (formData.oldCurriculoEnviado) {
                        await fetch('/api/delete-file', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ fileUrl: formData.oldCurriculoEnviado }),
                        });
                    }
                } else {
                    console.error('Erro ao fazer upload:', result.error);
                    return;
                }
            } else if (formData.oldCurriculoEnviado) {
                vagaData.curriculoEnviado = formData.oldCurriculoEnviado;
            } else {
                vagaData.curriculoEnviado = null;
            }

            if (vaga && vaga._id) {
                await updateVaga({ ...vagaData, _id: vaga._id });
                Swal.fire({
                    icon: 'success',
                    title: 'Vaga atualizada com sucesso!',
                    text: 'A vaga foi atualizada com sucesso.',
                });
            } else {
                await createVaga(vagaData);
                Swal.fire({
                    icon: 'success',
                    title: 'Vaga criada com sucesso!',
                    text: 'A nova vaga foi salva com sucesso.',
                });
            }

            onClose();
            refreshVagas();
        } catch (error) {
            console.error('Erro ao salvar a vaga:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{vaga ? 'Editar Vaga' : 'Adicionar Vaga'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <FormFields
                        formData={formData}
                        handleChange={handleChange}
                        handleFileChange={handleFileChange}
                        errors={errors}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} startIcon={<CloseIcon />}>
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VagaFormModal;
