import { AppColorsHex } from "@/const/colors";
import { TextField, TextFieldProps } from "@mui/material";

export default function AppTextField(props: TextFieldProps) {
  return(
    <TextField
    variant="standard"
    color={"primary"}
    focused
    {...props}
    />
  )
}