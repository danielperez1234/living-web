import { AppColorsHex } from "@/const/colors";
import { Category } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
interface CatalogoProps {
  params: {
    category: string;
    subcategory: string;
  };
}
export default function catalogo({
  params: { category, subcategory },
}: CatalogoProps) {
  return (
    <Box
      marginX={{ xs: "5%", md: "10%" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <Typography variant="h1">
        {subcategory != "0" ? "" : category != "0" ? "" : "Catálogo"}
      </Typography>
      <Grid container width={"100%"}>
        <Grid
          item
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"center"}
          maxWidth={"360px"}
        >
          <Box
            bgcolor={AppColorsHex.white}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            padding={'10px'}
            borderRadius={'49px'}
            sx={{
              boxShadow:
                "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
            }}
            marginX={{ xs: "0px", sm: "10px", md: "20px", lg: "20px" }}
          >
                <Typography>
                    Foamy moldeable
                </Typography>
                
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
