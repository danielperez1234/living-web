"use client";
import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppCounter from "@/components/common/app_counter";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import { AppColorsHex } from "@/const/colors";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Divider, Fab, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
interface CatalogoProps {
  params: {
    category: string;
    subcategory: string;
  };
}
export default function catalogo({
  params: { category, subcategory }
}: CatalogoProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
        <Box mb={5}>
          <Typography variant="h1">Atención a empresas</Typography>
        </Box>
        <Box
          bgcolor={AppColorsHex.white}
          display={"flex"}
          flexDirection={{xs:"column",md:"row"}}
          alignItems={"center"}
          borderRadius={"50px"}
          height={"50vh"}
          width={"80%"}
          padding={"10%"}
          sx={{
            boxShadow:
              "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
          }}
        >
          <Box width={"100%"} height={"100%"}></Box>
          <Box>
            <Typography variant="h4" mb={5}>Living</Typography>
            <Typography variant="h2" mb={5}>
              Brindamos soluciones de calidad para tu empresa
            </Typography>
            <>
              <Typography variant="body1" mb={2}>
              Mejora la calidad de los insumos de papelería de tu oficina con
              Livin y vive de primera mano las soluciones de calidad que
              ofrecemos para tu empresa. 
              </Typography>
              <Typography variant="body1" mb={2}>
              Envíanos un WhatsApp y disfruta
              nuestras ofertas exclusivas. No dudes en contactarnos.
              </Typography>
              <Typography variant="body1">
              Atentamente, equipo Living.
              </Typography>
              
            </>
          </Box>
        </Box>
      </Box>

      <AppFooter />
    </AppBackgroundImage>
  );
}
