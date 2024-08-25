import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
interface PropsAppSelect{
  label: string,
  options: string[],
  onChange:(value:string | undefined) => void

}
export default function AppSelect({label,options,onChange}:PropsAppSelect){
  const [actualValue, setActualValue] = useState<string | undefined>(undefined);

  const handleChange = (event: SelectChangeEvent) => {
    setActualValue(event.target.value);
    onChange(event.target.value);
  };
  return(
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={actualValue}
          onChange={handleChange}
          label={label}
        >
          <MenuItem value={undefined}>
            <em>None</em>
          </MenuItem>
          {
            options.map((option,i)=>
            <MenuItem key={`Item-${label}-${i}`} value={i}>
            <em>
              {option}
            </em>
            </MenuItem>
            )
          }
        </Select>
      </FormControl>
  )
}