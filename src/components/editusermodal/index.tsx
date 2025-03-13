import React, { useEffect, useState } from 'react';
import Button from '../general/button';
import AdminDropdown from '../general/admindropdown';
import { Role } from '../../types/role';
import { roleService } from '../../services/ams/role';
import InputWrapper from '../inputfield';
import { userService } from '../../services/ams/user';
import { User } from '../../types/user';
import UserConfirmationModal from '../userconfimationmodal';

interface EditUserModalProps {
  cambiarEstadoAddUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  idToUpdate: number;
  lastNameToUpdate: string;
  nameToUpdate: string;
  mailToUpdate: string;
  passwordToUpdate: string;
  roleToUpdate?: Role;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  cambiarEstadoAddUserModal,
  idToUpdate,
  lastNameToUpdate,
  nameToUpdate,
  mailToUpdate,
  passwordToUpdate,
  roleToUpdate,
}) => {
  const [selectedOption, setSelectedOption] = useState<Role | null>(
    roleToUpdate ? roleToUpdate : null
  );
  const [nombre, setNombre] = useState(nameToUpdate);
  const [apellido, setApellido] = useState(lastNameToUpdate);
  const [mail] = useState(mailToUpdate);
  const [password, setPassword] = useState(passwordToUpdate);
  const [userRoles, setUsersRoles] = useState<Role[]>(
    roleToUpdate ? [roleToUpdate] : []
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [disabled] = useState(true);

  useEffect(() => {
    setSelectedOption(roleToUpdate || null);
  }, [roleToUpdate]);

  useEffect(() => {
    async function getAllRoles() {
      try {
        const response = await roleService.fetchAllRoles('role');
        const roles = response?.data || [];
        setUsersRoles(roles);
      } catch (error) {
        setUsersRoles([]);
      }
    }
    getAllRoles();
  }, []);

  const handleConfirmationButtonClick = async () => {
    if (!selectedOption) {
      console.error('Debe seleccionar un rol válido');
      return;
    }

    const newUser: User = {
      id: idToUpdate,
      name: nombre,
      lastName: apellido,
      mail: mail,
      password: password,
      role: selectedOption,
    };

    try {
      const response = await userService.updateUser(
        'user',
        idToUpdate,
        newUser
      );
      console.log('Usuario actualizado con éxito:', response);
      setShowConfirmationModal(false);
      cambiarEstadoAddUserModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error al crear el usuario: ', error);
    }
  };

  const handleOpenConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleConfimationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const isFormValid = nombre && apellido && mail && password && selectedOption;

  return (
    <div>
      <div className="Overlay">
        <div className="ModalContainer">
          <div className="ContenidoModal">
            <h1 className="TituloModalCerrar">Modificar usuario</h1>
            <div>
              <ul>
                <div className="filaModal">
                  <li>Nombre: </li>
                  <InputWrapper
                    label="Nombre"
                    type="text"
                    htmlFor="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div className="filaModal">
                  <li>Apellido: </li>
                  <InputWrapper
                    label="Apellido"
                    type="text"
                    htmlFor="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
                <div className="filaModal">
                  <li>Mail: </li>
                  <InputWrapper
                    label="Mail"
                    type="text"
                    htmlFor="text"
                    value={mail}
                    disabled={disabled}
                  />
                </div>
                <div className="filaModal">
                  <li>Contraseña: </li>
                  <InputWrapper
                    label="Contraseña"
                    type="text"
                    htmlFor="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="filaModal">
                  <li>Tipo de Rol:</li>
                  <li>
                    <AdminDropdown
                      onSelect={setSelectedOption}
                      roles={userRoles}
                      maxLength={12}
                    />
                  </li>
                </div>
              </ul>
            </div>
            <ul>
              <div className="filaModal">
                <li>
                  <Button
                    type="button"
                    label="Modificar"
                    {...(isFormValid && {
                      borderColor: '#32a852',
                      backgroundColor: ' #32a852',
                    })}
                    hoverColor=" #32a852"
                    hoverBackgroundColor=""
                    hoverBorderColor="2px solid #32a852"
                    onClick={handleOpenConfirmationModal}
                    disabled={!isFormValid}
                  />
                </li>
                <li>
                  <div className="Contenido">
                    <Button
                      type="button"
                      label="Cancelar"
                      borderColor="2px solid #00004b"
                      color="#00004b"
                      backgroundColor="#ffffff"
                      hoverColor="#ffffff"
                      hoverBorderColor="2px solid #00004b"
                      hoverBackgroundColor="#00004b"
                      onClick={() => cambiarEstadoAddUserModal(false)}
                    />
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      {showConfirmationModal && (
        <UserConfirmationModal
          estado={showConfirmationModal}
          text="Desea modificar este usuario?"
          confirmLabel="Modificar"
          cancelLabel="Cancelar"
          cambiarEstadoConfirmationModal={setShowConfirmationModal}
          handleConfirmationButtonClick={handleConfirmationButtonClick}
          handleModalClose={handleConfimationModalClose}
        />
      )}
    </div>
  );
};

export default EditUserModal;
