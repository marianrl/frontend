import React, { useEffect, useState } from 'react';
import Header from '../../components/general/header';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/ams/user';
import Spinner from '../../components/general/Spinner';
import NotificationModal from '../../components/notification-modal';
import Navbar from '../../components/navbar';
import { User } from '../../types/user';
import AdminTable from '../../components/admin-table';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [data, setData] = useState<User[]>([]);
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      // Redirigir solo si el usuario no está autenticado
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setTimeout(() => {
        userService
          .fetchAllUser('user')
          .then((response) => {
            const allUsers = response.data;
            setData(allUsers);
            setIsLoading(false); // Establecer isLoading en false cuando se completó la carga de datos
          })
          .catch(() => {
            setData([]);
            setIsLoading(false); // Establecer isLoading en false si hubo un error al cargar los datos
            setErrorMessage('Error al procesar la solicitud');
          });
      }, 100);
    }
    fetchData();
  }, []);

  const handleToggleNotificationModal = () => {
    setNotificationModalOpen((prev) => !prev);
  };

  return (
    <div className="global-background-color">
      <header>
        <Navbar />
        <div>
          <Header
            name={name && lastName ? `${name} ${lastName}` : 'Guest'}
            onToggleNotificationModal={handleToggleNotificationModal}
          />
        </div>
      </header>
      <NotificationModal
        className="notification-modal"
        isOpen={isNotificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
      />
      {isLoading ? ( // Mostrar estado de carga si isLoading es true
        <Spinner />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <AdminTable data={data} />
      )}
    </div>
  );
};

export default Admin;
