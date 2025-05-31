import { AppColorsHex } from "@/const/colors";
import { CartProduct } from "@/service/carrito/interface";
import useCartStore from "@/service/carrito/store";
import { ProductsBought } from "@/service/purchase-history/interface";
import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AppProductDetail({ producto }: {
  producto: ProductsBought;
}) {
  // Router
  const router = useRouter();

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  return (
    <Grid
      xs={12}
      sm={12}
      md={12}
      xl={12}

      display={"flex"}
      flexDirection={"column"} // Siempre en columna para separar elementos
      alignItems={"center"}
      width={"100%"}
    >
      {/* Contenedor principal del producto */}
      <Box
        bgcolor={AppColorsHex.white}
        display={"flex"}
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={"center"}
        justifyContent={isSmallScreen ? "center" : "space-between"}
        width={"100%"}
        padding={isSmallScreen ? "15px" : "20px"}
        gap={isSmallScreen ? "20px" : "30px"} // Más espacio entre columnas en modo row
      >
        {/* Imagen del producto */}
        <Box
          width={isSmallScreen ? "50%" : "20%"} // Ajuste del ancho de la imagen
          marginBottom={isSmallScreen ? "15px" : "0"}
        >
          <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
            <Image
              fill
              alt="product Image"
              src={producto.imageUrlSmall}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>
        </Box>

        {/* Nombre y precio del producto */}
        <Box
          onClick={() => router.push(`/product/${producto.productId}`)}
          sx={{ cursor: "pointer", width: isSmallScreen ? "100%" : "30%" }} // Ajuste del ancho
        >
          <Typography
            sx={{
              textAlign: isSmallScreen ? "center" : "left",
              fontWeight: "bold",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap", // Truncar texto con ...
            }}
          >
            {producto.name}
          </Typography>
          <Typography
            sx={{
              textAlign: isSmallScreen ? "center" : "left",
              fontWeight: "bolder",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
              color: "primary.main",
            }}
          >
            ${producto.price}
          </Typography>
        </Box>

        {/* Cantidad de unidades compradas */}
        <Box
          textAlign={isSmallScreen ? "center" : "left"}
          width={isSmallScreen ? "100%" : "20%"} // Ajuste del ancho

        >
          <Typography sx={{ textAlign: isSmallScreen ? "center" : "left" }}>
            Unidades compradas
          </Typography>
          <Typography
            sx={{
              textAlign: isSmallScreen ? "center" : "left",
              fontWeight: "bolder",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
            }}
          >
            {producto.quantity}
          </Typography>
        </Box>

        {/* Precio total */}
        <Box
          textAlign={isSmallScreen ? "center" : "left"}
          width={isSmallScreen ? "100%" : "20%"} // Ajuste del ancho
        >
          <Typography
            sx={{
              fontWeight: "bolder",
              fontStyle: "italic",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
              color: "primary.main",
            }}
          >

            ${producto.price * producto.quantity}
          </Typography>
        </Box>
        {producto.selectedOptions.length && <Box
          textAlign={isSmallScreen ? "center" : "left"}
          width={isSmallScreen ? "100%" : "30%"} // Ajuste del ancho
        >
          {producto.selectedOptions.map((element) =>
            <Box key={`selectedOption_${producto.productId}_${element.id}`} display={'flex'} flexDirection={'row'} justifyContent={isSmallScreen ? "center" : "start"} alignItems={'center'} gap={2}>
              <Image width={25} height={25} style={{ borderRadius: 25 }} src={element.image} alt={`image_${producto.productId}_${element.id}`} />
              <Typography
                sx={{
                  textAlign: isSmallScreen ? "center" : "left",
                  fontWeight: "bolder",
                  fontSize: isSmallScreen ? "1rem" : "1.25rem",
                }}
              >
                {element.text}
              </Typography>
            </Box>)}

        </Box>}
      </Box>

      {/* Divisor */}
      <Divider sx={{ width: "100%", my: 1 }} />
    </Grid>
  );
}
