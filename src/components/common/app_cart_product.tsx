import { AppColorsHex } from "@/const/colors";
import useCartStore from "@/service/carrito/store";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import AppCounter from "./app_counter";
import { CartProduct } from "@/service/carrito/interface";

export default function AppCartProduct({ product }: { product: CartProduct }) {
  const {
    cartProducts: cartItems,
    updateQuantity,
    removeFromCart,
  } = useCartStore();
  const existingItem = cartItems.find(
    (item) => item.productId === product.productId
  );
  const count = existingItem ? existingItem.quantity : 0;

  const handleCountChange = (newCount: number) => {
    if (newCount === 0) {
      removeFromCart(product);
    } else {
      updateQuantity(product, newCount);
    }
  };

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Grid
      xs={12}
      sm={12}
      md={10}
      xl={10}
      item
      display={"flex"}
      flexDirection={isSmallScreen ? "column" : "row"}
      justifyContent={isSmallScreen ? "center" : "space-evenly"}
      alignItems={"center"}
      width={"100%"}
    >
      <Box
        bgcolor={AppColorsHex.white}
        display={"flex"}
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={isSmallScreen ? "center" : "center"}
        justifyContent={isSmallScreen ? "center" : "space-evenly"}
        width={"100%"}
        padding={isSmallScreen ? "15px" : "30px"}
        gap={isSmallScreen ? "20px" : "0"}
      >
        <Box
          width={isSmallScreen ? "50%" : "15%"}
          marginBottom={isSmallScreen ? "15px" : "0"}
        >
          <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
            <Image
              fill
              alt="product Image"
              src={product.imageUrl}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>
        </Box>

        <Box
          textAlign={isSmallScreen ? "center" : "left"}
          marginBottom={isSmallScreen ? "15px" : "0"}
        >
          <Typography sx={{ textAlign: "center" }}>
            {product.productName}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bolder",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
            }}
          >
            ${product.price}
          </Typography>
        </Box>

        {isSmallScreen && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            marginBottom="15px"
          >
            <AppCounter
              maxCount={product.maxOrder}
              count={count}
              setCount={handleCountChange}
            />
          </Box>
        )}

        {!isSmallScreen && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <AppCounter
              maxCount={product.maxOrder}
              count={count}
              setCount={handleCountChange}
            />
          </Box>
        )}

        <Typography
          sx={{
            fontWeight: "bolder",
            fontStyle: "italic",
            fontSize: isSmallScreen ? "1rem" : "1.25rem",
          }}
        >
          ${product.price * count}
        </Typography>
      </Box>
    </Grid>
  );
}
