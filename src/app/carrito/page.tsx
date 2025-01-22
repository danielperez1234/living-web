"use client";

import AppButton from "@/components/common/app_button";
import AppCartProduct from "@/components/common/app_cart_product";
import AppNavBar from "@/components/common/app_nav_bar/main";
import useCartStore from "@/service/carrito/store";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function cart() {
  const { cartItems } = useCartStore();

  const handleTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.product.price * item.quantity;
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

  const [count, setCount] = useState(0);

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <AppNavBar />
        <Grid
          container
          marginX={"10%"}
          width={"80vw"}
          xs={12}
          alignContent={"center"}
          justifyContent={"center"}
        >
          {cartItems.map((item, i) => (
            <AppCartProduct product={item.product} />
          ))}
        </Grid>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: -1,
          }}
        >
          <AppNavBar />
          <Grid
            container
            marginX={"10%"}
            width={"80vw"}
            xs={12}
            alignContent={"center"}
            justifyContent={"center"}
          >
            {cartItems.map((item, i) => (
              <AppCartProduct product={item.product} />
            ))}
          </Grid>
        </Box>

        {/* Caja para la tabla fija en la esquina inferior derecha */}
        <Box
          sx={{
            position: "fixed", // Mantiene la posición fija
            bottom: 0, // Alinea al fondo de la ventana
            right: 0, // Alinea a la derecha
            padding: "16px", // Espaciado interno
            backgroundColor: "white", // Fondo blanco para visibilidad
            borderRadius: "16px", // Bordes redondeados
            zIndex: 10, // Asegura que esté por encima de otros elementos
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
                  <TableCell sx={{ fontWeight: "bolder", fontStyle: "italic" }}>
                    Total
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bolder", fontStyle: "italic" }}>
                    ${handleTotalWithShipping().toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AppButton label="Finalizar compra" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
