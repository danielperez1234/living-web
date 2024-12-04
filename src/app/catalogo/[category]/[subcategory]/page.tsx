"use client";
import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppCounter from "@/components/common/app_counter";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import { AppColorsHex } from "@/const/colors";
import useBannerStore from "@/service/banners/store";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Divider, Fab, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCategoriasStore from "@/service/categorias/store";
import useSubcategoriasStore from "@/service/subcategorias/store";

interface CatalogoProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default function Catalogo({
  params: { category, subcategory },
}: CatalogoProps) {
  const router = useRouter();

  const getBanners = useBannerStore((state) => state.getBannersSandbox);

  const sandbox = useBannerStore((state) => state.sandbox_catalogo_banners);

  // Zustand
  const categorias = useCategoriasStore((state) => state.categorias);
  const getCategorias = useCategoriasStore((state) => state.getCategorias);
  const subcategorias = useSubcategoriasStore((state) => state.subcategorias);
  const getSubcategorias = useSubcategoriasStore(
    (state) => state.getSubcategorias
  );
  const clean = useSubcategoriasStore((state) => state.clean);

  useEffect(() => {
    getBanners();
    getCategorias();
    getSubcategorias(category);
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <AppBackgroundImage>
      <AppNavBar />
      <Box
        marginX={{ xs: "5%", md: "15%" }}
        mb={{ xs: "5%", md: "15%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Typography variant="h1">
          {subcategory != "0" ? "" : category != "0" ? "" : "Catálogo"}
        </Typography>
        <Box height={"20px"} />
        <Grid
          container
          width={"100%"}
          justifyContent={{ xs: "center", sm: "start" }}
          maxWidth={1920}
          rowSpacing={3}
          columnSpacing={{ xs: 0, sm: 5 }}
        >
          {sandbox.map((o, i) => (
            <Objeto
              key={i}
              titulo={o.assetName ?? ""}
              image={o.assetUrl ?? ""}
            />
          ))}
        </Grid>
      </Box>
      <Fab
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          top: 100,
          right: 20,
          color: AppColorsHex.blue,
          bgcolor: AppColorsHex.white,
          "&:hover": {
            bgcolor: AppColorsHex.blue,
            color: AppColorsHex.white,
          },
        }}
      >
        <FilterListIcon />
      </Fab>
      <AppFooter />
      <AppFilterDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={(x) => setDrawerOpen(x)}
        categories={categorias}
        subcategories={subcategorias}
        getSubcategorias={(id) => getSubcategorias(id)}
      />
    </AppBackgroundImage>
  );
}
function Objeto({ titulo, image }: { titulo: string; image: string }) {
  return (
    <Grid
      xs={12}
      sm={6}
      md={4}
      xl={3}
      item
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      maxWidth={"280px"}
    >
      <Box
        bgcolor={AppColorsHex.white}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        borderRadius={"50px"}
        width={"100%"}
        sx={{
          boxShadow:
            "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box width={"85%"} marginY={"30px"}>
          <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
            <Image
              fill
              alt="product Image"
              src={image} // src={`/${basepath}/productos/1.jpg`}
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
          <Box>
            <Typography
              width={"100%"}
              mb={2}
              height={"50px"}
              textOverflow={"ellipsis"}
              style={{
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {titulo}
            </Typography>
          </Box>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Box width={"49%"}>
              <Typography variant="h5">${"45.00"}</Typography>
              <Typography
                variant="h5"
                fontSize={"12px"}
                textOverflow={"ellipsis"}
              >
                {`Menudeo`}
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              sx={{
                height: "50px",
                borderWidth: "0.5px",
                borderColor: AppColorsHex.black,
                margin: "0px",
                padding: "0px",
                opacity: 0.6,
              }}
            />
            <Box
              width={"49%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"end"}
            >
              <Typography variant="h5" color={AppColorsHex.blue}>
                ${"45.00"}
              </Typography>
              <Typography variant="h5" fontSize={"12px"}>
                {`a partir de ${"20"}pz`}
              </Typography>
            </Box>
          </Box>
          <AppCounter maxCount={40} />
        </Box>
      </Box>
    </Grid>
  );
}
