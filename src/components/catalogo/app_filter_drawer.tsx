import { Box, Divider, Drawer, Typography } from "@mui/material";
import AppSelect from "../common/app_select";
import { Categoria } from "@/service/categorias/interface";
import { Subcategoria } from "@/service/subcategorias/interface";
import { useEffect, useState } from "react";

interface PropsAppDrawer {
  drawerOpen: boolean;
  setDrawerOpen: (x: boolean) => void;
  categories: Categoria[];
  subcategories: Subcategoria;
  getSubcategorias: (idCategoria: string) => void;
}

export default function AppFilterDrawer({
  drawerOpen,
  setDrawerOpen,
  categories,
  subcategories,
  getSubcategorias,
}: PropsAppDrawer) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    if(selectedCategoryId){
      getSubcategorias(selectedCategoryId);
    }
  }, [selectedCategoryId]);

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
          label={"Categorias"}
          options={categories.map((category) => category.categoryName)}
          onChange={(value) => {
            console.log("Hell0000 ", value);
            setSelectedCategoryId(value ?? "");
          }}
          ids={categories.map((category) => category.id)}
        />
        <AppSelect
          label={"Sub categorias"}
          options={subcategories.subcategories.map(
            (subcategory) => subcategory.subcategoryName
          )}
          onChange={(value) => {
            console.log("Hello: " + value);
          }}
        />
      </Box>
    </Drawer>
  );
}
