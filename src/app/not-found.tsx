// pages/404.tsx
// Librerías y hooks
'use client'
import React from "react"; // React
import { useRouter } from "next/navigation"; // Router de Next.js

// Componentes comunes
import AppButton from "@/components/common/app_button";

// Material-UI
import { Box, Typography, Container } from "@mui/material";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Regresar a la página principal
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        color={AppColorsHex.blue}
        sx={{ fontSize: "4rem", fontWeight: "bold", mb: 2 }}
      >
        404
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Oops! La página que buscas no fue encontrada.
      </Typography>

      <AppButton
        color="primary"
        onClick={handleGoBack}
        label={"Volver al Inicio"}
      />
    </Container>
  );
};

export default NotFoundPage;
