import React from 'react';
import './style.css'
import Button from "../button";
import Buttongroup from "../buttongroup";
import {AiFillFileAdd} from "react-icons/ai";

interface features{
    id: number;
    auditType: {id: number, auditType: string};
    answer: {id: number, answer: string};
    audited: {id: number, audited: string}
}
interface data {
    auditDate: string;
    lastName: string;
    name: string;
    cuil:string;
    file:string;
    allocation: string;
    client: { id: number, client: string };
    uoc: string;
    branch: { id: number, branch: string };
    admissionDate: string;
    features: features;
}
const handleClick = () => {

}
interface TableProps {
    data: data[];
}

const Table: React.FC<TableProps> = ({ data }) => {
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
                                        <div>Apellido</div>
                                    </th>
                                    <th>
                                        <div>nombre</div>
                                    </th>
                                    <th>
                                        <div>Cuil</div>
                                    </th>
                                    <th>
                                        <div>Legajo</div>
                                    </th>
                                    <th>
                                        <div>Asignacion</div>
                                    </th>
                                    <th>
                                        <div>Cliente</div>
                                    </th>
                                    <th>
                                        <div>UOC</div>
                                    </th>
                                    <th>
                                        <div>Sucursal</div>
                                    </th>
                                    <th>
                                        <div>Fecha ingreso</div>
                                    </th>
                                    <th>
                                        <div>Caracteristicas</div>
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
                                        <td>{user.lastName}</td>
                                        <td>{user.name}</td>
                                        <td>{user.cuil}</td>
                                        <td>{user.file}</td>
                                        <td>{user.allocation}</td>
                                        <td>{user.client.client}</td>
                                        <td>{user.uoc}</td>
                                        <td>{user.branch.branch}</td>
                                        <td>{user.admissionDate}</td>
                                        <td>{user.features.id}</td>
                                        <td className="text-right">
                                            <Buttongroup>
                                                <Button
                                                    type="button"
                                                    label="Responder"
                                                    backgroundColor="green"
                                                    hoverColor="green"
                                                    hoverBorderColor="2px solid green"
                                                    onClick={handleClick}/>
                                                <Button
                                                    type="button"
                                                    label="Finalizar"
                                                    backgroundColor="red"
                                                    hoverColor="red"
                                                    hoverBorderColor="2px solid red"
                                                    onClick={handleClick}/>
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
