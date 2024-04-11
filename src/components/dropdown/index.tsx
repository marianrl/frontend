import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Answer } from "../../types/answer";

interface DropdownProps {
    onSelect: (value: Answer) => void;
    answers: Answer[];
    maxLength: number;
}

const Dropdown: React.FC<DropdownProps> = ({ onSelect, answers, maxLength }) => {
    const [selectedValue, setSelectedValue] = React.useState<Answer | null>(null);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        const selectedAnswer = answers.find(answer => answer.answer === value);
        if (selectedAnswer) {
            setSelectedValue(selectedAnswer);
            onSelect(selectedAnswer);
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
                value={selectedValue ? selectedValue.answer : 'Responder...'}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => truncateText(selected as string)} // Aquí truncamos el texto seleccionado
            >
                {answers.map((answer, index) => (
                    <MenuItem key={index} value={answer.answer}>{answer.answer}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default Dropdown;
