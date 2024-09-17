import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Typography  } from '@mui/material';

const VagaFormModal = ({ open, onClose, vaga, onSave }) => {
    const [formData, setFormData] = useState({
        empresa: '',
        cargo: '',
        descricaoVaga: '',
        curriculoEnviado: null,
        salarioModalidade: '',
        origem: 'Jobs',
        status: 'Currículo Enviado',
    });

    // Atualiza os dados do formulário quando o modal de edição é aberto
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
            // Limpa o formulário se não houver vaga (ao adicionar uma nova vaga)
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
    }, [vaga]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('empresa', formData.empresa);
        formDataToSend.append('cargo', formData.cargo);
        formDataToSend.append('descricaoVaga', formData.descricaoVaga);
        formDataToSend.append('curriculoEnviado', formData.curriculoEnviado); // Envia o arquivo
        formDataToSend.append('salarioModalidade', formData.salarioModalidade);
        formDataToSend.append('origem', formData.origem);
        formDataToSend.append('status', formData.status);

        onSave(formDataToSend); // Envia os dados ao backend para salvar
        onClose(); // Fecha o modal após salvar
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
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Salário/Modalidade"
                                name="salarioModalidade"
                                value={formData.salarioModalidade}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant="contained" // Botão cheio (primary)
                                color="primary"
                                component="label"
                                fullWidth
                            >
                                Upload de Currículo
                                <input
                                    type="file"
                                    hidden
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
                <Button onClick={onClose} color="">
                    Cancelar
                </Button>
                <Button type="submit" onClick={handleSubmit} variant="contained" color="success">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VagaFormModal;
