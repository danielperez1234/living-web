import { AppColorsHex } from "@/const/colors";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { ReactElement } from "react";
interface PropsTextButton{text:string, onClick?:()=>void | undefined}
export default function TextButton({text,onClick}:PropsTextButton) {
  return (
    <Grid item xs={6} md={2} display={'flex'} justifyContent={'center'}>
      <Button variant="text" onClick={onClick}>
      <Typography
      variant="h6" 
        sx={{ textDecoration:'none'}}
        color="secondary"
      >
        {text}
      </Typography>
      </Button>
    </Grid>
  );
}
