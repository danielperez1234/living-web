'use client'
import { Box } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
 const router = useRouter();
  useEffect(() => {
    router.replace('/home')
  }, []);
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} width={"100vw"}>
    <Box width={{xs:"80vw", md:"50vw"}} height={"100vw"} position={'relative'}>
      <Image fill src={"/marca/logo.png"} alt={"logo"} style={{objectFit:'contain'}} />
    </Box>      
    </Box>
  );
};

export default Page;
