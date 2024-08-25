import { Box } from "@mui/material";
import Image from "next/image";

interface BannerProps{
  content:string
}
export default function Banner({content}:BannerProps){
  
    return(
        <Box
        width={'100%'}
        alignSelf={'center'}
        position={'relative'}
        borderRadius={'5vw'}
        overflow={'hidden'}
        boxShadow={4}
        sx={{ aspectRatio: '1' }} // Ajusta la proporción de aspecto según sea necesario
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