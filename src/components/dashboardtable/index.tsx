import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Audit } from '../../types/audit'; // Importamos la interfaz Audit

interface CustomizedTableProps {
    rows: Audit[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#00004b',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CustomizedTable: React.FC<CustomizedTableProps> = ({ rows }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>Fecha de Auditoría</StyledTableCell>
                        <StyledTableCell>Tipo de Auditoría</StyledTableCell>
                        <StyledTableCell>Auditado</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((audit) => (
                        <StyledTableRow key={audit.id}>
                            <StyledTableCell>{audit.id}</StyledTableCell>
                            <StyledTableCell>{audit.auditDate.split('-').reverse().join('/')}</StyledTableCell>
                            <StyledTableCell>{audit.idTipoAuditoria.auditType}</StyledTableCell>
                            <StyledTableCell>{audit.idAuditado.audited}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomizedTable;
