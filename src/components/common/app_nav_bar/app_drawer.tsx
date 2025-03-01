"use client";

import { Box, Divider, Drawer, Typography } from "@mui/material";
import NavBarTextButton from "./nav_bar_text_button";
import { useRouter } from "next/navigation";

interface PropsAppDrawer {
  drawerOpen: boolean;
  setDrawerOpen: (x: boolean) => void;
}

export default function AppDrawer({
  drawerOpen,
  setDrawerOpen,
}: PropsAppDrawer) {
  const router = useRouter();

  return (
    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box
        display={{ sm: "flex", md: "none", xs: "flex" }}
        padding={5}
        minWidth={"30vw"}
        flexDirection={"column"}
      >
        <NavBarTextButton title={"Catalogo"} onClick={() => {router.push("/catalogo/0/0")}} />
        <NavBarTextButton title={"Ofertas"} onClick={() => {router.push("/ofertas")}} />
        <NavBarTextButton title={"Servicios"} onClick={() => {router.push("/servicios")}} />
        <NavBarTextButton title={"Quiénes Somos"} onClick={() => {router.push("/quienes_somos");}} />
      </Box>
      <Box
        display={{ sm: "none", md: "flex", xs: "none" }}
        padding={5}
        minWidth={"20vw"}
        flexDirection={"column"}
      >
        <Box>
          <Typography variant="h6" color="info">
            Manualidades
          </Typography>
          <Divider />
        </Box>
      </Box>
    </Drawer>
  );
}
