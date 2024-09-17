import React from 'react';
import { TextField, MenuItem, Grid, Button, Typography } from '@mui/material';

const FormFields = ({ formData, handleChange, handleFileChange, errors }) => (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
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
);

export default FormFields;
