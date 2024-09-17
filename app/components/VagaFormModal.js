import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    MenuItem,
    Grid,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
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
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (vaga) {
            setFormData({
                empresa: vaga.empresa || '',
                cargo: vaga.cargo || '',
                descricaoVaga: vaga.descricaoVaga || '',
                curriculoEnviado: vaga.curriculoEnviado || '',
                salarioModalidade: vaga.salarioModalidade || '',
                origem: vaga.origem || 'Jobs',
                status: vaga.status || 'Currículo Enviado',
            });
        } else {
            setFormData({
                empresa: '',
                cargo: '',
                descricaoVaga: '',
                curriculoEnviado: '',
                salarioModalidade: '',
                origem: 'Jobs',
                status: 'Currículo Enviado',
            });
        }
        setErrors({});
    }, [vaga]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
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
            setFormData((prevData) => ({
                ...prevData,
                curriculoEnviado: file,
            }));
        } else {
            alert('Apenas arquivos PDF ou Word (.docx) são permitidos');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validações
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

        let fileUrl = '';

        if (formData.curriculoEnviado instanceof File) {
            // Upload do novo arquivo
            const formDataUpload = new FormData();
            formDataUpload.append('file', formData.curriculoEnviado);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formDataUpload,
                });

                const result = await response.json();
                if (response.ok) {
                    fileUrl = result.fileUrl;
                } else {
                    console.error('Erro ao fazer upload:', result.error);
                    return;
                }
            } catch (error) {
                console.error('Erro ao fazer upload:', error);
                return;
            }
        } else if (
            typeof formData.curriculoEnviado === 'string' &&
            formData.curriculoEnviado !== ''
        ) {
            // Manter a URL existente do currículo
            fileUrl = formData.curriculoEnviado;
        } else {
            fileUrl = ''; // Ou null, dependendo da sua implementação
        }

        const vagaData = {
            empresa: formData.empresa,
            cargo: formData.cargo,
            descricaoVaga: formData.descricaoVaga,
            salarioModalidade: formData.salarioModalidade,
            origem: formData.origem,
            status: formData.status,
            curriculoEnviado: fileUrl,
        };

        try {
            if (vaga && vaga._id) {
                // Atualizando vaga existente
                await updateVaga({ ...vagaData, _id: vaga._id });
                Swal.fire({
                    icon: 'success',
                    title: 'Vaga atualizada com sucesso!',
                    text: 'A vaga foi atualizada com sucesso.',
                });
            } else {
                // Criando nova vaga
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Empresa"
                                name="empresa"
                                value={formData.empresa}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.empresa}
                                helperText={errors.empresa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Cargo"
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.cargo}
                                helperText={errors.cargo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Salário/Modalidade"
                                name="salarioModalidade"
                                value={formData.salarioModalidade}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.salarioModalidade}
                                helperText={errors.salarioModalidade}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                component="label"
                                fullWidth
                            >
                                Upload de Currículo
                                <input
                                    type="file"
                                    hidden
                                    name="curriculoEnviado"
                                    onChange={handleFileChange}
                                    accept=".pdf, .docx"
                                />
                            </Button>
                            {formData.curriculoEnviado && (
                                <Typography variant="body2" color="textSecondary">
                                    Arquivo selecionado:{' '}
                                    {formData.curriculoEnviado instanceof File
                                        ? formData.curriculoEnviado.name
                                        : 'Arquivo já carregado'}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição da Vaga"
                                name="descricaoVaga"
                                value={formData.descricaoVaga}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                                required
                                error={!!errors.descricaoVaga}
                                helperText={errors.descricaoVaga}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Origem"
                                name="origem"
                                value={formData.origem}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.origem}
                                helperText={errors.origem}
                            >
                                <MenuItem value="Jobs">Jobs</MenuItem>
                                <MenuItem value="Post">Post</MenuItem>
                                <MenuItem value="Chat">Chat</MenuItem>
                                <MenuItem value="Outros Sites">Outros Sites</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.status}
                                helperText={errors.status}
                            >
                                <MenuItem value="Currículo Enviado">
                                    Currículo Enviado
                                </MenuItem>
                                <MenuItem value="Currículo Rejeitado">
                                    Currículo Rejeitado
                                </MenuItem>
                                <MenuItem value="Fase 01">Fase 01</MenuItem>
                                <MenuItem value="Fase 02">Fase 02</MenuItem>
                                <MenuItem value="Fase 03">Fase 03</MenuItem>
                                <MenuItem value="Fase 04">Fase 04</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
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
