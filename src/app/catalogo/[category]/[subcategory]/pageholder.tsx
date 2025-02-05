"use client";

import AppFilterDrawer from "@/components/catalogo/app_filter_drawer";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppProduct from "@/components/common/app_product";
import AppBackgroundImage from "@/components/common/background_image";
import { AppColorsHex } from "@/const/colors";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Fab, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useCategoriasStore from "@/service/categorias_v2/store";
import useSubcategoriasStore from "@/service/subcategorias-v2/store";
import useProductosStore from "@/service/productos_v2/store";

export default function Catalogo() {
  // Zustand de categorias
  const listaDeCategorias = useCategoriasStore((state) => state.categroias);
  const getCategorias = useCategoriasStore((state) => state.getCategorias);
  const selectCategoria = useCategoriasStore((state) => state.selectCategoria);

  // Zustand de subcategorias
  const listaDeSubcategorias = useSubcategoriasStore(
    (state) => state.subcategoriasBase
  );
  const getSubcategorias = useSubcategoriasStore(
    (state) => state.getSubcategoriasBase
  );

  // Zustand de pruductos
  const listaDeProductos = useProductosStore((state) => state.productos);
  const getProductos = useProductosStore((state) => state.getAllProducts);

  // Zustand de subcategoriaProducts
  const subcategoriaPaginada = useSubcategoriasStore(
    (state) => state.subcategoriaPaginada
  );
  const getSubcategoriaPaginada = useSubcategoriasStore(
    (state) => state.getSubcategoriasPaginadas
  );

  // Local hooks
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedSubcategoria, setSelectedSubcategoria] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Handle de cambio de categoría
  const handleCategoriaChange = (event: { target: { value: string } }) => {
    getCa;
  };

  // Handle de cambio de subcategoría
  const handleSubcategoriaChange = (event: { target: { value: string } }) => {
    const subcategoriaId = event.target.value; // Capturamos el valor directamente
    setSelectedSubcategoria(subcategoriaId); // Actualizamos el estado
    getSubcategoriaProducts(subcategoriaId, 1); // Usamos el valor directamente
    setPage(1);
    setHasMore(true);
  };

  // Loading
  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    if (selectedSubcategoria) {
      const newPage = await getSubcategoriaProducts(
        selectedSubcategoria,
        nextPage
      );
      if (newPage === nextPage) {
        setHasMore(false); // No more products to load
      }
      setPage(newPage);
    } else {
      setPage(nextPage);
    }

    setLoading(false);
  }, [
    loading,
    hasMore,
    page,
    selectedSubcategoria,
    getSubcategoriaProducts,
    getProductos,
  ]);

  // Fetch al cargar la página
  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Cancelamos el timeout anterior
      }

      timeoutId = setTimeout(() => {
        const isBottom =
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100; // Ajusta el valor -100 para mayor precisión

        if (isBottom && !loading) {
          console.log("Llegaste al final del scroll"); // Mensaje en consola
          loadMoreProducts();
        }
      }, 200); // Espera 200ms antes de ejecutar
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId); // Limpia el timeout al desmontar el componente
      }
    };
  }, [loading, loadMoreProducts]);

  useEffect(() => {
    if (productos.length === 0) {
      getProductos();
    }
    if (categorias.length === 0) {
      getCategorias();
    }
  }, [productos.length, categorias.length, getProductos, getCategorias, page]);

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
        setDrawerOpen={(x) => setDrawerOpen(x)}
        categories={listaDeCategorias}
        subcategories={listaDeSubcategorias}
        getSubcategoriaProducts={(id, page) =>
          getSubcategoriaProducts(id, page)
        }
      />
    </AppBackgroundImage>
  );
}
