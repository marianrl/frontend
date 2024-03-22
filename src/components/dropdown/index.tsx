import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownProps {
    onSelect: (value: string) => void;
    answer?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect }) => {
    const [selectedValue, setSelectedValue] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setSelectedValue(value);
        onSelect(value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Select
                value={selectedValue}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value="">
                    Responder...
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    );
}

export default Dropdown;
