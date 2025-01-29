"use client";

import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import { AppColorsHex } from "@/const/colors";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Fab, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useCategoriasStore from "@/service/categorias/store";
import useSubcategoriasStore from "@/service/subcategorias/store";
import useProductsStore from "@/service/productos/store";
import AppProduct from "@/components/common/app_product";

export default function Catalogo() {
  // Zustand de categorias
  const categorias = useCategoriasStore((state) => state.categorias);
  const getCategorias = useCategoriasStore((state) => state.getCategorias);

  // Zustand de subcategorias
  const subcategorias = useSubcategoriasStore((state) => state.subcategorias);
  const getSubcategorias = useSubcategoriasStore(
    (state) => state.getSubcategorias
  );

  // Zustand de pruductos
  const productos = useProductsStore((state) => state.productos);
  const getProductos = useProductsStore((state) => state.getAllProducts);

  // Zustand de subcategoriaProducts
  const subcategoriaProducts = useSubcategoriasStore(
    (state) => state.subcategoriaProducts
  );
  const getSubcategoriaProducts = useSubcategoriasStore(
    (state) => state.getSubcategoriaProducts
  );

  // Local hooks
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedSubcategoria, setSelectedSubcategoria] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle de cambio de categoría
  const handleCategoriaChange = (event: { target: { value: string } }) => {
    getSubcategorias(event.target.value);
    setSelectedCategoria(event.target.value);
    console.log("Categoría seleccionada: ", event.target.value);
  };

  // Handle de cambio de subcategoría
  const handleSubcategoriaChange = (event: { target: { value: string } }) => {
    const subcategoriaId = event.target.value; // Capturamos el valor directamente
    setSelectedSubcategoria(subcategoriaId); // Actualizamos el estado
    getSubcategoriaProducts(subcategoriaId, 1); // Usamos el valor directamente
    console.log("Subcategoría seleccionada: ", subcategoriaId);
  };

  // Fetch al cargar la página
  useEffect(() => {
    if (productos.length === 0) {
      console.log("Producto: ", productos);
      getProductos();
    }
    if (categorias.length === 0) {
      console.log("Categorias: ", categorias);
      getCategorias();
    }
  }, [productos.length, categorias.length]);

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
        <Typography variant="h1">Catálogo</Typography>
        <Grid
          container
          width={"100%"}
          justifyContent={{ xs: "center", sm: "start" }}
          maxWidth={1920}
          rowSpacing={2}
          columnSpacing={3}
          sx={{ columnCount: { xs: 1, sm: 2, md: 4 }, marginTop: 5 }}
        >
          {productos.length > 0 &&
          subcategoriaProducts.datosPaginados.subcategoryProductDtos.length == 0
            ? productos.map((producto, i) => (
                <AppProduct
                  key={i}
                  product={producto}
                  image={producto.imageUrlSmall}
                  titulo={producto.name}
                />
              ))
            : subcategoriaProducts.datosPaginados.subcategoryProductDtos.map(
                (product, i) => (
                  <AppProduct
                    key={i}
                    product={product}
                    image={product.imageUrlSmall}
                    titulo={product.name}
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
        getSubcategoriaProducts={(id, page) =>
          getSubcategoriaProducts(id, page)
        }
      />
    </AppBackgroundImage>
  );
}
