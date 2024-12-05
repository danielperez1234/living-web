import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import AppSelect from "../common/app_select";
import { Categoria } from "@/service/categorias/interface";
import { Subcategoria } from "@/service/subcategorias/interface";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PropsAppDrawer {
  drawerOpen: boolean;
  setDrawerOpen: (x: boolean) => void;
  categories: Categoria[];
  subcategories: Subcategoria;
  selectedInitialCategoryId?: string;
  selectedInitialSubcategoryId?: string;
  getSubcategorias: (idCategoria: string) => void;
}

export default function AppFilterDrawer({
  drawerOpen,
  setDrawerOpen,
  categories,
  subcategories,
  getSubcategorias,
  selectedInitialCategoryId,
  selectedInitialSubcategoryId,
}: PropsAppDrawer) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(selectedInitialCategoryId);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | undefined
  >(selectedInitialSubcategoryId);
  const router = useRouter();
  useEffect(() => {
    const parts = pathname.split("/");
    if (parts.length >= 3) {
      const idCategoria = parts[2] || "0";
      const idSubcategoria = parts[3] || "0";

      setSelectedCategoryId(idCategoria);
      setSelectedSubcategoryId(idSubcategoria);

      if (idCategoria !== "0") {
        getSubcategorias(idCategoria);
      }
    }
  }, [pathname]);

  return (
    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box
        display={{ sm: "none", md: "flex", xs: "none" }}
        padding={5}
        minWidth={"20vw"}
        flexDirection={"column"}
      >
        <Typography variant="h6" color="info">
          Filtros
        </Typography>
        <Divider />
        <AppSelect
          value={selectedCategoryId}
          label={"Categorias"}
          options={categories.map((category) => category.categoryName)}
          onChange={(value) => {
            setSelectedCategoryId(value);
          }}
          ids={categories.map((category) => category.id)}
          value={selectedCategoryId}
        />
        <AppSelect
          value={selectedSubCategoryId}
          label={"Sub categorias"}
          options={subcategories.subcategories.map(
            (subcategory) => subcategory.subcategoryName
          )}
          onChange={(value) => {
            console.log("Hello: " + value);
            setSelectedSubCategoryId(value);
            router.push(`/catalogo/${selectedCategoryId ?? 0}/${value ?? 0}`);
          }}
          ids={subcategories.subcategories.map((element) => element.id)}
        />
      </Box>
      <Button
        fullWidth
        color="error"
        onClick={() => {
          setSelectedCategoryId("0");
          setSelectedSubcategoryId("0");
          router.replace(`/catalogo/0/0`);
          setDrawerOpen(false);
        }}
      >
        Borrar filtros
      </Button>
    </Drawer>
  );
}
