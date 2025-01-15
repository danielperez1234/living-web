import { AppColorsHex } from "@/const/colors";
import useCartStore from "@/service/carrito/store";
import { Product } from "@/service/productos/interface";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import AppCounter from "./app_counter";

export default function AppCartProduct({ product }: { product: Product }) {
  // Zustand
  const { cartItems, updateQuantity, removeFromCart } = useCartStore();

  // Encuentra la cantidad actual en el carrito para este producto
  const existingItem = cartItems.find((item) => item.product.id === product.id);
  const count = existingItem ? existingItem.quantity : 0;

  // Manejadores de eventos
  const handleCountChange = (newCount: number) => {
    if (newCount === 0) {
      removeFromCart(product); // Elimina el producto si la cantidad es 0
    } else {
      updateQuantity(product, newCount); // Actualiza la cantidad en el store
    }
  };

  return (
    <Grid
      xs={12}
      sm={12}
      md={10}
      xl={10}
      item
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"100%"}
    >
      <Box
        bgcolor={AppColorsHex.white}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        width={"100%"}
        padding={"30px"}
      >
        {/* Imagen del producto */}
        <Box width={"15%"}>
          <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
            <Image
              fill
              alt="product Image"
              src={product.imageUrlOriginal}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>

        {/* Detalles del producto */}
        <Box>
          <Typography sx={{ textAlign: "center" }}>{product.name}</Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bolder" }}>
            ${product.price}
          </Typography>
        </Box>

        {/* Contador */}
        <AppCounter
          maxCount={product.maxOrder}
          count={count}
          setCount={handleCountChange}
        />

        {/* Precio total */}
        <Typography sx={{ fontWeight: "bolder", fontStyle: "italic" }}>
          ${product.price * count}
        </Typography>
      </Box>
    </Grid>
  );
}
