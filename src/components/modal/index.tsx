import React from 'react'
import './style.scss'
import { RxCross2 } from 'react-icons/rx';
import Dropdown from "../dropdown";
import Button from "../button";

interface Data {
    lastName: string;
    name: string;
    cuil: number;
    file: number;
    allocation: string;
    client: {client: string}
    uoc: string;
    branch: {branch: string};
    admissionDate: string;
    features:{auditType: {auditType: string }; answer: {answer:string}};
    audit:{auditNumber:number;auditDate: string;idTipoAuditoria:{auditType:string};idAuditado:{audited:string}};
}

interface ModelProps {
    estado: boolean
    cambiarEstadoModal: React.Dispatch<React.SetStateAction<boolean>>
    data: Data | null;
}

const Modal: React.FC<ModelProps> = ({ estado, cambiarEstadoModal, data}) => {
    const handleDropdownSelect = () => {
        // Lógica para manejar la selección del dropdown
        cambiarEstadoModal(!estado)
    };

    return (
    <>
        {estado &&
        <div>
            <div className="Overlay">
                <div className="ContendorModal">
                    <div className="Encabezado">
                        <h3 className="TituloModal">{data ? `${data.lastName} ${data.name}` : ""}</h3>
                    </div>
                    <button className="BotonCerrar">
                        <i className="Cruz"><RxCross2 onClick={() => {
                            cambiarEstadoModal(!estado)
                        }} /></i>
                    </button>
                    <div className="Contenido">
                        <ul>
                            <div className="fila">
                                <li>
                                    CUIL:
                                    <div><strong>{data ? data.cuil : ""}</strong></div>
                                </li>
                                <li>
                                    N° Legajo:
                                    <div><strong>{data ? data.file : ""}</strong></div>
                                </li>
                            </div>
                            <div className="fila">
                                <li>
                                    Asignacion:
                                    <div><strong>{data ? data.allocation : ""}</strong></div>
                                </li>
                                <li>
                                    Cliente:
                                    <div><strong>{data ? data.client.client : ""}</strong></div>
                                </li>
                            </div>
                            <div className="fila">
                                <li>
                                    UOC:
                                    <div><strong>{data ? data.uoc : ""}</strong></div>
                                </li>
                                <li>
                                    Sucursal:
                                    <div><strong>{data ? data.branch.branch : ""}</strong></div>
                                </li>
                            </div>
                            <div className="fila">
                                <li>
                                    Fecha de Ingreso:
                                    <div><strong>{data ? data.admissionDate : ""}</strong></div>
                                </li>
                                <li>
                                    Fecha de la Auditoria:
                                    <div><strong>{data ? data.audit.auditDate : ""}</strong></div>
                                </li>
                            </div>
                            <div className="fila">
                                <li>
                                    Tipo de Auditoria:
                                    <div><strong>{data ? data.audit.idTipoAuditoria.auditType : ""}</strong></div>
                                </li>
                            </div>
                            <div className="fila">
                                <li className="item">
                                    Respuesta:
                                    <Dropdown/>
                                </li>
                                <li className="item">
                                    <Button
                                        type="button"
                                        label="Responder"
                                        backgroundColor="#00004b"
                                        hoverColor="#00004b"
                                        hoverBorderColor="2px solid #00004b"
                                        onClick={() => handleDropdownSelect()}/>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        }
    </>
    );
}

export default Modal;

