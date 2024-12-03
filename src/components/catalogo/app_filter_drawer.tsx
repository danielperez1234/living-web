import { Box, Divider, Drawer, Typography } from "@mui/material";
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
  selectedInitialSubcategoryId
}: PropsAppDrawer) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(selectedInitialCategoryId);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | undefined>(selectedInitialSubcategoryId);
  const router =useRouter();
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
        value={selectedCategoryId}
          label={"Categorias"}
          options={categories.map((category) => category.categoryName)}
          onChange={(value) => {
            setSelectedCategoryId(value);
            
          }}
          ids={categories.map((category) => category.id)}
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
            router.push(`/catalogo/${selectedCategoryId ?? 0}/${value??0}`)
          }}
          ids={subcategories.subcategories.map((element) => element.id)}
        />
      </Box>
    </Drawer>
  );
}
