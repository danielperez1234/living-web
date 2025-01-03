"use client";
import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import Image from "next/image";
import NavBarTextButton from "./nav_bar_text_button";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AppDrawer from "./app_drawer";
import { AppColorsHex } from "@/const/colors";
import HideOnScroll from "./hide_on_scroll";
import { useRouter } from "next/navigation";
import { basepath } from "@/const/utils";
import { LocationOn } from "@mui/icons-material";
export default function AppNavBar({}) {
  //hooks
  const [drawerOpen, setDrawerOpen] = useState(false);
  // router
  const router = useRouter();
  return (
    <Box
      height={{ sm: "65px", xs: "65px", md: "70px" }}
      marginBottom={{ sm: "20px", xs: "30px", md: "60px" }}
    >
      {" "}
      zIndex:10
      <HideOnScroll>
        <AppBar sx={{ bgcolor: AppColorsHex.white }}>
          <AppDrawer
            drawerOpen={drawerOpen}
            setDrawerOpen={(x) => setDrawerOpen(x)}
          />
          <Box
            width={"xl"}
            height={{ sm: "10px", xs: "10px", md: "15px" }}
            bgcolor={AppColorsHex.yellow}
          />
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                flexGrow={0}
                padding={0}
                margin={0}
                position={"relative"}
                height={"50px"}
                width={{ sm: "30%", md: "20%", xs: "50%" }}
              >
                <Image
                  objectPosition="left center"
                  onClick={() => router.push("/home")}
                  fill
                  src={`/${basepath}/marca/logo.png`}
                  alt="logo Living"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                flexGrow={1}
                display={{ md: "flex", sm: "none", xs: "none" }}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <IconButton onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
                <NavBarTextButton
                  title={"Catálogo"}
                  onClick={() => {
                    router.push("/catalogo/0/0");
                  }}
                />
                <NavBarTextButton
                  title={"Ofertas"}
                  onClick={() => {
                    router.push("/ofertas");
                  }}
                />
                <NavBarTextButton
                  title={"Servicios"}
                  onClick={() => {
                    router.push("/servicios");
                  }}
                />
                <NavBarTextButton
                  title={"Quiénes Somos"}
                  onClick={() => {
                    router.push("/quienes_somos");
                  }}
                />
              </Box>
              <Box
                flexGrow={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"end"}
              >
                <IconButton>
                  <SearchIcon color="info" />
                </IconButton>
                <IconButton onClick={() => router.push("/login")}>
                  <PersonIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => router.push("/nosotros")}>
                  <LocationOn color="error" />
                </IconButton>
                <IconButton onClick={() => router.push("/carrito")}>
                  <ShoppingCartIcon color="primary" />
                </IconButton>
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ display: { md: "none", sm: "inline" } }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
}
