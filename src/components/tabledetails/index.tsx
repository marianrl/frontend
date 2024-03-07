import React, {useState} from 'react';
import Button from "../button";
import Buttongroup from "../buttongroup";
import Modal from "../modal";
import '../tabledetails/style.css';
import {useNavigate} from "react-router-dom";

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

interface TableDetailsProps {
    data: Data[];
    auditType: "commonAuditDetails" | "afipAuditDetails";
}

const TableDetails: React.FC<TableDetailsProps> = ({ data, auditType }) => {

    const navigate = useNavigate();
    const [estadoModal, cambiarEstadoModal] = useState(false);
    const [orderBy, setOrderBy] = useState<{ key: keyof Data, asc: boolean } | null>(null);

    const handleClick = () => {
        if(auditType === "commonAuditDetails"){
            navigate('/audit');
        }
        else {
            navigate('/auditafip')
        }
    };

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

        if (orderBy.key === 'cuil') {
            // Si se está ordenando numéricamente (para cuil)
            return orderBy.key === 'cuil' ? (aValue as number) - (bValue as number) : (aValue as string).localeCompare(bValue as string);
        } else if (orderBy.key === 'file') {
            // Si se está ordenando numéricamente (para file)
            return orderBy.key === 'file' ? (aValue as number) - (bValue as number) : (aValue as string).localeCompare(bValue as string);
        } else {
            return (aValue as string).localeCompare(bValue as string);
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
                        <div className="container">
                            <h2>Detalle de Auditoria - {data.length > 0 && data[0].audit.idTipoAuditoria.auditType} - {data.length > 0 && data[0].audit.auditDate}</h2>
                            <Button
                                type="button"
                                label="Volver"
                                backgroundColor="#00004b"
                                hoverColor="#00004b"
                                hoverBorderColor="2px solid #00004b"
                                onClick={() => handleClick()} />
                        </div>
                        <div className="table-wrapper">
                            <table className="table table-striped table-hover">
                                <thead className="table-header">
                                <tr>
                                    <th onClick={() => handleSort('lastName')}>Apellido</th>
                                    <th onClick={() => handleSort('name')}>Nombre</th>
                                    <th onClick={() => handleSort('cuil')}>Cuil</th>
                                    <th onClick={() => handleSort('file')}>N° Legajo</th>
                                    <th><div></div></th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedData.map((user, index) => (
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

export default TableDetails;
