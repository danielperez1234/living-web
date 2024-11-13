import { AppColorsHex } from "@/const/colors";
import { Grid, IconButton } from "@mui/material";
import { ReactElement } from "react";

export default function MediaIcon({ children, onClick }: { children: React.ReactNode, onClick?: ()=>void }) {
  return (
    <Grid item xs={6} md={1} display={'flex'}  justifyContent={'center'}>
      <IconButton
      onClick={
        onClick
      }
        disableRipple
        size="large"
        sx={{ bgcolor: AppColorsHex.white,aspectRatio:1 }}
        color="info"
      >
        {children}
      </IconButton>
    </Grid>
  );
}
