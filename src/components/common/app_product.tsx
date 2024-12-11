import { AppColorsHex } from "@/const/colors";
import { Product } from "@/service/productos/interface";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import AppCounter from "./app_counter";
import AppButton from "./app_button";
import useCartStore from "@/service/carrito/store";
import { useEffect, useState } from "react";

export default function AppProduct(props: {
  titulo: string;
  image: string;
  product: Product;
}) {
  // Zustand
  const { cartItems, addToCart, updateQuantity, clearCart } = useCartStore();

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
      sm={6}
      md={4}
      xl={3}
      item
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      maxWidth={"280px"}
    >
      <Box
        bgcolor={AppColorsHex.white}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        borderRadius={"50px"}
        width={"100%"}
        sx={{
          boxShadow:
            "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box width={"85%"} marginY={"30px"}>
          <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
            <Image
              fill
              alt="product Image"
              src={props.image} // src={`/${basepath}/productos/1.jpg`}
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
          <Box>
            <Typography
              width={"100%"}
              mb={2}
              height={"50px"}
              textOverflow={"ellipsis"}
              style={{
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {props.titulo}
            </Typography>
          </Box>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            mb={2}
          >
            <Box width={"49%"}>
              <Typography variant="h5">${"45.00"}</Typography>
              <Typography
                variant="h5"
                fontSize={"12px"}
                textOverflow={"ellipsis"}
              >
                {`Menudeo`}
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              sx={{
                height: "50px",
                borderWidth: "0.5px",
                borderColor: AppColorsHex.black,
                margin: "0px",
                padding: "0px",
                opacity: 0.6,
              }}
            />
            <Box
              width={"49%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"end"}
            >
              <Typography variant="h5" color={AppColorsHex.blue}>
                ${"45.00"}
              </Typography>
              <Typography variant="h5" fontSize={"12px"}>
                {`a partir de ${"20"}pz`}
              </Typography>
            </Box>
          </Box>
          <AppCounter maxCount={40} count={count} setCount={setCount} />
        </Box>
      </Box>
      <AppButton
        label={"Agregar al carrito"}
        sx={{
          minWidth: "20%",
          maxWidth: "75%",
          height: "2.7vw",
          width: "100%",
        }}
        onClick={() => {
          console.log("count", count);
          addToCart(props.product, count);
        }}
      />
    </Grid>
  );
}
