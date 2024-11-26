import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface PropsAppSelect {
  label: string;
  value?: string; // Cambiado para evitar undefined
  options: string[];
  onChange: (value: string | undefined) => void;
  ids?: string[];
}

export default function AppSelect({
  label,
  value = "", // Establece un valor predeterminado para evitar undefined
  options,
  onChange,
  ids,
}: PropsAppSelect) {
  const [actualValue, setActualValue] = useState<string>(value);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value || ""; // Asignamos una cadena vacía si está vacío
    setActualValue(selectedValue);
    onChange(selectedValue || undefined); // Pasamos undefined si es una cadena vacía
  };

  return (
    <FormControl variant="standard" focused sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={actualValue}
        onChange={handleChange}
        label={label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, i) => (
          <MenuItem key={`Item-${label}-${i}`} value={ids ? ids[i] : option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
