"use client";

import React, { useEffect, useState } from "react"; // Librería principal
import { useRouter } from "next/navigation"; // Next.js router
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"; // Material-UI componentes

import { AppColorsHex } from "@/const/colors"; // Constantes
import { storageKeys } from "@/const/storage_keys";

import useCartStore from "@/service/carrito/store"; // Hooks y stores
import useDeliveryDataStore from "@/service/delivery_data/store";

import { PostDeliveryData } from "@/service/delivery_data/interface"; // Interfaces
import {
  postMyDeliveryData,
  putMyDeliveryData,
} from "@/service/delivery_data/service"; // Servicios

import ProtectedRoute from "@/components/common/protected_route"; // Componentes comunes
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppFooter from "@/components/common/app_footer/main";
import AppButton from "@/components/common/app_button";
import AppTextField from "@/components/common/app_text_field";

export default function Billing() {
  //suztand
  const { deliveryData, getDeliveryData, clearDeliveryData } =
    useDeliveryDataStore((state) => state);
  const { cartProducts: cartItems, getCart } = useCartStore();
  //hooks

  const router = useRouter();
  const [user, setUser] = useState<PostDeliveryData>({
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    email: "",
    name: "",
    lastName: "",
    secondLastName: "",
  });
  const handleTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  const handleIVA = () => {
    let iva = handleTotal() * 0.16;
    return iva;
  };

  const handleShipping = () => {
    if (handleTotal() > 600) {
      return "Gratis";
    } else {
      return "$100";
    }
  };

  const handleTotalWithShipping = () => {
    if (handleTotal() > 600) {
      let total = handleTotal() + handleIVA();
      return total;
    } else {
      let total = handleTotal() + handleIVA() + 100;
      return total;
    }
  };
  useEffect(() => {
    clearDeliveryData();
    getDeliveryData();
  }, [getDeliveryData, clearDeliveryData]);
  useEffect(() => {
    console.log("datarecived");
    if (deliveryData) {
      setUser((state) => {
        return {
          address: deliveryData.address,
          city: deliveryData.city,
          postalCode: deliveryData.postalCode,
          phoneNumber: deliveryData.phoneNumber,
          email: deliveryData.email,
          name: deliveryData.user.name,
          lastName: deliveryData.user.lastName,
          secondLastName: deliveryData.user.secondLastName,
        };
      });
    }
  }, [deliveryData]);
  return (
    <Box
      sx={{
        backgroundColor: AppColorsHex.blue,
        minHeight: "100vh",
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
            justifyContent: "center", // Centra horizontalmente el contenido
          }}
        >
          <Card
            sx={{
              borderRadius: "30px",
              width: "90%",
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
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: PostDeliveryData = {
                        ...state,
                        name: s.target.value,
                      };
                      return x;
                    })
                  }
                  value={user.name}
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
                          var x: PostDeliveryData = {
                            ...state,
                            lastName: s.target.value,
                          };
                          return x;
                        })
                      }
                      value={user.lastName}
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
                          var x: PostDeliveryData = {
                            ...state,
                            secondLastName: s.target.value,
                          };
                          return x;
                        })
                      }
                      value={user.secondLastName}
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
                      var x: PostDeliveryData = {
                        ...state,
                        email: s.target.value,
                      };
                      return x;
                    })
                  }
                  value={user.email}
                  label={"Correo"}
                  fullWidth
                  margin="normal"
                  type="email"
                />
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: PostDeliveryData = {
                        ...state,
                        address: s.target.value,
                      };
                      return x;
                    })
                  }
                  value={user.address}
                  label={"Dirección"}
                  fullWidth
                  margin="normal"
                  type="text"
                />
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: PostDeliveryData = {
                        ...state,
                        postalCode: s.target.value,
                      };
                      return x;
                    })
                  }
                  value={user.postalCode}
                  label={"Código postal"}
                  fullWidth
                  margin="normal"
                  type="text"
                />
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: PostDeliveryData = {
                        ...state,
                        city: s.target.value,
                      };
                      return x;
                    })
                  }
                  value={user.city}
                  label={"Ciudad"}
                  fullWidth
                  margin="normal"
                  type="text"
                />
                <AppTextField
                  onChange={(s) =>
                    setUser((state) => {
                      var x: PostDeliveryData = {
                        ...state,
                        phoneNumber: s.target.value,
                      };
                      return x;
                    })
                  }
                  value={user.phoneNumber}
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <Typography variant="h5">Resumen de compra</Typography>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>${handleTotal()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>I.V.A</TableCell>
                    <TableCell>${handleIVA()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Envío</TableCell>
                    <TableCell>{handleShipping()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bolder", fontStyle: "italic" }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bolder", fontStyle: "italic" }}
                    >
                      ${handleTotalWithShipping().toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <AppButton
              label="Pagar"
              sx={{
                color: AppColorsHex.blue,
                backgroundColor: AppColorsHex.yellow,
                maxWidth: "90%",
              }}
              onClick={async () => {
                if (
                  Object.values(user).every((value) =>
                    typeof value === "string" ? value.trim() !== "" : true
                  )
                ) {
                  var x = localStorage.getItem(storageKeys.token);
                  if (x) {
                    if (deliveryData) {
                      putMyDeliveryData(user, x);
                    } else {
                      postMyDeliveryData(user, x);
                    }
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
