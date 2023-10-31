import React from 'react';
import './style.css'
import Button from "../button";
import Buttongroup from "../buttongroup";
import {AiFillFileAdd} from "react-icons/ai";

interface data {
    lastName: string;
    name: string;
    cuil: string;
    file: string;
    allocation: string;
    client: {client: string}
    uoc: string;
    branch: {branch: string};
    admissionDate: string;
    features:{auditType: {auditType: string }; answer: {answer:string}};
    audit:{auditNumber:number;auditDate: string;idTipoAuditoria:{auditType:string};idAuditado:{audited:string}};

}
const handleClick = () => {

}
interface TableProps {
    data: data[];
}

const TableAfip: React.FC<TableProps> = ({ data }) => {
    return (
        <div id="bodywrap">
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
                                        <td>{user.lastName}</td>
                                        <td>{user.name}</td>
                                        <td>{user.cuil}</td>
                                        <td>{user.file}</td>
                                        <td className="text-right">
                                            <Buttongroup>
                                                    <Button
                                                        type="button"
                                                        label="Responder"
                                                        backgroundColor="green"
                                                        hoverColor="green"
                                                        hoverBorderColor="2px solid green"
                                                        onClick={() => handleClick()}/>
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

export default TableAfip;
