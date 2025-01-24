"use client";

import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";
import { AppColorsHex } from "@/const/colors";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Fab, Grid, Typography, MenuItem, Select } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import useCategoriasStore from "@/service/categorias/store";
import useSubcategoriasStore from "@/service/subcategorias/store";
import useProductsStore from "@/service/productos/store";
import AppProduct from "@/components/common/app_product";

export default function Catalogo() {
  // Zustand Stores
  const categorias = useCategoriasStore((state) => state.categorias);
  const getCategorias = useCategoriasStore((state) => state.getCategorias);
  const subcategorias = useSubcategoriasStore((state) => state.subcategorias);
  const getSubcategorias = useSubcategoriasStore(
    (state) => state.getSubcategorias
  );

  const products = useProductsStore((state) => state.productos);
  const getProductos = useProductsStore((state) => state.getAllProducts);

  // Local State
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedSubcategoria, setSelectedSubcategoria] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch categories and products on load
  useEffect(() => {
    getCategorias();
    getProductos();
  }, [getCategorias, getProductos]);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (selectedCategoria) {
      getSubcategorias(selectedCategoria);
    }
  }, [selectedCategoria, getSubcategorias]);

  const handleCategoriaChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedCategoria(event.target.value);
    setSelectedSubcategoria("");
  };

  const handleSubcategoriaChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedSubcategoria(event.target.value);
  };

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

        <Box height={20} />

        {/* Products Grid */}
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

      {/* Floating Action Button for Filters */}
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
