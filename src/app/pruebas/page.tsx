"use client";

import useCategoriasStore from "@/service/categorias/store";
import useSubcategoriasStore from "@/service/subcategorias/store";
import useProductsStore from "@/service/productos/store";
import AppProduct from "@/components/common/app_product";
import { useEffect, useState } from "react";
import AppBackgroundImage from "@/components/common/background_image";
import AppNavBar from "@/components/common/app_nav_bar/main";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppFooter from "@/components/common/app_footer/main";

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

        {/* Dropdowns for Categories and Subcategories */}
        <Box mt={4} display="flex" gap={2} width="100%" justifyContent="center">
          <Select
            value={selectedCategoria}
            onChange={handleCategoriaChange}
            displayEmpty
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">
              <em>Selecciona una categoría</em>
            </MenuItem>
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.categoryName}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={selectedSubcategoria}
            onChange={handleSubcategoriaChange}
            displayEmpty
            disabled={!selectedCategoria}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">
              <em>Selecciona una subcategoría</em>
            </MenuItem>
            {subcategorias.subcategories.map((subcategoria) => (
              <MenuItem key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.subcategoryName}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Grid
          container
          width={"100%"}
          justifyContent={{ xs: "center", sm: "start" }}
          maxWidth={1920}
          rowSpacing={3}
          columnSpacing={{ xs: 0, sm: 5 }}
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
      <Typography variant="h6">
        ID del primer producto:{" "}
        {subcategoriaProducts.datosPaginados.subcategoryProductDtos[0]?.id}
      </Typography>

      <Typography variant="h6">
        ID del primer producto: {productos.length > 0 && productos[0].id}
      </Typography>

      {/* Footer */}
      <AppFooter />

      {/* Filter Drawer */}
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
