"use client";

import AppButton from "@/components/common/app_button";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppTextField from "@/components/common/app_text_field";
import ProtectedRoute from "@/components/common/protected_route";
import { AppColorsHex } from "@/const/colors";
import { storageKeys } from "@/const/storage_keys";
import { DeliveryData } from "@/service/delivery_data/interface";
import { postMyDeliveryData } from "@/service/delivery_data/service";
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Billing() {
  const router = useRouter();
  const [user, setUser] = useState<DeliveryData>({
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    name: "",
    lastName: "",
    secondLastName: ""
  });
  return (
    <Box
      sx={{
        backgroundColor: AppColorsHex.blue,
        minHeight: "100vh"
      }}
    >
      <ProtectedRoute />
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
            justifyContent: "center" // Centra horizontalmente el contenido
          }}
        >
          <Card
            sx={{
              borderRadius: "30px",
              width: "90%"
            }}
          >
            <CardContent>
              <Box
                sx={{
                  marginX: "20px",
                  marginTop: "20px",
                  width: "75%"
                }}
              >
                <Typography variant="h5" textAlign="left" fontWeight={"bold"}>
                  Datos de contacto
                </Typography>
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: DeliveryData = { ...state, name: s.target.value };
                      return x;
                    })
                  }
                  label={"Nombre"}
                  fullWidth
                  margin="normal"
                  type="text"
                />
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <AppTextField
                      onChange={(s) =>
                        setUser((state) => {
                          var x: DeliveryData = {
                            ...state,
                            lastName: s.target.value
                          };
                          return x;
                        })
                      }
                      label={"Apellido paterno"}
                      fullWidth
                      margin="normal"
                      type="text"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <AppTextField
                      onChange={(s) =>
                        setUser((state) => {
                          var x: DeliveryData = {
                            ...state,
                            secondLastName: s.target.value
                          };
                          return x;
                        })
                      }
                      label={"Apellido materno"}
                      fullWidth
                      margin="normal"
                      type="text"
                    />
                  </Grid>
                </Grid>
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: DeliveryData = { ...state, email: s.target.value };
                      return x;
                    })
                  }
                  label={"Correo"}
                  fullWidth
                  margin="normal"
                  type="email"
                />
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: DeliveryData = {
                        ...state,
                        address: s.target.value
                      };
                      return x;
                    })
                  }
                  label={"Dirección"}
                  fullWidth
                  margin="normal"
                  type="text"
                />
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: DeliveryData = {
                        ...state,
                        postalCode: s.target.value
                      };
                      return x;
                    })
                  }
                  label={"Código postal"}
                  fullWidth
                  margin="normal"
                  type="text"
                />
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: DeliveryData = { ...state, city: s.target.value };
                      return x;
                    })
                  }
                  label={"Ciudad"}
                  fullWidth
                  margin="normal"
                  type="text"
                />
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: DeliveryData = {
                        ...state,
                        phoneNumber: s.target.value
                      };
                      return x;
                    })
                  }
                  label={"Teléfono"}
                  fullWidth
                  margin="normal"
                  type="text"
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
            justifyContent: "center" // Centra horizontalmente el contenido
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Mantiene el contenido centrado verticalmente
              justifyContent: "center"
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
                maxWidth: "90%"
              }}
              onClick={async () => {
                if (
                  Object.values(user).every((value) =>
                    typeof value === "string" ? value.trim() !== "" : true
                  )
                ) {
                  var x = localStorage.getItem(storageKeys.token);
                  if (x) {
                    postMyDeliveryData(user, x);
                    router.push("/billing/pago");
                  }
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <AppFooter />
    </Box>
  );
}
