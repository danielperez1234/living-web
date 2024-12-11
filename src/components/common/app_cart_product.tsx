import { AppColorsHex } from "@/const/colors";
import useCartStore from "@/service/carrito/store";
import { Product } from "@/service/productos/interface";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import AppCounter from "./app_counter";

export default function AppCartProduct(props: { product: Product }) {
  // Zustand
  const { cartItems } = useCartStore();
  // Locak Hooks
  const [count, setCount] = useState(0);

  useEffect(() => {
    const existingItem = cartItems.find(
      (item) => item.product.id === props.product.id
    );
    if (existingItem) {
      setCount(existingItem.quantity);
    } else {
      setCount(0);
    }
  }, [props.product.id]);

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
        <Box width={"15%"}>
          <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
            <Image
              fill
              alt="product Image"
              src={props.product.imageUrlOriginal}
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>
        <Box>
          <Typography sx={{ textAlign: "center" }}>
            {props.product.name}
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bolder" }}>
            ${props.product.price}
          </Typography>
        </Box>
        <AppCounter
          maxCount={props.product.maxOrder}
          count={count}
          setCount={setCount}
        />
        <Typography sx={{ fontWeight: "bolder", fontStyle: "italic" }}>
          ${props.product.price * count}
        </Typography>
      </Box>
    </Grid>
  );
}
