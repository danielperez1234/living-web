import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import AppFlatBanner from "@/components/home/app_flat_banner/main";
import AppHalfBanner from "@/components/home/app_half_banner/main";
import Banner from "@/components/home/app_principal_banner/banner";
import AppPrincipalBanner from "@/components/home/app_principal_banner/main";
import { Box, Grid } from "@mui/material";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <AppBackgroundImage>
      <AppNavBar />

      <AppPrincipalBanner />
      <Box height={{ sm: "20px", xs: "30px", md: "70px" }} />
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
          <AppFlatBanner />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <AppHalfBanner />
        </Grid>
        <Grid item xs={12} md={5.5}>
          <AppHalfBanner />
        </Grid>
      </Grid>
      <AppFooter/>
    </AppBackgroundImage>
  );
};

export default Page;
