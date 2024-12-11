"use client";
import { basepath } from "@/const/utils";
import useBannerStore from "@/service/banners/store";
import { Box } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
