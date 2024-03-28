import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Answer} from "../../types/answer";

interface DropdownProps {
    onSelect: (value: Answer) => void;
    answers: Answer[];
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect, answers }) => {
    const [selectedValue, setSelectedValue] = React.useState<Answer | null>(null); // Ajustar el estado inicial a null

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        const selectedAnswer = answers.find(answer => answer.answer === value); // Buscar el objeto Answer correspondiente
        if (selectedAnswer) {
            setSelectedValue(selectedAnswer); // Establecer el objeto Answer seleccionado
            onSelect(selectedAnswer); // Llamar a la función onSelect con el objeto Answer seleccionado
        }
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Select
                value={selectedValue ? selectedValue.answer : ''} // Usar la respuesta seleccionada si está definida
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
