import { AppColorsHex } from "@/const/colors";
import useCartStore from "@/service/carrito/store";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

import { CartProduct } from "@/service/carrito/interface";
import { PurchaseHistoryElement } from "@/service/purchase-history/interface";
import { useRouter } from "next/navigation";
import usePurchaseHistory from "@/service/purchase-history/store";

export default function AppPurchaceHistoryElement({ item }: { item: PurchaseHistoryElement }) {
  const { selectPurchase } = usePurchaseHistory(state => state);
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const router = useRouter();
  return (
    <Grid
      xs={12}
      sm={12}
      md={10}
      xl={10}
      item
      marginBottom={3}
      display={"flex"}
      flexDirection={isSmallScreen ? "column" : "row"}
      justifyContent={isSmallScreen ? "center" : "space-between"}
      alignItems={"center"}
      width={"100%"}
    >
      <Box
        onClick={() => {
          selectPurchase(item);
          router.push('/purchase-history/detail');
        }}
        bgcolor={AppColorsHex.white}
        display={"flex"}
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={"center"}
        justifyContent={isSmallScreen ? "center" : "space-between"}
        width={"100%"}
        padding={isSmallScreen ? "15px" : "20px"}
        gap={isSmallScreen ? "10px" : "20px"}
        borderRadius={"8px"}
        boxShadow={3}
        sx={{
          cursor: "pointer", // Cambia el cursor a pointer para indicar que es clickeable
          transition: "background-color 0.3s ease, transform 0.2s ease", // Agrega una transición suave
          "&:hover": {
            backgroundColor: "#f5f5f5", // Cambia el color de fondo al pasar el mouse
            transform: "scale(1.02)", // Aumenta ligeramente el tamaño al hacer hover
          },
          "&:active": {
            backgroundColor: "#e0e0e0", // Cambia el color de fondo al hacer clic
            transform: "scale(0.98)", // Reduce ligeramente el tamaño al hacer clic
          },
        }}
      >
        {/* Estado y Monto */}
        <Box textAlign={isSmallScreen ? "center" : "left"}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
              color: item.status === "completed" ? "green" : "orange",
            }}
          >
            {item.status}
          </Typography>
          <Typography
            sx={{
              fontWeight: "bolder",
              fontSize: isSmallScreen ? "1.25rem" : "1.5rem",
            }}
          >
            ${item.amount}
          </Typography>
        </Box>

        {/* Detalles de envío */}
        <Box textAlign={isSmallScreen ? "center" : "left"}>
          <Typography sx={{ fontWeight: "500", color: "text.secondary" }}>
            Enviado a:
          </Typography>
          <Typography>
            {item.purchaseDetail.address}, {item.purchaseDetail.city}
          </Typography>
          <Typography>
            {item.purchaseDetail.postalCode} | {item.purchaseDetail.phoneNumber}
          </Typography>
        </Box>

        {/* Cantidad de productos */}
        <Box textAlign={isSmallScreen ? "center" : "left"}>
          <Typography sx={{ fontWeight: "500", color: "text.secondary" }}>
            Productos:
          </Typography>
          <Typography>
            {item.purchaseDetail.productsBought.length} artículos
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
