import React, {useState} from 'react';
import './style.css'
import Button from "../button";
import Buttongroup from "../buttongroup";
import Modal from "../modal";

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

interface TableProps {
    data: data[];
}

const TableAfip: React.FC<TableProps> = ({ data }) => {

    const [estadoModal, cambiarEstadoModal] = useState(false);


    return (
         <div id="bodywrap">
             <Modal
                 estado={estadoModal}
                 cambiarEstadoModal={cambiarEstadoModal}
             />

            <div className="row">
                <div className="large-10 columns">
                    <div className="scroll-window-wrapper">
                        <h2>Detalle de Auditoria</h2>
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
                                                        label="Ver detalle"
                                                        backgroundColor="#00004b"
                                                        hoverColor="#00004b"
                                                        hoverBorderColor="2px solid #00004b"
                                                        onClick={() => cambiarEstadoModal(!estadoModal)}/>
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
