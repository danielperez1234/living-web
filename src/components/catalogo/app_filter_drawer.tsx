import { Box, Button, Divider, Drawer, Typography } from "@mui/material";
import AppSelect from "../common/app_select";
import { Categoria } from "@/service/categorias/interface";
import { Subcategoria } from "@/service/subcategorias/interface";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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
  // Router hooks
  const router = useRouter();
  const pathname = usePathname();

  // Local Hooks
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0");
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>("0");

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
          label={"Categorias"}
          options={categories.map((category) => category.categoryName)}
          onChange={(value) => {
            setSelectedCategoryId(value ?? "0");
            setSelectedSubcategoryId("0");
            router.replace(`/catalogo/${value}/0`);
          }}
          ids={categories.map((category) => category.id)}
          value={selectedCategoryId}
        />
        <AppSelect
          label={"Sub categorias"}
          options={subcategories.subcategories.map(
            (subcategory) => subcategory.subcategoryName
          )}
          onChange={(value) => {
            setSelectedSubcategoryId(value ?? "0");
            router.replace(`/catalogo/${selectedCategoryId}/${value}`);
          }}
          ids={subcategories.subcategories.map((subcategory) => subcategory.id)}
          value={selectedSubcategoryId}
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
