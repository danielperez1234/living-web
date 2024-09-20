"use client";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppSpace from "@/components/common/app_space";
import AppBackgroundImage from "@/components/common/background_image";
import AppFlatBanner from "@/components/home/app_flat_banner/main";
import AppHalfBanner from "@/components/common/app_half_banner/main";
import Banner from "@/components/home/app_principal_banner/banner";
import AppPrincipalBanner from "@/components/home/app_principal_banner/main";
import useBannerStore from "@/service/banners/store";
import { Box, Grid } from "@mui/material";
import { NextPage } from "next";
import { useEffect } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  //Zustand hooks
  const getBanners = useBannerStore((state) => state.getBanners);
  const megaBanners = useBannerStore((state) => state.mega_banners);
  const flatBanners = useBannerStore((state) => state.flat_banners);
  const squareOneBanners = useBannerStore((state) => state.squareOne_banners);
  const squareTwoBanners = useBannerStore((state) => state.squareTwo_Banners);
  useEffect(() => {
    getBanners();
  }, []);
  return (
    <AppBackgroundImage>
      <AppNavBar />
      <Box width={'100%'}  display={"flex"} flexDirection={"column"} alignItems={'center'}>
      {megaBanners.length > 0 && (
        <Box width={"80vw"}>
        
          

          <AppPrincipalBanner banners={megaBanners} />
          <AppSpace/>
        </Box>
      )}
      
      <Grid
        container
        marginX={"10%"}
        rowSpacing={4}
        width={"80vw"}
        xs={12}
        alignContent={"center"}
        justifyContent={{ xs: "start", md: "space-between" }}
      >
        <Grid item xs={12}>
          {flatBanners.length > 0 && <AppFlatBanner banners={flatBanners} />}
        </Grid>
        <Grid item xs={12} md={5.5}>
          <AppHalfBanner banners={squareOneBanners} />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <AppHalfBanner banners={squareTwoBanners}/>
        </Grid>
      </Grid>
      </Box>
      <AppFooter />
    </AppBackgroundImage>
  );
};

export default Page;
