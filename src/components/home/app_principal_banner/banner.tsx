import { Box } from "@mui/material";
import Image from "next/image";

interface BannerProps{
  content:string
}
export default function Banner({content}:BannerProps){
  if(content.includes('mp4')){
    return  (<Box
        marginX={'10%'}
        width={'80vw'}
        overflow={'hidden'}
        position={'relative'}
        borderRadius={'5vw'}
        boxShadow={4}
        sx={{ aspectRatio: '2' }} // Ajusta la proporción de aspecto según sea necesario
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
        marginX={'10%'}
        width={'80vw'}
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