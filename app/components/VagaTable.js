import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
    Link,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VagaActions from './VagaActions';

const VagaTable = ({
                       vagas,
                       onEdit,
                       onDelete,
                       page,
                       rowsPerPage,
                       totalVagas,
                       handleChangePage,
                       handleChangeRowsPerPage,
                   }) => {
    if (!vagas || vagas.length === 0) {
        return <Typography variant="body1">Nenhuma vaga disponível</Typography>;
    }

    return (
        <TableContainer component={Paper} sx={{ marginTop: '20px', width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow className={'bg-gray-200'}>
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
                <TableBody
                    sx={{
                    '& .MuiTableCell-root': {
                        fontWeight: 'bold',
                        },
                    }}
                >
                    {vagas.map((vaga) => (
                        <TableRow
                            key={vaga._id}
                            sx={{
                                backgroundColor:
                                    vaga.status === 'Currículo Rejeitado' ? '#f8d7da' : 'transparent',
                            }}
                        >
                            <TableCell>{vaga.empresa}</TableCell>
                            <TableCell>{vaga.cargo}</TableCell>
                            <TableCell>{vaga.descricaoVaga}</TableCell>
                            <TableCell align="center">
                                {vaga.curriculoEnviado ? (
                                    <Link
                                        href={vaga.curriculoEnviado}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <VisibilityIcon sx={{ marginRight: '5px' }} />
                                        Ver
                                    </Link>
                                ) : (
                                    'Nenhum documento'
                                )}
                            </TableCell>
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
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </TableContainer>
    );
};

export default VagaTable;
