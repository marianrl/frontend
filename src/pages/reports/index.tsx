import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/general/header';
import NotificationModal from '../../components/notificationmodal';
import Navbar from '../../components/navbar';

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const lastName = localStorage.getItem('lastName');
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      // Redirigir solo si el usuario no está autenticado
      navigate('/login');
    }
  }, [navigate]);

  const handleToggleNotificationModal = () => {
    setNotificationModalOpen((prev) => !prev);
  };

  return (
    <div className="global-background-color">
      <Navbar />
      <div>
        <Header
          name={name && lastName ? `${name} ${lastName}` : 'Guest'}
          onToggleNotificationModal={handleToggleNotificationModal}
        />
        <NotificationModal
          className="notification-modal"
          isOpen={isNotificationModalOpen}
          onClose={() => setNotificationModalOpen(false)}
        />
      </div>
      <div></div>
    </div>
  );
};

export default Reports;
