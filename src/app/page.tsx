'use client'
// Librerías y hooks
import { useEffect } from "react"; // Hooks de React
import { useRouter } from "next/navigation"; // Router de Next.js

// Componentes y servicios
import Image from "next/image"; // Next.js Image
import { Box } from "@mui/material"; // Material-UI Box
import { NextPage } from "next"; // Next.js NextPage

// Constantes y utilidades
import { basepath } from "@/const/utils"; // Utilidades del proyecto

// Servicios
import useBannerStore from "@/service/banners/store"; // Store de banners

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter();
  const getFondosWeb = useBannerStore((state) => state.getFondoWeb);
  const fondosWeb = useBannerStore((state) => state.fondo_web);

  const redirect = async () => {
    await getFondosWeb();
    router.replace("/home");
  };
  useEffect(() => {
    redirect();
  }, []);
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      width={"100vw"}
    >
      <Box
        width={{ xs: "80vw", md: "50vw" }}
        height={"100vw"}
        position={"relative"}
      >
        <Image
          fill
          src={`/${basepath}/marca/logo.png`}
          alt={"logo"}
          style={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default Page;
