import React, { useState } from 'react';
import Button from "../button";
import Buttongroup from "../buttongroup";
import { Link } from "react-router-dom";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../table/style.css';
import {IoMdAdd} from "react-icons/io";
import AddModal from "../addmodal";

interface Data {
    auditNumber: number;
    auditDate: string;
    idTipoAuditoria: { auditType: string };
    idAuditado: { id: number, audited: string }
}

interface TableProps {
    data: Data[];
    onAuditClick: (auditNumber: number) => void;
    auditType: "commonAuditDetails" | "afipAuditDetails";
}

const Table: React.FC<TableProps> = ({ data, onAuditClick, auditType }) => {
    const [orderBy, setOrderBy] = useState<{ key: keyof Data, asc: boolean } | null>(null);
    const [page, setPage] = useState(1);
    const [estadoModal, cambiarEstadoModal] = useState(false);
    const resultsPerPage = 10; //Cantidad

    const handleClick = (auditNumber: number) => {
        onAuditClick(auditNumber);
    }

    const handleSort = (key: keyof Data) => {
        setOrderBy(prevState => {
            if (prevState && prevState.key === key) {
                return { key, asc: !prevState.asc };
            } else {
                return { key, asc: true };
            }
        });
    }

    const sortedData = orderBy ? [...data].sort((a, b) => {
        const aValue = orderBy.asc ? a[orderBy.key] : b[orderBy.key];
        const bValue = orderBy.asc ? b[orderBy.key] : a[orderBy.key];

        if (orderBy.key === 'auditDate' || orderBy.key === 'auditNumber') {
            // Si se está ordenando numéricamente (para auditNumber) o alfabéticamente (para auditDate)
            return orderBy.key === 'auditNumber' ? (aValue as number) - (bValue as number) : (aValue as string).localeCompare(bValue as string);
        } else {
            // Si se está ordenando alfabéticamente, convertimos los valores a cadenas y utilizamos localeCompare
            const aValueAsString = orderBy.key === 'idTipoAuditoria' ? (aValue as { auditType: string }).auditType : (aValue as { id: number, audited: string }).audited;
            const bValueAsString = orderBy.key === 'idTipoAuditoria' ? (bValue as { auditType: string }).auditType : (bValue as { id: number, audited: string }).audited;
            return aValueAsString.localeCompare(bValueAsString);
        }
    }) : data;

    const totalPages = Math.ceil(sortedData.length / resultsPerPage);
    const paginatedData = sortedData.slice((page - 1) * resultsPerPage, page * resultsPerPage);

    const addAudit = () => {
        cambiarEstadoModal(true); // Abre el detailsmodal
    }

    const isAudited = (user: Data): boolean => {
        return user.idAuditado.audited === 'Si';
    };


    return (
        <div id="bodywrap">
            <AddModal
                estado={estadoModal}
                cambiarEstadoModal={cambiarEstadoModal}
            />
            <div className="row">
                <div className="large-10 columns">
                    <div className="scroll-window-wrapper">
                        <h2>{auditType === 'commonAuditDetails' ? "Auditorias internas vigentes" : "Auditorias AFIP vigentes"}</h2>
                        <div>
                            <Buttongroup>
                                <div className="container">
                                    <Button
                                        type="button"
                                        backgroundColor="#00004b"
                                        hoverColor="#00004b"
                                        hoverBorderColor="2px solid #00004b"
                                        style={{ width: '140px', marginBottom: '10px'}}
                                        onClick={addAudit}>
                                        <IoMdAdd style={{ marginRight: '15px' }}/> Agregar
                                    </Button>
                                </div>
                            </Buttongroup>
                        </div>
                        <div className="table-wrapper">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-header">
                                    <tr>
                                        <th onClick={() => handleSort('auditDate')}>
                                            Fecha auditoria
                                            <span className="icon-right">
                                                    {orderBy && orderBy.key === 'auditDate' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                            </span>
                                        </th>
                                        <th  className="second-child" onClick={() => handleSort('auditNumber')}>
                                            N° de Auditoria
                                            <span className="icon-right">
                                                    {orderBy && orderBy.key === 'auditNumber' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                            </span>
                                        </th>
                                        <th  className="third-child" onClick={() => handleSort('idTipoAuditoria')}>
                                            Tipo de Auditoria
                                            <span className="icon-right">
                                                    {orderBy && orderBy.key === 'idTipoAuditoria' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                            </span>
                                        </th>
                                        <th  className="fourth-child" onClick={() => handleSort('idAuditado')}>
                                            Auditado
                                            <span className="icon-right">
                                                    {orderBy && orderBy.key === 'idAuditado' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                            </span>
                                        </th>
                                        <th><div></div></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {paginatedData.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.auditDate}</td>
                                            <td>{user.auditNumber}</td>
                                            <td>{user.idTipoAuditoria.auditType}</td>
                                            <td>{user.idAuditado.audited}</td>
                                            <td>
                                                <div className="center">
                                                    <Link to={`/${auditType}/${user.auditNumber}`}>
                                                        <Button
                                                            type="button"
                                                            label={isAudited(user) ? "Auditado" : "Ver detalle"}
                                                            {...(isAudited(user) && { color: "#00004b" })} // Si la condición es verdadera, se agrega la prop
                                                            {...(isAudited(user) && { backgroundColor: "#ffffff" })}
                                                            {...(isAudited(user) && { borderColor: "2px solid #00004b" })}
                                                            hoverColor="#00004b"
                                                            hoverBorderColor="2px solid #00004b"
                                                            onClick={() => handleClick(user.auditNumber)} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {totalPages > 1 && (
                <Stack spacing={2} className="pagination">
                    <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
                </Stack>
            )}
        </div>
    );
};

export default Table;
