import React, { useState } from 'react';
import Button from '../general/button';
import Buttongroup from '../general/button-group';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './style.css';
import { IoMdAdd } from 'react-icons/io';
import { User } from '../../types/user';
import DeleteUserModal from '../delete-user-modal';
import { userService } from '../../services/ams/user';
import AddUserModal from '../add-user-modal';
import EditUserModal from '../edit-user-modal';
import { Role } from '../../types/role';

interface TableProps {
  data: User[];
}

const AdminTable: React.FC<TableProps> = ({ data }) => {
  const [orderBy, setOrderBy] = useState<{
    key: keyof User;
    asc: boolean;
  } | null>(null);
  const [page, setPage] = useState(1);
  const [estadoDeleteModal, cambiarEstadoDeleteModal] = useState(false);
  const [estadoAddModal, cambiarEstadoAddModal] = useState(false);
  const [estadoEditModal, cambiarEstadoEditModal] = useState(false);
  const [estadoUserId, cambiarEstadoUserId] = useState(0);
  const [estadoUserName, cambiarEstadoUserName] = useState('');
  const [estadoUserSurname, cambiarEstadoUserSurname] = useState('');
  const [EstadoUserMail, cambiarEstadoUserMail] = useState('');
  const [EstadoUserPassword, cambiarEstadoUserPassword] = useState('');
  const [EstadoUserRole, cambiarEstadoUserRole] = useState<Role>();
  const resultsPerPage = 10;

  const handleSort = (key: keyof User) => {
    setOrderBy((prevState) => {
      if (prevState && prevState.key === key) {
        return { key, asc: !prevState.asc };
      } else {
        return { key, asc: true };
      }
    });
  };

  const sortedData = orderBy
    ? [...data].sort((a, b) => {
        const aValue = orderBy.asc ? a[orderBy.key] : b[orderBy.key];
        const bValue = orderBy.asc ? b[orderBy.key] : a[orderBy.key];

        if (orderBy.key === 'id') {
          return (aValue as number) - (bValue as number);
        } else if (orderBy.key === 'role') {
          return (aValue as { role: string }).role.localeCompare(
            (bValue as { role: string }).role
          );
        } else {
          return (aValue as string).localeCompare(bValue as string);
        }
      })
    : [...data].sort((a, b) => b.id - a.id);

  const totalPages = Math.ceil(sortedData.length / resultsPerPage);
  const paginatedData = sortedData.slice(
    (page - 1) * resultsPerPage,
    page * resultsPerPage
  );

  const handleEditClick = (
    id: number,
    name: string,
    lastName: string,
    mail: string,
    password: string,
    role: Role
  ) => {
    cambiarEstadoEditModal(true);
    cambiarEstadoUserId(id);
    cambiarEstadoUserName(name);
    cambiarEstadoUserSurname(lastName);
    cambiarEstadoUserMail(mail);
    cambiarEstadoUserPassword(password);
    cambiarEstadoUserRole(role);
  };

  const handleDeleteClick = (lastName: string, name: string, id: number) => {
    cambiarEstadoDeleteModal(true);
    cambiarEstadoUserSurname(lastName);
    cambiarEstadoUserName(name);
    cambiarEstadoUserId(id);
  };

  const handleDeleteConfirmationButtonClick = async (id: number) => {
    if (id !== null && id !== 0) {
      try {
        await userService.deleteUser('user', id);
        cambiarEstadoDeleteModal(false);
        cambiarEstadosUserDefault();
        window.location.reload();
      } catch (error) {
        console.error('Error al eliminar el user:', error);
      }
    }
  };

  const handleDeleteModalClose = () => {
    cambiarEstadoDeleteModal(false);
    cambiarEstadosUserDefault();
  };

  const cambiarEstadosUserDefault = () => {
    cambiarEstadoUserSurname('');
    cambiarEstadoUserName('');
    cambiarEstadoUserId(0);
  };

  return (
    <div id="bodywrap">
      {cambiarEstadoDeleteModal && (
        <DeleteUserModal
          estado={estadoDeleteModal}
          cambiarEstadoDeleteUserModal={cambiarEstadoDeleteModal}
          handleDeleteModalClose={handleDeleteModalClose}
          handleDeleteConfirmationButtonClick={() =>
            handleDeleteConfirmationButtonClick(estadoUserId)
          }
          name={estadoUserName}
          surname={estadoUserSurname}
        />
      )}
      {estadoAddModal && (
        <AddUserModal cambiarEstadoAddUserModal={cambiarEstadoAddModal} />
      )}
      {estadoEditModal && (
        <EditUserModal
          cambiarEstadoAddUserModal={cambiarEstadoEditModal}
          idToUpdate={estadoUserId}
          lastNameToUpdate={estadoUserSurname}
          nameToUpdate={estadoUserName}
          mailToUpdate={EstadoUserMail}
          passwordToUpdate={EstadoUserPassword}
          roleToUpdate={EstadoUserRole}
        />
      )}
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
                  style={{ width: '180px', marginBottom: '10px' }}
                  onClick={() => cambiarEstadoAddModal(true)}
                >
                  <IoMdAdd style={{ marginRight: '15px' }} /> Crear usuario
                </Button>
              </div>
            </Buttongroup>
            <div className="admin-table-wrapper">
              <div className="admin-table-responsive">
                <table className="admin-table admin-table-striped admin-table-hover">
                  <thead className="admin-table-header">
                    <tr>
                      <th
                        className="first-column"
                        onClick={() => handleSort('id')}
                      >
                        ID
                        <span className="icon-right">
                          {orderBy?.key === 'id' ? (
                            orderBy.asc ? (
                              <MdOutlineArrowDropDown />
                            ) : (
                              <MdOutlineArrowDropUp />
                            )
                          ) : null}
                        </span>
                      </th>
                      <th
                        className="second-column"
                        onClick={() => handleSort('name')}
                      >
                        Nombre
                        <span className="icon-right">
                          {orderBy?.key === 'name' ? (
                            orderBy.asc ? (
                              <MdOutlineArrowDropDown />
                            ) : (
                              <MdOutlineArrowDropUp />
                            )
                          ) : null}
                        </span>
                      </th>
                      <th
                        className="third-column"
                        onClick={() => handleSort('lastName')}
                      >
                        Apellido
                        <span className="icon-right">
                          {orderBy?.key === 'lastName' ? (
                            orderBy.asc ? (
                              <MdOutlineArrowDropDown />
                            ) : (
                              <MdOutlineArrowDropUp />
                            )
                          ) : null}
                        </span>
                      </th>
                      <th
                        className="fourth-column"
                        onClick={() => handleSort('mail')}
                      >
                        Correo
                        <span className="icon-right">
                          {orderBy?.key === 'mail' ? (
                            orderBy.asc ? (
                              <MdOutlineArrowDropDown />
                            ) : (
                              <MdOutlineArrowDropUp />
                            )
                          ) : null}
                        </span>
                      </th>
                      <th
                        className="fifth-column"
                        onClick={() => handleSort('role')}
                      >
                        Rol
                        <span className="icon-right">
                          {orderBy?.key === 'role' ? (
                            orderBy.asc ? (
                              <MdOutlineArrowDropDown />
                            ) : (
                              <MdOutlineArrowDropUp />
                            )
                          ) : null}
                        </span>
                      </th>
                      <th className="sixth-column"></th>
                      <th className="seventh-column"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.mail}</td>
                        <td>{user.role.role}</td>
                        <td>
                          <Button
                            type="button"
                            label="Modificar"
                            hoverColor="#00004b"
                            hoverBorderColor="2px solid #00004b"
                            onClick={() =>
                              handleEditClick(
                                user.id,
                                user.name,
                                user.lastName,
                                user.mail,
                                user.password,
                                user.role
                              )
                            }
                          />
                        </td>
                        <td>
                          <Button
                            type="button"
                            label="Eliminar"
                            backgroundColor="#ab0707"
                            hoverColor="#ab0707"
                            hoverBorderColor="2px solid #ab0707"
                            onClick={() =>
                              handleDeleteClick(
                                user.lastName,
                                user.name,
                                user.id
                              )
                            }
                          />
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
      {totalPages > 1 && (
        <Stack spacing={2} className="pagination">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Stack>
      )}
    </div>
  );
};

export default AdminTable;
