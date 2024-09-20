// pages/404.tsx
"use client";
import AppButton from "@/components/common/app_button";
import { AppColorsHex } from "@/const/colors";
import { Box, Typography, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

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
        textAlign: "center"
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
