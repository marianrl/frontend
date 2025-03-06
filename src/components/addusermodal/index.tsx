import React, { useEffect, useState } from 'react';
import Button from '../general/button';
import AdminDropdown from '../general/admindropdown';
import { Role } from '../../types/role';
import { roleService } from '../../services/ams/role';

interface AddUserModalProps {
  estado: boolean;
  cambiarEstadoAddUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddConfirmationButtonClick: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  estado,
  cambiarEstadoAddUserModal,
  handleAddConfirmationButtonClick,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState<Role | null>(null);
  const [showButton, setShowButton] = useState(false);
  const [userRoles, setUsersRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function getAllRoles() {
      try {
        const response = await roleService.fetchAllRoles('role');
        const roles = response?.data || []; // Si es undefined o null, asigna []
        setUsersRoles(roles);
        setErrorMessage('');
      } catch (error) {
        setUsersRoles([]); // Asegura que siempre sea un array
        setErrorMessage('Error al procesar la solicitud');
      }
    }
    getAllRoles();
  }, []);

  // const handleButtonClick = async () => {
  //   try {
  //     const response = await userService.createUser('user', );
  //   } catch (error) {
  //     console.error('Error al crear el user: ', error);
  //   }
  // };

  const handleAddUserModalClose = () => {
    cambiarEstadoAddUserModal(false);
  };

  const handleDropdownSelect = (option: Role) => {
    setSelectedOption(option); // Correcto
    setShowButton(true);
  };

  return (
    <>
      <div>
        <div className="Overlay">
          <div className="ModalContainer">
            <div className="ContenidoModal">
              <h1 className="TituloModalCerrar">Agregar nuevo usuario</h1>
              <div>
                <ul>
                  <div className="filaModal">
                    <li>Nombre: </li>
                    <li>
                      <AdminDropdown
                        onSelect={handleDropdownSelect}
                        roles={userRoles}
                        maxLength={12}
                      />
                    </li>
                  </div>
                  <div className="filaModal">
                    <li>Apellido: </li>
                    <li>
                      <AdminDropdown
                        onSelect={handleDropdownSelect}
                        roles={userRoles}
                        maxLength={12}
                      />
                    </li>
                  </div>
                  <div className="filaModal">
                    <li>Mail: </li>
                    <li>
                      <AdminDropdown
                        onSelect={handleDropdownSelect}
                        roles={userRoles}
                        maxLength={12}
                      />
                    </li>
                  </div>
                  <div className="filaModal">
                    <li>Contraseña: </li>
                    <li>
                      <AdminDropdown
                        onSelect={handleDropdownSelect}
                        roles={userRoles}
                        maxLength={12}
                      />
                    </li>
                  </div>
                  <div className="filaModal">
                    <li>Tipo de Rol:</li>
                    <li>
                      <AdminDropdown
                        onSelect={handleDropdownSelect}
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
                      label="Crear"
                      backgroundColor="#32a852"
                      hoverColor="#32a852"
                      hoverBorderColor="2px solid #32a852"
                      onClick={() => {
                        handleAddUserModalClose();
                      }}
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
                        onClick={() => handleAddUserModalClose()}
                      />
                    </div>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserModal;
