import { Box, Divider, Drawer, Typography } from "@mui/material";
import AppSelect from "../common/app_select";
interface Subcategory {
  name: string;
}
interface Category {
  name: string;
  subcategories: Subcategory[];
}
interface PropsAppDrawer {
  drawerOpen: boolean;
  setDrawerOpen: (x: boolean) => void;
}
export default function AppFilterDrawer({
  drawerOpen,
  setDrawerOpen,
}: PropsAppDrawer) {
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
          options={["Oficina", "Escolar", "Manualidades"]}
          onChange={(value) => {}}
        />
        <AppSelect
          label={"Sub categorias"}
          options={["Plastilina", "Lapiz", "Plumas"]}
          onChange={(value) => {}}
        />
      </Box>
    </Drawer>
  );
}
