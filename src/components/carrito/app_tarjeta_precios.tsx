import { AppColorsHex } from "@/const/colors";
import useCartStore from "@/service/carrito/store";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AppButton from "../common/app_button";
import React from "react";
import { useRouter } from "next/navigation";

export default function AppTarjetaPrecios() {
  //router
  const router = useRouter();

  const { cartProducts: cartItems, clearCart } = useCartStore();

  // Cálculos optimizados con useMemo
  const subtotal = React.useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const iva = React.useMemo(() => subtotal * 0.16, [subtotal]);
  const shipping = React.useMemo(
    () => (subtotal > 600 ? "Gratis" : "$100"),
    [subtotal]
  );
  const totalWithShipping = React.useMemo(() => {
    const shippingCost = subtotal > 600 ? 0 : 100;
    return subtotal + iva + shippingCost;
  }, [subtotal, iva]);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        padding: "16px",
        backgroundColor: "white",
        borderRadius: "16px",
        zIndex: 10,
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {/* <Typography
              variant="h5"
              sx={{
                color: AppColorsHex.black,
                fontWeight: "bold",
                width: "100%",
                backgroundColor: "red",
              }}
            >
              Resumen de compras
            </Typography> */}
            <TableCell
              sx={{
                color: AppColorsHex.black,
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              Resumen de compras
            </TableCell>
            <TableCell />
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>${subtotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IVA</TableCell>
              <TableCell>${iva.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Envío</TableCell>
              <TableCell>{shipping}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                ${totalWithShipping.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ textAlign: "right", marginTop: 2 }}>
        <AppButton
          label="Finalizar compra"
          onClick={() => router.push("/billing")}
        />
      </Box>
    </Box>
  );
}
