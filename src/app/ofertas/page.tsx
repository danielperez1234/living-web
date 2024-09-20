"use client";
import AppFooter from "@/components/common/app_footer/main";
import AppHalfBanner from "@/components/common/app_half_banner/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppSpace from "@/components/common/app_space";
import AppBackgroundImage from "@/components/common/background_image";
import AppQuartBanner from "@/components/ofertas/app_quart_banner/main";
import Oferta from "@/components/ofertas/oferta";
import useBannerStore from "@/service/banners/store";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Ofertas() {
  const getBanners = useBannerStore((state) => state.getBannersOfertas);

  const ofertas = useBannerStore((state) => state.ofertas);
  const squareBanners = useBannerStore((state) => state.square_banner_ofertas);
  const quarterOneBanners = useBannerStore((state) => state.quarter_one_banner);
  const quarterTwoBanners = useBannerStore((state) => state.quarter_two_banner);
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
          {ofertas.slice(0, 5).map((value, index) => (
            <Oferta
              key={`oferta_element_${index}`}
              title={value.assetName ?? ""}
              description={value.assetDescription ?? ""}
              image={value.assetUrl ?? ""}
              link={value.link}
            />
          ))}
        </Grid>
        <AppSpace />
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
            <AppHalfBanner banners={squareBanners} />
          </Grid>
          <Grid
            item
            xs={12}
            md={5.5}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <AppQuartBanner banners={quarterOneBanners} />
            <AppQuartBanner banners={quarterTwoBanners} />
          </Grid>
        </Grid>{" "}
      </Box>

      <AppFooter />
    </AppBackgroundImage>
  );
}
