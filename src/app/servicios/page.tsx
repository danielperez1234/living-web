"use client";

// Material-UI
import { Box, Grid, Typography } from "@mui/material";

// Componentes comunes
import AppButton from "@/components/common/app_button";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppBackgroundImage from "@/components/common/background_image";

// Componentes específicos
import Servicio from "@/components/servicios/servicio";

export default function Catalogo() {
  const impresiones = [
    {
      name: "Copia a color simple",
      price: "2.50",
    },
    {
      name: "Copia blanco y negro simple",
      price: "0.50",
    },
    {
      name: "Impresión a color tamaño carta",
      price: "5.00",
    },
    {
      name: "Impresión en papel fotográfico",
      price: "15.00",
    },
    {
      name: "Impresión tamaño póster",
      price: "25.00",
    },
    {
      name: "Escaneo de documentos",
      price: "10.00",
    },
  ];
  const sublimados = [
    {
      name: "Sublimado en taza",
      price: "8.50",
    },
    {
      name: "Sublimado en camiseta",
      price: "12.00",
    },
    {
      name: "Sublimado en cojín",
      price: "15.00",
    },
    {
      name: "Sublimado en mousepad",
      price: "7.00",
    },
    {
      name: "Sublimado en funda de teléfono",
      price: "10.00",
    },
    {
      name: "Sublimado en llavero",
      price: "4.00",
    },
  ];
  const copias = [
    {
      name: "Copia blanco y negro tamaño carta",
      price: "0.10",
    },
    {
      name: "Copia a color tamaño carta",
      price: "0.50",
    },
    {
      name: "Copia blanco y negro tamaño oficio",
      price: "0.15",
    },
    {
      name: "Copia a color tamaño oficio",
      price: "0.75",
    },
    {
      name: "Copia doble faz blanco y negro",
      price: "0.20",
    },
    {
      name: "Copia doble faz a color",
      price: "1.00",
    },
  ];

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
        <Typography variant="h1">Servicios</Typography>
        <Box mb={5} />
        <Typography variant="h5" textAlign="center">
          Impresión a la medida, compara y descubre que tenemos los mejores
          precios para ti.
        </Typography>
        <Box mb={5} />
        <Grid container width={"100%"} spacing={4}>
          <Servicio items={impresiones} seccion="impresión" />
          <Servicio items={sublimados} seccion="sublimado" />
          <Servicio items={copias} seccion="copia" />
        </Grid>
        <Box mb={7} />
        <AppButton label={"Cotiza tu impresión"} color="warning" />
      </Box>

      <AppFooter />
    </AppBackgroundImage>
  );
}
