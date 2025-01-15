"use client";

import AppTarjetaPrecios from "@/components/carrito/app_tarjeta_precios";
import AppButton from "@/components/common/app_button";
import AppCartProduct from "@/components/common/app_cart_product";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import useCartStore from "@/service/carrito/store";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function Cart() {
  const { cartItems } = useCartStore();
  // router
  const router = useRouter();

  return (
    <Box>
      <AppNavBar />
      {/* Verifica si el carrito está vacío */}
      {cartItems.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="70vh"
          textAlign="center"
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Tu carrito está vacío :(
          </Typography>
          <AppButton
            label="Ir a comprar"
            onClick={() => router.push("/catalogo/0/0")}
          />
        </Box>
      ) : ( 
        <>
          {/* Lista de productos */}
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <AppCartProduct key={item.product.id} product={item.product} />
            ))}
          </Grid>
          <AppTarjetaPrecios />
        </>
      )}
      <AppFooter />
    </Box>
  );
}
