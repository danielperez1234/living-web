import { AppColorsHex } from "@/const/colors";
import { Grid, IconButton } from "@mui/material";
import { ReactElement } from "react";

export default function MediaIcon({ children }: { children: React.ReactNode }) {
  return (
    <Grid item xs={6} md={1} display={'flex'} justifyContent={'center'}>
      <IconButton
        disableRipple
        size="large"
        sx={{ bgcolor: AppColorsHex.white }}
        color="info"
      >
        {children}
      </IconButton>
    </Grid>
  );
}
