'use client'
import { Box } from "@mui/material";
import Image from "next/image";

interface BannerProps{
  content:string;
  onClick?: ()=>void;
}
export default function Banner({content,onClick}:BannerProps){
  
    return(
        <Box
        onClick={onClick}
        width={'100%'}
        position={'relative'}
        borderRadius={'5vw'}
        overflow={'hidden'}
        boxShadow={4}
        sx={{ aspectRatio: '2', cursor: onClick ? "pointer":"none"   }} // Ajusta la proporción de aspecto según sea necesario
      >
        <Image
          src={content}
          alt="mega_banner_image"
          layout="fill"
          style={{
            objectFit:"cover"
          }}
        />
      </Box>
    )
}