import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User } from '../../../types/user';

interface AdminDropdownProps {
    onSelect: (value: User) => void;
    users: User[];
    maxLength: number;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({ onSelect, users, maxLength }) => {
    const [selectedValue, setSelectedValue] = React.useState<User | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        const selectedUser = users.find(user => user.role.role === value);
        if (selectedUser) {
            setSelectedValue(selectedUser);
            onSelect(selectedUser);
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
                value={selectedValue ? selectedValue.role.role : 'Rol.. '}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => truncateText(selected as string)}
            >
                {users.map((user, index) => (
                    <MenuItem key={index} value={user.role.role}>{user.role.role}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default AdminDropdown;
