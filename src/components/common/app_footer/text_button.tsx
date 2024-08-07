import { AppColorsHex } from "@/const/colors";
import { Grid, IconButton, Typography } from "@mui/material";
import { ReactElement } from "react";

export default function TextButton({text}:{text:string}) {
  return (
    <Grid item xs={6} md={2} display={'flex'} justifyContent={'center'}>
      <Typography
      variant="h6" 
        sx={{ textDecoration:'none'}}
        color="secondary"
      >
        {text}
      </Typography>
    </Grid>
  );
}
