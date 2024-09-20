"use client";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import AppBackgroundImage from "@/components/common/background_image";
import AppNavBar from "@/components/common/app_nav_bar/main";

export default function Page()  {
  const Map = useMemo(() => dynamic(
    () => import('@/components/nosotros/my_map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

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
    <Box width={'100%'} 
    borderRadius={"5vw"}
    overflow={"hidden"}
    boxShadow={4}
    sx={{
      aspectRatio:2
    }}>
      <Map/>
    </Box>
    </Box>
    </AppBackgroundImage>
  );
};

