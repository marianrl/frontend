import React, {useState} from 'react';
import './style.css'
import Button from "../button";
import Buttongroup from "../buttongroup";
import {AiFillFileAdd} from "react-icons/ai";
import {Link} from "react-router-dom";
import Modal from "../modal";

interface data {
    auditNumber: number;
    auditDate: string;
    idTipoAuditoria: {auditType: string};
    idAuditado: {id: number, audited: string}
}

interface TableProps {
    data: data[];
    onAuditClick: (auditNumber: number) => void;
}

const Table: React.FC<TableProps> = ({ data , onAuditClick }) => {

    const [estadoModal, cambiarEstadoModal] = useState(false);
    const handleClick = (auditNumber: number) => {
        onAuditClick(auditNumber);
    }

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
                                        <i><AiFillFileAdd/></i>
                                        <span>Agregar</span>
                                    </a>
                                </div>
                            </Buttongroup>
                        </div>
                        <div className="scroll-window">
                            <table className="table table-striped table-hover user-list fixed-header">
                                <thead>
                                    <tr>
                                        <th>
                                            <div>Fecha auditoria</div>
                                        </th>
                                        <th>
                                            <div>N° de Auditoria</div>
                                        </th>
                                        <th>
                                            <div>Tipo de Auditoria</div>
                                        </th>
                                        <th>
                                            <div>Auditado</div>
                                        </th>
                                        <th>
                                            <div></div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.auditDate}</td>
                                            <td>{user.auditNumber}</td>
                                            <td>{user.idTipoAuditoria.auditType}</td>
                                            <td>{user.idAuditado.audited}</td>
                                            <td className="text-right">
                                                <Buttongroup>
                                                    <Link to={`/auditDetails/${user.auditNumber}`}>
                                                        <Button
                                                            type="button"
                                                            label="Responder"
                                                            backgroundColor="green"
                                                            hoverColor="green"
                                                            hoverBorderColor="2px solid green"
                                                            onClick={() => handleClick(user.auditNumber)}/></Link>
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
