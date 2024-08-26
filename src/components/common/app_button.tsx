import { Button, ButtonProps } from "@mui/material";

export default function AppButton(props : ButtonProps & {label : string}){
  return(
    <Button
      variant="contained"
      color="primary"
      
      {...props}
      sx={{textTransform:'none', borderRadius:'10px', minWidth:'20vw', letterSpacing:2.8, marginY:'10px', ...props.sx}}
    >
      {props.label}
    </Button>
  );
}