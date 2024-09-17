import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

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
                curriculoEnviado: vaga.curriculoEnviado || null,
                salarioModalidade: vaga.salarioModalidade || '',
                origem: vaga.origem || 'Jobs',
                status: vaga.status || 'Currículo Enviado',
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

        // Limpa o erro do campo atual
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFormData({
                ...formData,
                curriculoEnviado: file,
            });
        } else {
            alert("Apenas arquivos PDF ou Word (.docx) são permitidos");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.empresa) validationErrors.empresa = 'Campo obrigatório';
        if (!formData.cargo) validationErrors.cargo = 'Campo obrigatório';
        if (!formData.salarioModalidade) validationErrors.salarioModalidade = 'Campo obrigatório';
        if (!formData.descricaoVaga) validationErrors.descricaoVaga = 'Campo obrigatório';
        if (!formData.origem) validationErrors.origem = 'Campo obrigatório';
        if (!formData.status) validationErrors.status = 'Campo obrigatório';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let fileUrl = '';

        if (formData.curriculoEnviado) {
            const uploadFile = async () => {
                const formDataUpload = new FormData();
                const file = formData.curriculoEnviado;

                formDataUpload.append("file", file);

                try {
                    const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formDataUpload,
                    });

                    const result = await response.json();
                    if (response.ok) {
                        return result.fileUrl;
                    } else {
                        console.error("Erro ao fazer upload:", result.error);
                        return null;
                    }
                } catch (error) {
                    console.error("Erro ao fazer upload:", error);
                    return null;
                }
            };

            fileUrl = await uploadFile();

            if (!fileUrl) {
                console.error("Erro: a URL do arquivo não foi obtida.");
                return;
            }
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
            const response = await fetch('/api/vagas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vagaData),
            });

            const result = await response.json();
            if (response.ok) {
                onClose();
                Swal.fire({
                    icon: 'success',
                    title: 'Vaga criada com sucesso!',
                    text: 'A nova vaga foi salva com sucesso.',
                });
                refreshVagas();
            } else {
                console.error('Erro ao criar vaga:', result.message);
            }
        } catch (error) {
            console.error('Erro ao salvar a vaga:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{vaga ? 'Editar Vaga' : 'Adicionar Vaga'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className={'mt-4'}>
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
                                    Arquivo selecionado: {formData.curriculoEnviado.name}
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
                                <MenuItem value="Currículo Enviado">Currículo Enviado</MenuItem>
                                <MenuItem value="Currículo Rejeitado">Currículo Rejeitado</MenuItem>
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
                <Button type="submit" onClick={handleSubmit} variant="contained" color="success" startIcon={<SaveIcon />}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VagaFormModal;
