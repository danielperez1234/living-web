import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import AppSelect from "../common/app_select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CategoriaBase } from "@/service/categorias_v2/interface";
import useCategoriasStore from "@/service/categorias_v2/store";
import useSubcategoriasStore from "@/service/subcategorias-v2/store";

interface PropsAppDrawer {
  drawerOpen: boolean;
  setDrawerOpen: (x: boolean) => void;
  categories: CategoriaBase[];
  getSubcategoriaProducts: (subcategoriaId: string, page: number) => void;
}

export default function AppFilterDrawer({
  drawerOpen,
  setDrawerOpen,
  categories,
  getSubcategoriaProducts,
}: PropsAppDrawer) {
  // Zustand de categorias
  const categoriaSeleccionada = useCategoriasStore(
    (state) => state.categoriaSeleccionada
  );
  const selectCategoria = useCategoriasStore((state) => state.getCategoriaById);
  const cleanSubcategoriaPaginada = useSubcategoriasStore(
    (state) => state.clean
  );

  // Router hooks
  const router = useRouter();

  // Local Hooks
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0");
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("0");

  // Efecto para actualizar las subcategorías cuando se selecciona una categoría
  useEffect(() => {
    if (selectedCategoryId !== "0") {
      selectCategoria(selectedCategoryId); // Obtener las subcategorías de la categoría seleccionada
    }
  }, [selectedCategoryId, selectCategoria]);

  // Manejar cambio de categoría
  const handleCategoryChange = (value: string | undefined) => {
    if (value) {
      setSelectedCategoryId(value);
      setSelectedSubcategoryId("0"); // Resetear la subcategoría seleccionada
    }
  };

  // Manejar cambio de subcategoría
  const handleSubcategoryChange = (value: string) => {
    setSelectedSubcategoryId(value);

    if (value !== "0") {
      getSubcategoriaProducts(value, 1); // Obtener productos de la subcategoría seleccionada
      // Una vez que se selecciona la subcategoría, actualizamos la URL
      router.replace(`/catalogo/${selectedCategoryId}/${value}`);
    }
  };

  // Efecto para actualizar la URL solo cuando ambos, categoría y subcategoría, están seleccionados
  useEffect(() => {
    if (selectedCategoryId !== "0" && selectedSubcategoryId !== "0") {
      cleanSubcategoriaPaginada();
      router.replace(
        `/catalogo/${selectedCategoryId}/${selectedSubcategoryId}`
      );
    }
  }, [selectedCategoryId, selectedSubcategoryId, router]);

  // Borrar filtros
  const handleClearFilters = () => {
    setSelectedCategoryId("0");
    setSelectedSubcategoryId("0");
    router.replace(`/catalogo/0/0`);
    cleanSubcategoriaPaginada();
    // console.log(
    //   "Datos paginados: " +
    //     //useSubcategoriasStore.getState().subcategoriasConProductos,
    //     useSubcategoriasStore.getState().subcategoriaPaginada
    // );
  };

  return (
    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box
        display={{ sm: "flex", md: "flex", xs: "flex" }}
        padding={5}
        minWidth={"20vw"}
        flexDirection={"column"}
      >
        <Typography variant="h6" color="info">
          Filtros
        </Typography>
        <Divider />
        {/* Selector de categorías */}
        <AppSelect
          label={"Categorias"}
          options={categories.map((category) => category.categoryName)}
          onChange={(value) => handleCategoryChange(value)}
          ids={categories.map((category) => category.id)}
          value={selectedCategoryId}
        />
        {/* Selector de subcategorías */}
        <AppSelect
          label={"Sub categorias"}
          options={
            categoriaSeleccionada?.subcategories.map(
              (subcategoria) => subcategoria.subcategoryName
            ) || []
          }
          onChange={(value) => handleSubcategoryChange(value ?? "0")}
          ids={
            categoriaSeleccionada?.subcategories.map(
              (subcategory) => subcategory.id
            ) || []
          }
          value={selectedSubcategoryId}
        />
      </Box>
      {/* Botón para borrar filtros */}
      <Button fullWidth color="error" onClick={handleClearFilters}>
        Borrar filtros
      </Button>
    </Drawer>
  );
}
