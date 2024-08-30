import { Box } from "@mui/material";
import Image from "next/image";

interface BannerProps{
  content:string;
  onClick?: ()=>void;
}
export default function Banner({content,onClick}:BannerProps){
  if(content.includes('mp4')){
    return  (<Box
    onClick={onClick}
      width={'100%'}
      position={'relative'}
      borderRadius={'5vw'}
      overflow={'hidden'}
        boxShadow={4}
        sx={{ aspectRatio: '2', cursor: onClick ? "pointer":"none"   }} // Ajusta la proporción de aspecto según sea necesario
      >
       <video
            autoPlay
            loop
            muted
            controls={false}
            style={
              {width:'100%' }
            }
          >
            <source
              src={"/mega_banner/megabanner_5.mp4"}
              type="video/mp4"
            />
          </video>
      </Box>);
  }
    return(
        <Box
        width={'100%'}
        position={'relative'}
        borderRadius={'5vw'}
        overflow={'hidden'}
        boxShadow={4}
        sx={{ aspectRatio: '2' }} // Ajusta la proporción de aspecto según sea necesario
      >
        <Image
          src={content}
          alt="mega_banner_image"
          layout="fill"
          sizes="(max-width: 80vw)"
          style={{
            
          objectFit:"cover"
          }}
        />
      </Box>
    )
}