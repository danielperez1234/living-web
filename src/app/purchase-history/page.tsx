"use client";

// React y Next.js
import { useEffect } from "react";
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
import usePurchaseHistory from "@/service/purchase-history/store";
import ProtectedRoute from "@/components/common/protected_route";
import AppPurchaceHistoryElement from "@/components/purchase-history/app_cart_product";

export default function Cart() {
  const { purchaseHistory: puchaseHistory, getPurchaseHistory } = usePurchaseHistory();
  const router = useRouter();
  




  useEffect(() => {
    const token = localStorage.getItem(storageKeys.token);
    if (token) {
      getPurchaseHistory();
    }
  }, []);

  return (
    <Box>
      <ProtectedRoute/>
      {/* ToDO - Reactivar el protected route */}
      {/*<ProtectedRoute />*/}
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
          {puchaseHistory?.map((item, i) => (
            <AppPurchaceHistoryElement key={`app-historyelement-${i}`} item={item} />
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
            {(puchaseHistory?.length ?? 0) > 0 ? (
              puchaseHistory?.map((item, i) => (
                <AppPurchaceHistoryElement key={`app-historyelement-${i}`} item={item} />
              ))
            ) : (
              <Box>
                <Typography>Oops... aun no tienes compras</Typography>
                <AppButton
                  label="Ir al Catálogo"
                  onClick={() => router.push("/catalogo/0/0")}
                />
              </Box>
            )}
          </Grid>
        </Box>
       
      </Box>
    </Box>
  );
}
