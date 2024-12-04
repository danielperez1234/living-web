import { basepath } from "@/const/utils";
import useBannerStore from "@/service/banners/store";
import { Box } from "@mui/material";
import React, { ReactElement, useEffect } from "react";

export default function AppBackgroundImage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const getFondosWeb = useBannerStore((state) => state.getFondoWeb);
  const fondosWeb = useBannerStore((state) => state.fondo_web);

  useEffect(()=>{
    if(fondosWeb.length == 0){
      console.log("hola")
    getFondosWeb();}
  },[])
  return (
    < Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${fondosWeb[0]?.assetUrl ?? `/${basepath}/marca/fondo.svg`})`,
          zIndex: -1,
        }}
      />
      
        {children}
      
    </Box>
  );
}
