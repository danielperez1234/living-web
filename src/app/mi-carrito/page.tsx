"use client";

// React y Next.js
import { useEffect, useState } from "react"; // Import useState
import { useRouter } from "next/navigation";

// Material-UI
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

// Constantes y utilidades
import { storageKeys } from "@/const/storage_keys";

// Servicios y lógica de negocio
import useCartStore from "@/service/carrito/store";

// Componentes comunes
import AppButton from "@/components/common/app_button";
import AppCartProduct from "@/components/common/app_cart_product";
import AppNavBar from "@/components/common/app_nav_bar/main";
import ProtectedRoute from "@/components/common/protected_route";

export default function Cart() {
  const { cartProducts: cartItems, getCart } = useCartStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // State to track client-side mount

  const handleTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };



  const handleShipping = () => {
    if (handleTotal() >= 600) {
      return "Gratis";
    } else {
      return "$100.00"; // Consistent formatting
    }
  };

  const handleTotalWithShipping = () => {
    let total = handleTotal()
    if (total <= 600) {
      total += 100;
    }
    return total;
  };

  useEffect(() => {
    setIsClient(true); // Component has mounted on the client
    const token = localStorage.getItem(storageKeys.token);
    if (token) {
      // Ensure getCart is stable or add to dependency array if it changes
      getCart(token);
    }
  }, [getCart]); // Add getCart to dependency array if appropriate

  // Display loading or placeholder for cart items until client-side hydration and data fetch
  const renderCartItems = () => {
    if (!isClient) {
      // Or some placeholder like <Typography>Cargando productos del carrito...</Typography>
      return <Typography sx={{ textAlign: 'center', marginY: 4 }}>Cargando carrito...</Typography>;
    }
    if (cartItems.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', marginY: 4, width: '100%' }}>
          <Typography variant="h6" gutterBottom>Oops... tu carrito parece vacío</Typography>
          <AppButton
            label="Ir al Catálogo"
            onClick={() => router.push("/catalogo/0/0")}
          />
        </Box>
      );
    }
    return cartItems.map((item, i) => (
      // Ensure AppCartProduct is wrapped in a Grid item for proper layout in a Grid container
      <AppCartProduct key={`approductCart${item.productId}_${item.selectedOptions.map(e=>e.id).join()}`} product={item} />
    ));
  };

  return (
    <Box>
      <ProtectedRoute />

      <AppNavBar />
      <Grid
        container
        marginX={"10%"}
        width={"80vw"}
        xs={12}
        alignContent={"center"}
        justifyContent={"center"}
      >
        {renderCartItems()}
      </Grid>
      <Box height={ 300}></Box>

        {/* Removed the redundant Box with zIndex: -1 and duplicate cart rendering logic */}

        {/* Summary Box - only render its content fully on the client */}
        {isClient && cartItems.length > 0 && ( // Render summary only if client and cart has items
          <Box
            sx={{
              position: "fixed",
              bottom: 16, // Use theme spacing or numbers
              right: 16,
              padding: 2, // Use theme spacing or numbers (e.g., theme.spacing(2))
              backgroundColor: "background.paper", // Use theme colors
              borderRadius: "16px",
              zIndex: 10,
              boxShadow: 3, // Material-UI shadow
              minWidth: 300, // Ensure it has some minimum width
            }}
          >
            <TableContainer component={Paper} elevation={0}> {/* Remove double shadow if parent has one */}
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {/* Corrected TableHead: Typography should be within a TableCell */}
                    <TableCell colSpan={2} sx={{ borderBottom: 'none', paddingBottom: 0 }}>
                      <Typography variant="h6" component="div">Resumen de compra</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">${handleTotal().toFixed(2)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Envío</TableCell>
                    <TableCell align="right">{handleShipping()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontStyle: "italic" }}>
                      Total
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontStyle: "italic" }} align="right">
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
                marginTop: 2, // Use theme spacing or numbers
              }}
            >
              <AppButton
                label="Finalizar compra"
                onClick={() => router.push("/billing")}
                disabled={cartItems.length === 0} // Already good
              />
            </Box>
          </Box>
        )}
    </Box>
  );
}