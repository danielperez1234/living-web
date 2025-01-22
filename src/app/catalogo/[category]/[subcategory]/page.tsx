"use client";
import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import { AppColorsHex } from "@/const/colors";
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

  // Zustand Stores
  const getCategoria = useCategoriasStore((state) => state.getCategoria);
  const categoriaContainer = useCategoriasStore((state) => state.categoria);
  const getSubcategoria = useSubcategoriasStore(
    (state) => state.getSubcategorias
  );
  const subcategoriaContainer = useSubcategoriasStore(
    (state) => state.subcategorias
  );
  const categorias = useCategoriasStore((state) => state.categorias);
  const getCategorias = useCategoriasStore((state) => state.getCategorias);
  const subcategorias = useSubcategoriasStore((state) => state.subcategorias);
  const getSubcategorias = useSubcategoriasStore(
    (state) => state.getSubcategorias
  );

  // Productos
  const products = useProductsStore((state) => state.productos);
  const getProductos = useProductsStore((state) => state.getAllProducts);
  const cleanProductos = useProductsStore((state) => state.clean);

  useEffect(() => {
    getCategorias();
    if (category !== "0") {
      getCategoria(category);
      getSubcategorias(category);
    }
    if (subcategory === "0") {
      getProductos(); // Carga todos los productos
    } else {
      cleanProductos(); // Limpia los productos actuales antes de cargar los nuevos
      getSubcategoria(subcategory);
    }
  }, [
    category,
    subcategory,
    getCategoria,
    getSubcategoria,
    getProductos,
    cleanProductos,
    getCategorias,
    getSubcategorias,
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
            ? `${categoriaContainer?.categoryName} -> ${subcategoriaContainer?.categoryName}`
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
          {products.map((product, i) => (
            <AppProduct
              key={`producto_${i}`}
              titulo={product.name}
              image={product.imageUrlSmall}
              product={product}
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
