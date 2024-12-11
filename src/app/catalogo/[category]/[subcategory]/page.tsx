"use client";
import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import { AppColorsHex } from "@/const/colors";
import useBannerStore from "@/service/banners/store";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Fab, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCategoriasStore from "@/service/categorias/store";
import useSubcategoriasStore from "@/service/subcategorias/store";
import useProductsStore from "@/service/productos/store";
import AppProduct from "@/components/common/app_product";

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
  const getCategoria = useCategoriasStore((state) => state.getCategoria);
  const categoriaContainer = useCategoriasStore((state) => state.categoria);
  const getSubcategoria = useSubcategoriasStore(
    (state) => state.getSubcategoria
  );
  const subcategoriaContainer = useSubcategoriasStore(
    (state) => state.subcategoria
  );
  const categorias = useCategoriasStore((state) => state.categorias);
  const getCategorias = useCategoriasStore((state) => state.getCategorias);
  const subcategorias = useSubcategoriasStore((state) => state.subcategorias);
  const getSubcategorias = useSubcategoriasStore(
    (state) => state.getSubcategorias
  );
  const selectedSubcategoria = useSubcategoriasStore(
    (state) => state.getSubcategoria
  );
  const selectedCategoria = useCategoriasStore(
    (state) => state.selectedCategoria
  );
  const cleanSubcategorias = useSubcategoriasStore((state) => state.clean);
  // Producto
  const products = useProductsStore((state) => state.productos);
  const getProductos = useProductsStore((state) => state.getAllProducts);
  const cleanProductos = useProductsStore((state) => state.clean);

  useEffect(() => {
    if (!categoriaContainer && category != "0") {
      getCategoria(category);
    }
    if (!subcategoriaContainer && subcategory != "0") {
      getSubcategoria(subcategory);
    }
    getBanners();
    getCategorias();
    getSubcategorias(category);
    if (subcategory == "0") {
      getProductos();
    } else {
      cleanProductos();
      selectedSubcategoria(subcategory);
    }
  }, [
    cleanProductos,
    getProductos,
    getBanners,
    getCategorias,
    getSubcategorias,
    category,
    subcategory,
    selectedSubcategoria,
    categoriaContainer,
    subcategoriaContainer,
  ]);

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
          {categoriaContainer?.categoryName
            ? `${categoriaContainer?.categoryName} -> ${subcategoriaContainer?.name}`
            : "Catálogo"}
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
          {[...products, ...(subcategoriaContainer?.products ?? [])].map(
            (o, i) => (
              <AppProduct
                key={`producto_${i}`}
                titulo={o.name ?? ""}
                image={o.imageUrlSmall ?? ""}
                product={o}
              />
            )
          )}
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
