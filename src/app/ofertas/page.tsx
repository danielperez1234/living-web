"use client";
import AppButton from "@/components/common/app_button";
import AppFooter from "@/components/common/app_footer/main";
import AppHalfBanner from "@/components/common/app_half_banner/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import AppQuartBanner from "@/components/ofertas/app_quart_banner/main";
import Oferta from "@/components/ofertas/oferta";
import useBannerStore from "@/service/banners/store";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Ofertas() {
  const getBanners = useBannerStore((state) => state.getBanners);

  const squareOneBanners = useBannerStore((state) => state.squareOne_banners);
  const squareTwoBanners = useBannerStore((state) => state.squareTwo_Banners);
  useEffect(() => {
    getBanners();
  }, []);
  return (
    <AppBackgroundImage>
      <AppNavBar />
      <Box
        marginX={{ xs: "5%", md: "15%" }}
        mb={{ xs: "5%", md: "15%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Typography variant="h1">Ofertas</Typography>
        <Box mb={5} />
        <Typography variant="h5" textAlign="center">
        Hasta 50% off en artículos seleccionados.
        </Typography>
        <Box mb={5} />
        <Grid container width={"100%"} spacing={4}>
          <Oferta title={"Oficina"} description={"Compra una y llevate el doble."}/>
          <Oferta title={"Papeleria"} description={"Compra una y llevate el doble."}/>
          <Oferta title={"Manualidades"} description={"Compra una y llevate el doble."}/>
          <Oferta title={"Lapices"} description={"Compra una y llevate el doble."}/>
          <Oferta title={"Libretas"} description={"Compra una y llevate el doble."}/>
          <Oferta title={"Mochilas"} description={"Compra una y llevate el doble."}/>
        </Grid>
        <Box mb={7} />
        <Grid
        container
        marginX={"10%"}
        rowSpacing={4}
        width={"80vw"}
        xs={12}
        alignContent={"center"}
        justifyContent={{ xs: "start", md: "space-between" }}
      >
        
        <Grid item xs={12} md={5.5}>
          <AppHalfBanner banners={squareOneBanners} />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <AppQuartBanner banners={squareTwoBanners}/>
        </Grid>
      </Grid>      </Box>

      <AppFooter />
    </AppBackgroundImage>
  );
}
