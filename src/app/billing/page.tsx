"use client";

import AppButton from "@/components/common/app_button";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import { AppColorsHex } from "@/const/colors";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Billing() {
  return (
    <Box
      sx={{
        backgroundColor: AppColorsHex.blue,
        minHeight: "100vh",
      }}
    >
      <AppNavBar />
      <Grid
        container
        spacing={3} // Asegura el espacio entre los items del grid
        justifyContent="center" // Centra los items horizontalmente en el contenedor
      >
        {/* Columna 1: Datos de contacto (ancho 8 en pantallas medianas y grandes) */}
        <Grid
          item
          sm={12} // En pantallas pequeñas, ocupa todo el ancho
          md={8} // En pantallas medianas, ocupa 8 de 12 columnas
          sx={{
            display: "flex",
            justifyContent: "center", // Centra horizontalmente el contenido
          }}
          maxHeight={"40vh"}
        >
          <Card
            sx={{
              borderRadius: "30px",
              width: "90%",
              aspectRatio: { xs: "auto", md: "16/7" },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  marginX: "20px",
                  marginTop: "20px",
                  width: "75%",
                }}
              >
                <Typography variant="h5" textAlign="left" fontWeight={"bold"}>
                  Datos de contacto
                </Typography>
                <TextField
                  variant="standard"
                  label="Nombre"
                  fullWidth
                  margin="dense"
                />
                <TextField
                  variant="standard"
                  label="Correo"
                  fullWidth
                  margin="dense"
                />
                <TextField
                  variant="standard"
                  label="Teléfono"
                  fullWidth
                  margin="dense"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna 2: Resumen de compra (ancho 4 en pantallas medianas y grandes) */}
        <Grid
          item
          sm={12} // En pantallas pequeñas, ocupa todo el ancho
          md={4} // En pantallas medianas, ocupa 4 de 12 columnas
          sx={{
            display: "flex",
            justifyContent: "center", // Centra horizontalmente el contenido
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Mantiene el contenido centrado verticalmente
              justifyContent: "center",
            }}
          >
            <Card sx={{ borderRadius: "30px", width: "85%" }}>
              <CardContent>
                <Typography variant="h5" textAlign="center" fontWeight={"bold"}>
                  Resumen de compra
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {/* Fila 1: Subtotal */}
                  <Grid item xs={6}>
                    <Typography variant="body1">Subtotal:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" textAlign="right">
                      0.00
                    </Typography>
                  </Grid>

                  {/* Fila 2: IVA */}
                  <Grid item xs={6}>
                    <Typography variant="body1">IVA:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" textAlign="right">
                      0.00
                    </Typography>
                  </Grid>

                  {/* Fila 3: Envío */}
                  <Grid item xs={6}>
                    <Typography variant="body1">Envío:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" textAlign="right">
                      0.00
                    </Typography>
                  </Grid>

                  {/* Fila 4: Total */}
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      fontStyle={"italic"}
                      fontWeight={"bold"}
                    >
                      Total:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      textAlign="right"
                      fontWeight={"bold"}
                    >
                      0.00
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <AppButton
              label="Siguiente"
              sx={{
                color: AppColorsHex.blue,
                backgroundColor: AppColorsHex.yellow,
                maxWidth: "90%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <AppFooter />
    </Box>
  );
}
