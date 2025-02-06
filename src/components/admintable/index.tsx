import React, { useState } from 'react';
import Button from "../general/button";
import Buttongroup from "../general/buttongroup";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../table/style.css';
import { IoMdAdd } from "react-icons/io";
import { User } from '../../types/user';

interface TableProps {
    data: User[];
}

const AdminTable: React.FC<TableProps> = ({ data }) => {
    const [orderBy, setOrderBy] = useState<{ key: keyof User, asc: boolean } | null>(null);
    const [page, setPage] = useState(1);
    const [estadoModal, cambiarEstadoModal] = useState(false);
    const resultsPerPage = 10; 

    const handleSort = (key: keyof User) => {
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

        if (orderBy.key === 'id') {
            return (aValue as number) - (bValue as number);
        } else if (orderBy.key === 'role') {
            return (aValue as { role: string }).role.localeCompare((bValue as { role: string }).role);
        } else {
            return (aValue as string).localeCompare(bValue as string);
        }
    }) : [...data].sort((a, b) => b.id - a.id);

    const totalPages = Math.ceil(sortedData.length / resultsPerPage);
    const paginatedData = sortedData.slice((page - 1) * resultsPerPage, page * resultsPerPage);

    //TODO CREAR UN MODAL PARA AGREGAR USERS
    //TODO CREAR BOTONES DE MODIFICAR Y ELIMINAR
    //TODO CREAR MODAL PARA MODIFICAR USER
    //TODO CREAR MODAL PARA ELIMINAR USER
    return (
        <div id="bodywrap">
            {/* <AddModal estado={estadoModal} cambiarEstadoModal={cambiarEstadoModal} /> */}
            <div className="row">
                <div className="large-10 columns">
                    <div className="scroll-window-wrapper">
                        <h2>Administrador de usuarios</h2>
                        <Buttongroup>
                            <div className="container">
                                <Button
                                    type="button"
                                    backgroundColor="#00004b"
                                    hoverColor="#00004b"
                                    hoverBorderColor="2px solid #00004b"
                                    style={{ width: '140px', marginBottom: '10px' }}
                                    onClick={() => cambiarEstadoModal(true)}>
                                    <IoMdAdd style={{ marginRight: '15px' }} /> Crear usuario nuevo
                                </Button>
                            </div>
                        </Buttongroup>
                        <div className="table-wrapper">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-header">
                                        <tr>
                                            <th onClick={() => handleSort('id')}>
                                                ID
                                                <span className="icon-right">
                                                    {orderBy?.key === 'id' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                                </span>
                                            </th>
                                            <th onClick={() => handleSort('name')}>
                                                Nombre
                                                <span className="icon-right">
                                                    {orderBy?.key === 'name' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                                </span>
                                            </th>
                                            <th onClick={() => handleSort('lastName')}>
                                                Apellido
                                                <span className="icon-right">
                                                    {orderBy?.key === 'lastName' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                                </span>
                                            </th>
                                            <th onClick={() => handleSort('mail')}>
                                                Correo
                                                <span className="icon-right">
                                                    {orderBy?.key === 'mail' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                                </span>
                                            </th>
                                            <th onClick={() => handleSort('role')}>
                                                Rol
                                                <span className="icon-right">
                                                    {orderBy?.key === 'role' ? (orderBy.asc ? <MdOutlineArrowDropDown /> : <MdOutlineArrowDropUp />) : null}
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.mail}</td>
                                                <td>{user.role.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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

export default AdminTable;
