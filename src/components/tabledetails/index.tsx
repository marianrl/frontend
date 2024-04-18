import React, {useState} from 'react';
import Button from "../button";
import DetailsModal from "../detailsmodal";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import {useNavigate} from "react-router-dom";
import '../tabledetails/style.css';
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {IconContext} from "react-icons";
import {FcCheckmark} from "react-icons/fc";

interface Data {
    id: number;
    lastName: string;
    name: string;
    cuil: number;
    file: number;
    allocation: string;
    client: {client: string}
    uoc: string;
    branch: {branch: string};
    admissionDate: string;
    features:{id: number; auditType: {id: number, auditType: string }; answer: {id:number, answer:string}};
    audit:{ id: number, auditNumber: number; auditDate: string; idTipoAuditoria: {id: number, auditType: string}; idAuditado:{id: number, audited:string}};
}

// Define un nuevo tipo para el estado de la fila seleccionada
type SelectedRowState = Data | null;

interface TableDetailsProps {
    data: Data[];
    auditType: "commonAuditDetails" | "afipAuditDetails";
}

const TableDetails: React.FC<TableDetailsProps> = ({ data, auditType }) => {

    const navigate = useNavigate();
    const [estadoModal, cambiarEstadoModal] = useState(false);
    const [orderBy, setOrderBy] = useState<{ key: keyof Data, asc: boolean } | null>(null);
    const [page, setPage] = useState(1);
    const resultsPerPage = 10; //Cantidad
    const [selectedRow, setSelectedRow] = useState<SelectedRowState>(null); // Estado para la fila seleccionada

    const handleRowClick = (rowData: Data) => {
        setSelectedRow(rowData); // Almacena la información de la fila seleccionada en el estado
        cambiarEstadoModal(true); // Abre el detailsmodal
    };

    const handleBackButtonClick = () => {
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

    const totalPages = Math.ceil(sortedData.length / resultsPerPage);
    const paginatedData = sortedData.slice((page - 1) * resultsPerPage, page * resultsPerPage);

    const isButtonDisabledForUser = (user: Data): boolean => {
        return user.features.auditType.auditType !== 'SIN RESPUESTA';
    };

    return (
         <div id="bodywrap">
             <DetailsModal
                 estado={estadoModal}
                 cambiarEstadoModal={cambiarEstadoModal}
                 data={selectedRow} // Pasa la información de la fila seleccionada al detailsmodal
                 auditType={auditType}
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
                                onClick={() => handleBackButtonClick()} />
                        </div>
                        <div className="table-wrapper">
                            <table className="table table-striped table-hover">
                                <thead className="table-header">
                                    <tr>
                                        <th onClick={() => handleSort('lastName')}>
                                            Apellido
                                            <span className="icon-right">
                                                {orderBy && orderBy.key === 'lastName' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                            </span>
                                        </th>
                                        <th className="details-second-child" onClick={() => handleSort('name')}>
                                            Nombre
                                            <span className="icon-right">
                                                {orderBy && orderBy.key === 'name' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                            </span>
                                        </th>
                                        <th className="details-third-child" onClick={() => handleSort('cuil')}>
                                            CUIL
                                            <span className="icon-right">
                                                {orderBy && orderBy.key === 'cuil' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                            </span>
                                        </th>
                                        <th className="details-fourth-child" onClick={() => handleSort('file')}>
                                            N° Legajo
                                            <span className="icon-right">
                                                {orderBy && orderBy.key === 'file' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                            </span>
                                        </th>
                                        <th><div></div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {paginatedData.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.lastName}</td>
                                        <td>{user.name}</td>
                                        <td>{user.cuil}</td>
                                        <td className="cellContainer">
                                            <div className="leftContent">{user.file}</div>
                                            {user.features.auditType.auditType !== 'SIN RESPUESTA' && (
                                                <div className="rightContent">
                                                    <IconContext.Provider value={{ size: '30px' }}>
                                                        <FcCheckmark />
                                                    </IconContext.Provider>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                type="button"
                                                label={isButtonDisabledForUser(user) ? "Respondido" : "Ver detalle"}
                                                hoverColor="#00004b"
                                                hoverBorderColor="2px solid #00004b"
                                                disabled={isButtonDisabledForUser(user)}
                                                onClick={() => handleRowClick(user)}/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
             {totalPages > 1 && (
                 <Stack spacing={2} className="pagination">
                     <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
                 </Stack>
             )}
        </div>
    );
};

export default TableDetails;
