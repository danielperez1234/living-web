"use client";
import AppButton from "@/components/common/app_button";
import AppCounter from "@/components/common/app_counter";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { Box, Radio, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

export default function Page() {
  // Radio Buttons Color
  const [selectedValueColor, setSelectedValueColor] = useState<string>("");
  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValueColor(event.target.value);
  };

  const controlPropsColor = (item: string) => ({
    checked: selectedValueColor === item,
    onChange: handleChangeColor,
    value: item,
    inputProps: { "aria-label": item },
  });

  // Radio Buttons Modelo
  const [selectedValueModelo, setSelectedValueModelo] = useState<string>("");
  const handleChangeModelo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValueModelo(event.target.value);
  };

  const controlPropsModelo = (item: string) => ({
    checked: selectedValueModelo === item,
    onChange: handleChangeModelo,
    value: item,
    inputProps: { "aria-label": item },
  });

  return (
    <Box width={"100%"}>
      <AppNavBar />
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"5%"}
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          bgcolor={AppColorsHex.white}
          borderRadius={"9px"}
          width={"40%"}
          maxWidth={"500px"}
          minWidth={"200px"}
          sx={{
            boxShadow:
              "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: "20px", md: "0px" },
          }}
        >
          <Box width={"90%"}>
            <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
              <Image
                fill
                alt="product Image"
                src={`/${basepath}/productos/notebook.jpeg`}
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant="h1">Libreta espiral</Typography>
          <Typography
            mb={1}
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            variant="h5"
          >
            Marca: Normal
          </Typography>
          <Typography
            mb={1}
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            variant="h5"
          >
            Modelo:
            <Radio
              {...controlPropsModelo("azul")}
              sx={{
                width: "1px",
                height: "1px",
                borderRadius: "50%",
                border: "1px solid black",
                "&.Mui-checked": {
                  width: "16px",
                  height: "16px",
                  backgroundColor: AppColorsHex.blue,
                },
                "&.MuiRadio-colorPrimary": {
                  color: AppColorsHex.blue,
                },
                marginX: "5px",
                bottom: "3px",
              }}
            />
            <Radio
              {...controlPropsModelo("amarillo")}
              sx={{
                width: "1px",
                height: "1px",
                borderRadius: "50%",
                border: "1px solid black",
                "&.Mui-checked": {
                  width: "16px",
                  height: "16px",
                  backgroundColor: AppColorsHex.yellow,
                },
                "&.MuiRadio-colorPrimary": {
                  color: AppColorsHex.yellow,
                },
                marginX: "5px",
                bottom: "3px",
              }}
            />
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Typography
              mb={1}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="h5"
            >
              Color:
            </Typography>
            <Radio
              {...controlPropsColor("azul")}
              sx={{
                width: "1px",
                height: "1px",
                borderRadius: "50%",
                border: "1px solid black",
                "&.Mui-checked": {
                  width: "16px",
                  height: "16px",
                  backgroundColor: AppColorsHex.blue,
                },
                "&.MuiRadio-colorPrimary": {
                  color: AppColorsHex.blue,
                },
                marginX: "5px",
                bottom: "3px",
              }}
            />
            <Radio
              {...controlPropsColor("amarillo")}
              sx={{
                width: "1px",
                height: "1px",
                borderRadius: "50%",
                border: "1px solid black",
                "&.Mui-checked": {
                  width: "16px",
                  height: "16px",
                  backgroundColor: AppColorsHex.yellow,
                },
                "&.MuiRadio-colorPrimary": {
                  color: AppColorsHex.yellow,
                },
                marginX: "5px",
                bottom: "3px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>Cantidad: </Typography>
            <AppCounter maxCount={40} count={0} setCount={()=>{} } />
          </Box>
          <AppButton
            label="Añadir al carrito"
            sx={{ marginY: "5%", width: "100%", aspectRatio: 6 }}
          />
        </Box>
      </Box>
      <AppFooter />
    </Box>
  );
}
