import { AppColorsHex } from "@/const/colors";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import useCartStore from "@/service/carrito/store";
import { useEffect, useState } from "react";
import { basepath } from "@/const/utils";
import { storageKeys } from "@/const/storage_keys";
import { useRouter } from "next/navigation";
import { FavoriteProduct } from "@/service/favorite-products/interface";
import useFavoriteProductosStore from "@/service/favorite-products/store";

export default function AppFavoriteProduct(props: {
  titulo: string;
  image: string;
  product: FavoriteProduct;
}) {
  // Router
  const router = useRouter();

  // Zustand
  const { cartProducts: cartItems } = useCartStore();
  const { addProductToFavorites, removeProductToFavorites } = useFavoriteProductosStore(state => state);

  // Estado local para manejar si el producto es favorito
  const [isFavorite, setIsFavorite] = useState(true);
  const [laodingFavorite, setLoadingFavorite] = useState(false);

  // Local Hooks
  const [count, setCount] = useState(0);

  useEffect(() => {
    const existingItem = cartItems.find(
      (item) => item.productId === props.product.id
    );
    if (existingItem) {
      setCount(existingItem.quantity);
    } else {
      setCount(0);
    }
  }, [props.product.id]);


  const toggleFavorite = async () => {
    if(laodingFavorite) return;
    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        await removeProductToFavorites(props.product.id);
      } else {
        await addProductToFavorites(props.product)
      }
      setLoadingFavorite(false);
      setIsFavorite((prevState) => !prevState); // Alterna el estado de favorito
    } catch {
      setLoadingFavorite(false);
    }
    console.log("Producto favorito:", props.titulo);
  };

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
      width={"100%"}
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
          <Box
            onClick={() => {
              router.push(`/product/${props.product.id}`);
            }}
            sx={{ cursor: "pointer" }}
          >
            <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
              <Image
                src={`/${basepath}/svg/${
                  isFavorite ? "heart_filled_svg.svg" : "heart_svg.svg"
                }`}
                alt="Favorito"
                width={30}
                height={30}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 2,
                  cursor: "pointer",
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleFavorite();
                }}
              />

              <Image
                fill
                alt="product Image"
                src={props.image}
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
                <Typography variant="h5">${props.product.price.toFixed(2)}</Typography>
                <Typography
                  variant="h5"
                  fontSize={"12px"}
                  textOverflow={"ellipsis"}
                  color={AppColorsHex.black}
                  sx={{ opacity: 0.6 }}
                >
                  Menudeo
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
                
                
              </Box>
            </Box>
          </Box>
          
        </Box>
      </Box>
      
    </Grid>
  );
}
