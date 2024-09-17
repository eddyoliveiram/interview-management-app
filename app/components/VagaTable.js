import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination } from '@mui/material';
import VagaActions from './VagaActions';

const VagaTable = ({ vagas, onEdit, onDelete, page, rowsPerPage, totalVagas, handleChangePage, handleChangeRowsPerPage }) => {
    if (!vagas || vagas.length === 0) {
        return <Typography variant="body1">Nenhuma vaga disponível</Typography>;
    }

    return (
        <TableContainer component={Paper} sx={{ marginTop: '20px', width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Empresa</strong></TableCell>
                        <TableCell><strong>Cargo</strong></TableCell>
                        <TableCell><strong>Descrição</strong></TableCell>
                        <TableCell><strong>Currículo Enviado</strong></TableCell>
                        <TableCell><strong>Salário/Modalidade</strong></TableCell>
                        <TableCell><strong>Origem</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Ações</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vagas.map((vaga) => (
                        <TableRow
                            key={vaga._id}
                            sx={{
                                backgroundColor: vaga.status === 'Currículo Rejeitado' ? '#f8d7da' : 'transparent',
                            }}
                        >
                            <TableCell>{vaga.empresa}</TableCell>
                            <TableCell>{vaga.cargo}</TableCell>
                            <TableCell>{vaga.descricaoVaga}</TableCell>
                            <TableCell>{vaga.curriculoEnviado}</TableCell>
                            <TableCell>{vaga.salarioModalidade}</TableCell>
                            <TableCell>{vaga.origem}</TableCell>
                            <TableCell>{vaga.status}</TableCell>
                            <TableCell>
                                <VagaActions vaga={vaga} onEdit={onEdit} onDelete={onDelete} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={totalVagas}
                page={page}
                onPageChange={handleChangePage}                // Use the prop here
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}  // And here
                rowsPerPageOptions={[5, 10, 25]}
            />
        </TableContainer>
    );
};

export default VagaTable;
