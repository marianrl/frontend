import React, { useEffect, useState, useRef } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AiOutlineAudit } from 'react-icons/ai';
import { BsFileBarGraph } from 'react-icons/bs';
import { notificationService } from '../../services/ams/notification';
import { useSession } from '../session-provider';
import { useNavigate } from 'react-router-dom';

interface NotificationModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: number;
  auditId: number;
  userId: number;
  message: string;
  date: string;
  isRead: boolean;
  isAFIP: boolean;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  className,
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useSession();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isOpen && user) {
      fetchNotifications();
    }
  }, [isOpen, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const fetchNotifications = async () => {
    if (user) {
      const notifs = await notificationService.fetchNotifications(user.id);
      setNotifications(notifs);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    notificationService.markAsRead(notification.id);
    // Navigate to the appropriate audit detail page based on audit type
    if (notification.isAFIP) {
      navigate(`/auditafip/afipAuditDetails/${notification.auditId}`);
    } else {
      navigate(`/audit/commonAuditDetails/${notification.auditId}`);
    }
    onClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR');
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
      }}
    >
      <List
        ref={modalRef}
        className={className}
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'fixed',
          top: '10px',
          right: '10px',
          marginTop: '90px',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Notificaciones
          </ListSubheader>
        }
      >
        {notifications.length === 0 ? (
          <ListItemButton>
            <ListItemText primary="No hay notificaciones" />
          </ListItemButton>
        ) : (
          notifications.map((notification) => (
            <ListItemButton
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              sx={{
                bgcolor: notification.isRead ? 'inherit' : 'action.hover',
              }}
            >
              <ListItemIcon>
                {notification.isAFIP ? <AiOutlineAudit /> : <BsFileBarGraph />}
              </ListItemIcon>
              <ListItemText
                primary={notification.message}
                secondary={formatDate(notification.date)}
              />
            </ListItemButton>
          ))
        )}
      </List>
    </div>
  );
};

export default NotificationModal;
