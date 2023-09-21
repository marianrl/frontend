import React from 'react';
import './style.css'
import Button from "../button";
import Buttongroup from "../buttongroup";
import {AiFillFileAdd} from "react-icons/ai";
interface UserData {
    name: string;
    email: string;
    status: string;
}
const handleClick = () => {

}
interface TableProps {
    data: UserData[];
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
                                        <div>Nombre auditoria</div>
                                    </th>
                                    <th>
                                        <div>Progreso</div>
                                    </th>
                                    <th>
                                        <div>Fecha</div>
                                    </th>
                                    <th>
                                        <div></div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.status}</td>
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
