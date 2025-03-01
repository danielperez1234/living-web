"use client";

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NavBarTextButton from "./nav_bar_text_button";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import AppDrawer from "./app_drawer";
import { AppColorsHex } from "@/const/colors";
import HideOnScroll from "./hide_on_scroll";
import { useRouter } from "next/navigation";
import { basepath } from "@/const/utils";
import { LocationOn } from "@mui/icons-material";
import { storageKeys } from "@/const/storage_keys";
export default function AppNavBar({}) {
  //hooks
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLocalStorage, setIsLocalStorage] = useState(false);
  // router
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement); // Explicitly cast to HTMLElement
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCarrito = () => {
    if (localStorage.getItem(storageKeys.token) == null) {
      router.push("/carrito");
    } else {
      router.push("/mi-carrito");
    }
  };
  const handleMisCompras = () => {
    router.push("/purchase-history");
  };
  const handleFavorite = () => {
    router.push("/favorite-products");
  };

  useEffect(() => {
    if (localStorage.getItem(storageKeys.token) != null) {
      setIsLocalStorage(true);
    }
  }, []);

  return (
    <Box
      height={{ sm: "65px", xs: "65px", md: "70px" }}
      marginBottom={{ sm: "20px", xs: "30px", md: "60px" }}
    >
      {" "}
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
                {isLocalStorage ? (
                  <div>
                    <IconButton
                      aria-controls="profile-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <PersonIcon color="primary" />
                    </IconButton>
                    <Menu
                      sx={{ padding: 2 }}
                      id="profile-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem>
                        <Typography variant="body2">
                          {localStorage.getItem(storageKeys.email)}
                        </Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleCarrito();
                          handleClose();
                        }}
                      >
                        Mi Carrito
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleMisCompras();
                          handleClose();
                        }}
                      >
                        Mis Compras
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleFavorite();
                          handleClose();
                        }}
                      >
                        Favoritos
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          localStorage.clear();
                          setIsLocalStorage(false);
                          handleClose();
                        }}
                      >
                        Cerrar Sesión
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <IconButton onClick={() => router.push("/login")}>
                    <LoginIcon color="primary" />
                  </IconButton>
                )}
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
