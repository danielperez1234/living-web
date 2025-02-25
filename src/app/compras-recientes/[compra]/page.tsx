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

export default function PurchaseDetail() {
  const { cartProducts: cartItems, getCart } = useCartStore();

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
          width={"80vw"}
          xs={12}
          alignContent={"center"}
          justifyContent={"center"}
        >
          <Card
            sx={{
              width: "70%",
              maxHeight: "60vh", // Altura máxima para evitar que crezca demasiado
              overflowY: "auto", // Habilita el scroll vertical si los productos sobrepasan la altura
              padding: "20px", // Añade padding para mejor presentación
              display: "flex",
              flexDirection: "column",
            }}
          >
            {cartItems.map((item, i) => (
              <AppProductDetail
                key={`approductCart${i}`}
                producto={item}
                cantidad={2} //TODO: Cambiar por numero dinámico
              />
            ))}
          </Card>
        </Grid>
        <AppFooter />
      </Box>
    </Box>
  );
}
