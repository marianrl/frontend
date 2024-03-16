import React from 'react'
import './style.scss'
import { RxCross2 } from 'react-icons/rx';

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
    return (
    <>
        {estado &&
        <div>
            <div className="Overlay">
                <div className="ContendorModal">
                    <div className="Encabezado">
                        <h3 className="TituloModal">Detalle</h3>
                    </div>
                    <button className="BotonCerrar">
                        <i className="Cruz"><RxCross2 onClick={() => {
                            cambiarEstadoModal(!estado)
                        }} /></i>
                    </button>
                    <div className="Contenido">
                        <h1 className="TituloContenido">
                            {data ? `${data.lastName} ${data.name}` : ""}
                        </h1>
                        <ul>
                            <li><strong>CUIL: </strong> {data ? data.cuil : ""}</li>
                            <li><strong>N° Legajo: </strong>{data ? data.file : ""}</li>
                            <li><strong>Asignacion: </strong>{data ? data.allocation : ""}</li>
                            <li><strong>Cliente: </strong>{data ? data.client.client : ""}</li>
                            <li><strong>UOC: </strong>{data ? data.uoc : ""}</li>
                            <li><strong>Sucursal: </strong>{data ? data.branch.branch : ""}</li>
                            <li><strong>Fecha de Ingreso: </strong>{data ? data.admissionDate : ""}</li>
                            <li><strong>Fecha de la Auditoria: </strong>{data ? data.audit.auditDate : ""}</li>
                            <li><strong>Tipo de Auditoria: </strong>{data ? data.audit.idTipoAuditoria.auditType : ""}</li>
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

