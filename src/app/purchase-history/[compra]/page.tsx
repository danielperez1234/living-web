"use client";

// Material-UI
import { Box, Card, Grid } from "@mui/material";

// Estado global (Zustand)
import useCartStore from "@/service/carrito/store";

// Componentes comunes
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppFooter from "@/components/common/app_footer/main";

// Componentes específicos
import AppProductDetail from "@/components/detalle/app_product_detail";
import usePurchaseHistory from "@/service/purchase-history/store";

export default function PurchaseDetail() {
  const { cartProducts: cartItems, getCart } = useCartStore();
  const {purchaseSelected} = usePurchaseHistory(state=>state);
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
          width={"100%"}
          xs={12}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Card
            sx={{
              width: {md:"90%",s:"90%",xs:"80%"},
              maxHeight: "60vh", // Altura máxima para evitar que crezca demasiado
              overflowY: "auto", // Habilita el scroll vertical si los productos sobrepasan la altura
              padding: "20px", // Añade padding para mejor presentación
              display: "flex",
              flexDirection: "column",
            }}
          >
            {purchaseSelected?.purchaseDetail.productsBought.map((item, i) => (
              <AppProductDetail
                key={`approductCart${i}`}
                producto={item}
                 //TODO: Cambiar por numero dinámico
              />
            ))}
          </Card>
        </Grid>
        <AppFooter />
      </Box>
    </Box>
  );
}
