"use client";

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
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" }, // Centrado en pantallas pequeñas, alineado superior a partir de md
          flexGrow: 1,
          padding: 2,
        }}
      >
        {/* Datos de contacto */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              minWidth: "300px",
              maxWidth: "90%",
              width: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h5" textAlign="center">
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
            </CardContent>
          </Card>
        </Grid>

        {/* Resumen de compra */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" }, // Centrado en pantallas pequeñas, a la derecha a partir de md
          }}
        >
          <Card
            sx={{
              minWidth: "270px",
              maxWidth: "90%",
              width: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h5" textAlign="center">
                Resumen de compra
              </Typography>
              <Box>
                <Typography>Subtotal: $0.00</Typography>
                <Typography>IVA: $0.00</Typography>
                <Typography>Envío: $0.00</Typography>
                <Typography>Total: $0.00</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AppFooter />
    </Box>
  );
}
