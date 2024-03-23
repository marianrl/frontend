import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownProps {
    onSelect: (value: string) => void;
    answers: { id: number, answer: string }[]; // Cambio aquí para aceptar una lista de respuestas
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect, answers }) => {
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
                {answers.map((answer, index) => (
                    <MenuItem key={index} value={answer.answer}>{answer.answer}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default Dropdown;
