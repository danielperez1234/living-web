import { AppColorsHex } from "@/const/colors";
import { CartProduct } from "@/service/carrito/interface";
import useCartStore from "@/service/carrito/store";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AppProductDetail(props: {
  producto: CartProduct;
  cantidad: number;
}) {
  // Router
  const router = useRouter();

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
              src={props.producto.imageUrl}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>
        </Box>

        <Box
          onClick={() => {
            router.push(`/product/${props.producto.productId}`);
          }}
          sx={{ cursor: "pointer", display: "contents" }}
        >
          <Box
            textAlign={isSmallScreen ? "center" : "left"}
            marginBottom={isSmallScreen ? "15px" : "0"}
          >
            <Typography sx={{ textAlign: "center" }}>
              {props.producto.productName}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: isSmallScreen ? "1rem" : "1.25rem",
              }}
            >
              ${props.producto.price}
            </Typography>
          </Box>

          <Box
            textAlign={isSmallScreen ? "center" : "left"}
            marginBottom={isSmallScreen ? "15px" : "0"}
          >
            <Typography sx={{ textAlign: "center" }}>
              Unidades compradas
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: isSmallScreen ? "1rem" : "1.25rem",
              }}
            >
              {/* TODO: La condición no va*/}
              {props.cantidad ? props.cantidad : 1}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontWeight: "bolder",
              fontStyle: "italic",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
            }}
          >
            ${props.producto.price * (props.cantidad ? props.cantidad : 1)}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
