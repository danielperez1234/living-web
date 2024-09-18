import { AppColorsHex } from "@/const/colors"
import { basepath } from "@/const/utils"
import { Box, Divider, Grid, Typography } from "@mui/material"
import Image from "next/image"

export default function Servicio({items,seccion}:{items:any[],seccion:string}){
  return (
    <Grid item xs={12} md={6} xl={4}>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={AppColorsHex.blue}
              borderRadius={{ sm: 8, xs: 5 }}
              overflow={"hidden"}
              mb={2}
              boxShadow={4}
            >
              
              <Typography
                width={"100%"}
                textAlign={"center"}
                variant="h4"
                paddingY={2}
                textTransform={'capitalize'}
                color={AppColorsHex.white}
              >
                {seccion}
              </Typography>
              <Box
                height={{
                  xs: "75px",
                  sm: "100px"
                }}
                position={"relative"}
                sx={{ aspectRatio: "1" }}
              >
                <Image
                  fill
                  src={`/${basepath}/productos/1.jpg`}
                  alt={"service_image"}
                />
              </Box>
              
            </Box>
            <Box boxShadow={4} bgcolor={AppColorsHex.white} padding={4} borderRadius={{sm:8,xs:5}}>
                <Grid container width={'100%'}>
                  <Grid item xs={8}>
                    <Typography variant="subtitle1">
                    Articulo
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">
                    Costo
                    </Typography>
                  </Grid>
                </Grid>
                {
                  items.map((value,index)=>{return(
                    <div key={`${seccion}_service_impresion_${index}`}>
                    <Grid  spacing={2} container width={'100%'}>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                    {value.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1">
                    ${value.price}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider/>
                </div>
                  )})
                }
              </Box>
          </Grid>
  )
}