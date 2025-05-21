"use client";

// React y Next.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Material-UI
import {
  Backdrop,
  Box,
  IconButton,
  InputAdornment,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { storageKeys } from "@/const/storage_keys";

// Servicios y lógica de negocio
import { UserLoginRequest } from "@/service/token/interface";
import loginRequest from "@/service/token/service";

// Componentes comunes
import AppTextField from "@/components/common/app_text_field";
import AppButton from "@/components/common/app_button";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openBackDrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [user, setUser] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleLoginRequested = async () => {
    setOpenBackdrop(true);
    const response = await loginRequest(user);

    if (response.status == 401) {
      setErrorMsg("Usuario o contraseña incorrectos.");
      setOpenSnack(true);
      setOpenBackdrop(false);
    } else if (response.status == 200 && response.data) {
      localStorage.setItem(storageKeys.token, response.data.token);
      localStorage.setItem(storageKeys.email, response.data.email);
      localStorage.setItem(storageKeys.userName, response.data.userName);
      localStorage.setItem(storageKeys.refreshToken, response.data.refreshToken);
      router.push("/home");
    }
    setOpenBackdrop(false);
  };
  return (
    <Box
      marginY={"5%"}
      marginX={{ xs: "5%", md: "15%" }}
      mb={{ xs: "5%", md: "10%" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
    >
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={openBackDrop}
      ></Backdrop>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
      />
      <Box
        mb={10}
        flexGrow={0}
        padding={0}
        position={"relative"}
        height={"50px"}
        width={{ sm: "100%" }}
        display={"flex"}
        justifyContent={"end"}
      >
        <Image
          onClick={() => router.push("/home")}
          objectPosition="left center"
          fill
          src={`/${basepath}/marca/logo.png`}
          alt="logo Living"
          style={{
            objectPosition: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box
        position={"relative"}
        bgcolor={AppColorsHex.white}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        borderRadius={"50px"}
        width={"95%"}
        padding={"5%"}
        maxWidth={"800px"}
        mb={2}
        sx={{
          boxShadow:
            "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box mb={5}>
          <Typography variant="h1" color={AppColorsHex.blue}>
            Iniciar Sesión
          </Typography>
        </Box>
        <AppTextField
          onChange={(s) =>
            setUser((state) => {
              var x = { ...state, email: s.target.value };
              return x;
            })
          }
          label={"Correo"}
          fullWidth
          margin="normal"
          type="email"
        />
        <AppTextField
          label={"Tu contraseña"}
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(s) =>
            setUser((state) => {
              var x = { ...state, password: s.target.value };
              return x;
            })
          }
        />
      </Box>
      <AppButton label="Acceder" onClick={handleLoginRequested} />
      <AppButton
        label="Registrarme"
        onClick={() => router.push("/register")}
        color="warning"
        sx={{ minWidth: "18vw" }}
      />
    </Box>
  );
}
