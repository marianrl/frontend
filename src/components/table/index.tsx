import React, {useState} from 'react';
import Button from "../button";
import Buttongroup from "../buttongroup";
import {AiFillFileAdd} from "react-icons/ai";
import {Link} from "react-router-dom";
import Modal from "../modal";
import '../table/style.css';

interface Data {
    auditNumber: number;
    auditDate: string;
    idTipoAuditoria: {auditType: string};
    idAuditado: {id: number, audited: string}
}

interface TableProps {
    data: Data[];
    onAuditClick: (auditNumber: number) => void;
    auditType: "commonAuditDetails" | "afipAuditDetails";
}

const Table: React.FC<TableProps> = ({ data ,onAuditClick, auditType  }) => {

    const [estadoModal, cambiarEstadoModal] = useState(false);
    const [orderBy, setOrderBy] = useState<{ key: keyof Data, asc: boolean } | null>(null);

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

    return (
        <div id="bodywrap">
            <Modal
                estado={estadoModal}
                cambiarEstadoModal={cambiarEstadoModal}
            />

            <div className="row">
                <div className="large-10 columns">
                    <div className="scroll-window-wrapper">
                        <h2>Auditoria vigentes</h2>
                        <div>
                            <Buttongroup>
                                <div className="container">
                                    <a className="add" href="#">
                                        <i><AiFillFileAdd /></i>
                                        <span>Agregar</span>
                                    </a>
                                </div>
                            </Buttongroup>
                        </div>
                        <div className="table-wrapper">
                            <table className="table table-striped table-hover">
                                <thead className="table-header">
                                <tr>
                                    <th onClick={() => handleSort('auditDate')}>Fecha auditoria</th>
                                    <th onClick={() => handleSort('auditNumber')}>N° de Auditoria</th>
                                    <th onClick={() => handleSort('idTipoAuditoria')}>Tipo de Auditoria</th>
                                    <th onClick={() => handleSort('idAuditado')}>Auditado</th>
                                    <th><div></div></th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedData.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.auditDate}</td>
                                        <td>{user.auditNumber}</td>
                                        <td>{user.idTipoAuditoria.auditType}</td>
                                        <td>{user.idAuditado.audited}</td>
                                        <td className="text-right">
                                            <Buttongroup>
                                                <Link to={`/${auditType}/${user.auditNumber}`}>
                                                    <Button
                                                        type="button"
                                                        label="Responder"
                                                        backgroundColor="#00004b"
                                                        hoverColor="#00004b"
                                                        hoverBorderColor="2px solid #00004b"
                                                        onClick={() => handleClick(user.auditNumber)} />
                                                </Link>
                                            </Buttongroup>
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
    );
};

export default Table;