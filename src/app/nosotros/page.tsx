"use client";
import "leaflet/dist/leaflet.css";
import { Box, Divider, FormControl, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import AppBackgroundImage from "@/components/common/background_image";
import AppNavBar from "@/components/common/app_nav_bar/main";
import App_dataform from "@/components/common/app_dataform";
import { AppColorsHex } from "@/const/colors";
import AppButton from "@/components/common/app_button";
import AppTextField from "@/components/common/app_text_field";
import AppFooter from "@/components/common/app_footer/main";

export default function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/nosotros/my_map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  /// Popup: Formulario de contactanos
  const [showPopUp, setShowPopup] = useState(false);
  const handlePopup = () => setShowPopup(!showPopUp);

  return (
    <AppBackgroundImage>
      <AppNavBar />
      <Box
        marginX={{ xs: "5%", md: "15%" }}
        mb={{ xs: "5%", md: "15%" }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Typography variant="h1" marginBottom={6}>Contacto</Typography>
        <Box
          width={"100%"}
          borderRadius={"25px"}
          overflow={"hidden"}
          sx={{
            background: AppColorsHex.white,
            padding: "3%",
            boxShadow:
              "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography fontStyle={"italic"}>Ubicaciones</Typography>
          <Typography
            variant={"h5"}
            sx={{ fontWeight: "bold", marginBottom: 1 }}
            overflow={"clip"}
          >
            Conoce nuestras tiendas físicas
          </Typography>
          <Box
            width={"100%"}
            borderRadius={"25px"}
            overflow={"hidden"}
            boxShadow={4}
            sx={{
              aspectRatio: 2,
            }}
          >
            <Map />
          </Box>
          <Divider
            sx={{
              borderColor: AppColorsHex.blue,
              marginTop: 1,
              borderWidth: "3px",
              borderRadius: "100px",
              marginBottom: 4,
            }}
          />
        </Box>
        <AppButton
          label="Contáctanos"
          onClick={() => setShowPopup(true)}
          sx={{
            fontSize: 30,
            marginTop: 5,
            maxWidth: 400,
            width: "100%",
            aspectRatio: 7,
          }}
        />
        {showPopUp && (
          <App_dataform showPopup={showPopUp} handleShowPopup={handlePopup}>
            <Typography variant="h1" sx={{ color: AppColorsHex.blue }}>
              ¡Contáctanos!
            </Typography>
            <FormControl>
              <AppTextField label="Nombre" fullWidth margin="normal" />
              <AppTextField label="Correo" fullWidth margin="normal" />
              <AppTextField label="Teléfono" fullWidth margin="normal" />
            </FormControl>
            <Box display="flex" justifyContent="flex-end">
              <AppButton
                label="Enviar"
                sx={{ marginTop: "40px" }}
                onClick={handlePopup}
              />
            </Box>
          </App_dataform>
        )}
      </Box>
      <AppFooter />
    </AppBackgroundImage>
  );
}
