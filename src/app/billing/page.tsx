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
        sx={{
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" }, // Centrado en pantallas pequeñas, alineado superior a partir de md
          backgroundColor: "green",
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
            backgroundColor: "red",
          }}
        >
          <Card
            sx={{
              minWidth: "300px",
              maxWidth: "90%",
              width: "100%",
              borderRadius: "20px",
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: { xs: "center", md: "center" },
            backgroundColor: "yellow",
            width: "100%",
            height: "100%",
          }}
        >
          <Card
            sx={{
              width: "270px",
              borderRadius: "20px",
              aspectRatio: 1,
            }}
          >
            <CardContent>
              <Typography variant="h5" textAlign="center" fontWeight={"bold"}>
                Resumen de compra
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "blue",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: "red",
                  }}
                >
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1">IVA:</Typography>
                  <Typography variant="body1">Envío:</Typography>
                  <Typography variant="body1">Total:</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ gridColumn: 2 }}>
                    0.00
                  </Typography>
                  <Typography variant="body1">0.00</Typography>
                  <Typography variant="body1">0.00</Typography>
                  <Typography variant="body1">0.00</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <AppButton
            label="siguiente"
            sx={{
              color: AppColorsHex.blue,
              backgroundColor: AppColorsHex.yellow,
              maxWidth: "90%",
            }}
          />
        </Grid>
      </Grid>
      <AppFooter />
    </Box>
  );
}
