import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function Valor({
  text,
  valor
}: {
  text: string;
  valor: string;
}) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Grid container display={"flex"} alignItems={"center"}>
        <Grid
          height={{
            xs: "75px",
            sm: "100px"
          }}
          position={"relative"}
          sx={{ aspectRatio: "1" }}
        >
          <Image
            fill
            src={`/${basepath}/marca/valores/${valor}.png`}
            alt={"service_image"}
          />
        </Grid>
        <Grid item>
          <Typography
            width={"100%"}
            textAlign={"center"}
            variant="subtitle1"
            color={AppColorsHex.blue}
            textTransform={"capitalize"}
          >
            {valor}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2">{text}</Typography>
    </Grid>
  );
}
