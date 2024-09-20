"use client";
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Divider, Fab, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Oferta({
  title,
  description,
  image,
  link
}: {
  title: string;
  description: string;
  image: string;
  link?: string | undefined | null;
}) {
  const router = useRouter();
  return (
    <Grid item xs={12} md={4} xl={4}>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bgcolor={AppColorsHex.white}
        borderRadius={{ sm: 8, xs: 5 }}
        overflow={"hidden"}
        paddingY={1}
        boxShadow={4}
        onClick={() => {
          if (link) router.push(link);
        }}
        sx={{
          cursor: link && "pointer", // Changes cursor to hand on hover
          "&:hover": link && {
            cursor: "pointer"
          }
        }}
      >
        <Box width={"100%"} ml={2}>
          <Typography
            width={"100%"}
            textAlign={"start"}
            variant="h4"
            pt={2}
            textTransform={"capitalize"}
            color={AppColorsHex.black}
          >
            {title}
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Typography
              width={"100%"}
              textAlign={"start"}
              variant="body1"
              pb={2}
              textTransform={"capitalize"}
              color={AppColorsHex.black}
            >
              {description}
            </Typography>
            <Fab disableRipple variant="circular" size="small" color="primary">
              <ArrowForwardIos />
            </Fab>
          </Box>
        </Box>
        <Box
          height={{
            xs: "75px",
            sm: "100px"
          }}
          position={"relative"}
          sx={{ aspectRatio: "1" }}
        >
          <Image fill src={image} alt={"service_image"} />
        </Box>
      </Box>
    </Grid>
  );
}
