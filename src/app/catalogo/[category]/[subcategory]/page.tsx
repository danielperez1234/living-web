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

export default function Catalogo() {
  // Zustand de categorías y productos
  const listaDeCategorias =
    useCategoriasStore((state) => state.categroias) || [];
  const getCategorias = useCategoriasStore((state) => state.getCategorias);
  const listaDeProductos =
    useProductosStore((state) => state.allProducts) || [];
  const getProductos = useProductosStore((state) => state.getAllProducts);

  // Zustand de subcategoría paginada
  const subcategoriaPaginada = useSubcategoriasStore(
    (state) => state.subcategoriaPaginada
  );
  const getSubcategoriaPaginada = useSubcategoriasStore(
    (state) => state.getSubcategoriasPaginadas
  );

  // Local hooks
  const [selectedSubcategoria, setSelectedSubcategoria] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Cargar más productos con paginación
  const loadMoreProducts = useCallback(async () => {
    
    if (loading || !hasMore) return;

    
    setLoading(true);
    const nextPage = page + 1;

    if (subcategoriaPaginada) {
      console.log("hola")
      setLoading(true);
      await getSubcategoriaPaginada(subcategoriaPaginada.datosPaginados.id, nextPage);
      setLoading(false)
      
      setPage(nextPage);
    } else {
      setPage(nextPage);
    }

    setLoading(false);
  }, [loading, hasMore, page, selectedSubcategoria, getSubcategoriaPaginada]);

  // Manejo del scroll para paginación
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      const isBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (isBottom) {
        console.log("¡Has llegado al final de la página!"); // Aquí agregamos el log
        loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadMoreProducts]);

  // Fetch inicial de datos
  useEffect(() => {
    if (listaDeProductos.length === 0) {
      getProductos();
    }
    if (listaDeCategorias.length === 0) {
      getCategorias();
    }
  }, [
    listaDeProductos.length,
    listaDeCategorias.length,
    getProductos,
    getCategorias,
  ]);

  // Determinar si hay más productos
  useEffect(() => {
    if (
      subcategoriaPaginada?.datosPaginados?.subcategoryProductDtos?.length === 0
    ) {
      setHasMore(false); // No hay más productos
    }
  }, [subcategoriaPaginada]);

  return (
    <AppBackgroundImage>
      <AppNavBar />
      <Box
        marginX={{ xs: "5%", md: "15%" }}
        mb={{ xs: "5%", md: "15%" }}
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
      >
        <Typography variant="h1">Catálogo</Typography>
        <Grid
          container
          width="100%"
          justifyContent={{ xs: "center", sm: "start" }}
          maxWidth={1920}
          rowSpacing={2}
          columnSpacing={3}
          sx={{ marginTop: 5 }}
        >
          {(subcategoriaPaginada?.datosPaginados?.subcategoryProductDtos ?? [])
            .length > 0
            ? (
                subcategoriaPaginada?.datosPaginados?.subcategoryProductDtos ??
                []
              ).map((product, i) => (
                <AppProduct
                  key={i}
                  product={product}
                  image={product.imageUrlSmall}
                  titulo={product.name}
                />
              ))
            : listaDeProductos.length > 0 &&
              listaDeProductos.map((producto, i) => (
                <AppProduct
                  key={i}
                  product={producto}
                  image={producto.imageUrlSmall}
                  titulo={producto.name}
                />
              ))}
        </Grid>
        {loading && <Typography>Cargando...</Typography>}
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
        setDrawerOpen={setDrawerOpen}
        categories={listaDeCategorias}
        getSubcategoriaProducts={getSubcategoriaPaginada}
      />
    </AppBackgroundImage>
  );
}
