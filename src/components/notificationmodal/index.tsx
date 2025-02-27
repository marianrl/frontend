import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FontDownloadRoundedIcon from '@mui/icons-material/FontDownloadRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';

interface NotificationModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  className,
  isOpen,
}) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <List
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
        <ListItemButton>
          <ListItemIcon>
            <FormatItalicRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Sueldos - 27/06/2024" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FontDownloadRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Cruce AFIP - 27/06/2024" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FormatItalicRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Bajas facturables - 26/06/2024" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FormatItalicRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Sueldos - 26/06/2024" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FontDownloadRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Cruce AFIP - 25/06/2024" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default NotificationModal;
