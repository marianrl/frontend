import React, { useEffect, useState } from 'react';
import './style.css';
import { Badge } from '@mui/material';
import { IoIosNotifications } from 'react-icons/io';
import Button from '../button';
import { notificationService } from '../../../services/ams/notification';
import { useSession } from '../../session-provider';

interface HeaderProps {
  name: string;
  onToggleNotificationModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ name, onToggleNotificationModal }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useSession();

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        await notificationService.fetchNotifications(user.id);
        setUnreadCount(notificationService.getUnreadCount());
      };
      fetchNotifications();
      // Set up polling every minute
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <div className="header">
      <h2 className="header-title">Bienvenido {name}</h2>
      <div className="profile-contein">
        <Button
          type="button"
          backgroundColor="#00004b"
          hoverColor="#00004b"
          hoverBorderColor="2px solid #00004b"
          style={{
            width: '50px',
            height: '50px',
            marginLeft: '20px',
            borderRadius: '50%',
          }}
          onClick={() => onToggleNotificationModal()}
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <IoIosNotifications
              style={{ height: '30px', width: '30px', cursor: 'pointer' }}
            />
          </Badge>
        </Button>
      </div>
    </div>
  );
};

export default Header;
