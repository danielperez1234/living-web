import { AppColorsHex } from "@/const/colors"
import { basepath } from "@/const/utils"
import { Box, Divider, Grid, Typography } from "@mui/material"
import Image from "next/image"

export default function Oferta({title,description}:{title:string,description:string}){
  return (
    <Grid item xs={12} md={4} xl={4}>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={AppColorsHex.white}
              borderRadius={{ sm: 8, xs: 5 }}
              overflow={"hidden"}
              mb={2}
              boxShadow={4}
            >
              <Box width={"100%"} ml={2}>
                <Typography
                  width={"100%"}
                  textAlign={"start"}
                  variant="h4"
                  pt={2}
                  textTransform={"capitalize"}
                  color={AppColorsHex.blue}
                >
                  {title}
                </Typography>
                <Typography
                  width={"100%"}
                  textAlign={"start"}
                  variant="body1"
                  pb={2}
                  textTransform={"capitalize"}
                  color={AppColorsHex.blue}
                >
                  {description}
                </Typography>
              </Box>
              <Box
                height={{
                  xs: "75px",
                  sm: "100px",
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
          </Grid>
  )
}