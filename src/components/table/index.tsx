import React from 'react';
import './style.css'
import Button from "../button";
import Buttongroup from "../buttongroup";
import {AiFillFileAdd} from "react-icons/ai";
interface data {
    auditDate: string;
    lastname: string;
    name: string;
    cuil:string;
    legajo:string;
    asignacion: string;
    cliente: string;
    uoc: string;
    sucursal: string;
    fechaIngreso: string;
    caracteristicas: string;
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
                                        <td>{user.lastname}</td>
                                        <td>{user.name}</td>
                                        <td>{user.cuil}</td>
                                        <td>{user.legajo}</td>
                                        <td>{user.asignacion}</td>
                                        <td>{user.cliente}</td>
                                        <td>{user.uoc}</td>
                                        <td>{user.sucursal}</td>
                                        <td>{user.fechaIngreso}</td>
                                        <td>{user.caracteristicas}</td>
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
