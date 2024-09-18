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

// Função para calcular a diferença de dias
const calcularDiasDesde = (data) => {
    const dataAtual = new Date();
    const dataCriacao = new Date(data);
    const diferencaTempo = dataAtual - dataCriacao; // Diferença em milissegundos
    const diferencaDias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24)); // Convertendo para dias
    return diferencaDias;
};

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
                        <TableCell><strong>Link da Vaga</strong></TableCell>
                        <TableCell><strong>Currículo Enviado</strong></TableCell>
                        <TableCell><strong>Salário/Modalidade</strong></TableCell>
                        <TableCell><strong>Origem</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Enviado há</strong></TableCell> {/* Nova Coluna */}
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
                            <TableCell align="center">
                                {vaga.descricaoVaga ? (
                                    <Link
                                        href={vaga.descricaoVaga} // URL da descrição da vaga
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <VisibilityIcon sx={{ marginRight: '5px' }} />
                                        Ver
                                    </Link>
                                ) : (
                                    'Nenhuma descrição'
                                )}
                            </TableCell>

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
                                {vaga.createdAt ? `${calcularDiasDesde(vaga.createdAt)} dias atrás` : 'Data desconhecida'}
                            </TableCell> {/* Exibe a diferença de dias */}
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
