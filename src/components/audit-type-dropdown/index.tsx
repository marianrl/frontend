import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AuditType } from '../../types/auditType';

interface AuditTypeDropdownProps {
  onSelect: (value: AuditType) => void;
  auditTypes: AuditType[];
  maxLength: number;
}

const AuditTypeDropdown: React.FC<AuditTypeDropdownProps> = ({
  onSelect,
  auditTypes,
  maxLength,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<AuditType | null>(
    null
  );

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const selectedAuditType = auditTypes.find(
      (auditType) => auditType.auditType === value
    );
    if (selectedAuditType) {
      setSelectedValue(selectedAuditType);
      onSelect(selectedAuditType);
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
        value={selectedValue ? selectedValue.auditType : 'Responder...'}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        renderValue={(selected) => truncateText(selected as string)} // Aquí truncamos el texto seleccionado
      >
        {auditTypes.map((auditType, index) => (
          <MenuItem key={index} value={auditType.auditType}>
            {auditType.auditType}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AuditTypeDropdown;
