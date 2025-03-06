import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Role } from '../../../types/role';

interface AdminDropdownProps {
  onSelect: (value: Role) => void;
  roles: Role[];
  maxLength: number;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({
  onSelect,
  roles,
  maxLength,
}) => {
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const selectedRole = roles.find((role) => role.role === value);
    if (selectedRole) {
      setSelectedRole(selectedRole);
      onSelect(selectedRole);
    }
  };

  // Función para truncar el texto si es necesario
  const truncateText = (text: string) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <Select
        value={selectedRole ? selectedRole.role : 'Rol.. '}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        renderValue={(selected) => truncateText(selected as string)}
      >
        {roles?.length ? (
          roles.map((role, index) => (
            <MenuItem key={index} value={role.role}>
              {role.role}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Cargando roles...</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default AdminDropdown;
