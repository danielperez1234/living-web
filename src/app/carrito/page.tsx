"use client";

import AppNavBar from "@/components/common/app_nav_bar/main";
import { AppColorsHex } from "@/const/colors";
import useCartStore from "@/service/carrito/store";
import { Box, Grid } from "@mui/material";
import Image from "next/image";

export default function cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useCartStore();

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
          rowSpacing={4}
          width={"80vw"}
          xs={12}
          alignContent={"center"}
          justifyContent={{ xs: "start", md: "space-between" }}
        >
          {cartItems.map((item, i) => (
            <Grid
              xs={12}
              sm={6}
              md={4}
              xl={3}
              item
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              alignItems={"center"}
              >
              <Box
                bgcolor={AppColorsHex.white}
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
                padding={"30px"}
                sx={{
                  boxShadow:
                    "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Box width={"75%"}>
                  <Box
                    width={"100%"}
                    sx={{ aspectRatio: 1, position: "relative" }}
                  >
                    <Image
                      fill
                      alt="product Image"
                      src={item.product.imageUrlOriginal}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </Box>
                hello
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
