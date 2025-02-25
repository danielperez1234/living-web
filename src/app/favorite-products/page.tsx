"use client";

// React hooks
import { useCallback, useEffect, useState } from "react";

// Material-UI
import { Box, Fab, Grid, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";

// Estado global (Zustand)
import useCategoriasStore from "@/service/categorias_v2/store";
import useProductosStore from "@/service/productos_v2/store";
import useSubcategoriasStore from "@/service/subcategorias-v2/store";

// Componentes comunes
import AppBackgroundImage from "@/components/common/background_image";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppProduct from "@/components/common/app_product";

// Componentes específicos del catálogo
import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import ProtectedRoute from "@/components/common/protected_route";
import useFavoriteProductosStore from "@/service/favorite-products/store";
import { storageKeys } from "@/const/storage_keys";
import AppFavoriteProduct from "@/components/favorite-products/app-favorite-product";

export default function Catalogo() {
  const {favoriteProducts,getfavoriteProducts,loading} = useFavoriteProductosStore(state=>state);
  useEffect(()=>{
    const token = localStorage.getItem(storageKeys.token);

    if(token){
      getfavoriteProducts()
    }
  },[])
  return (
    <AppBackgroundImage>
      <ProtectedRoute/>
      <AppNavBar />
      <Box
        marginX={{ xs: "5%", md: "15%" }}
        mb={{ xs: "5%", md: "15%" }}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
      >
        <Typography variant="h1">Favoritos</Typography>
        <Grid
          container
          width="100%"
          justifyContent={{ xs: "center", sm: "start" }}
          maxWidth={1920}
          rowSpacing={2}
          columnSpacing={3}
          sx={{ marginTop: 5 }}
        >
          {
              favoriteProducts.map((producto, i) => (
                <AppFavoriteProduct
                  key={i}
                  product={producto}
                  image={producto.imageUrlOriginal}
                  titulo={producto.name}
                />
              ))}
        </Grid>
        {loading && <Typography>Cargando...</Typography>}
      </Box>
      
      <AppFooter />
      
    </AppBackgroundImage>
  );
}
