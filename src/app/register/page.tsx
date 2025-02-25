"use client";

// React
import { useEffect, useState } from "react";

// Next.js
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

// Componentes comunes
import AppTextField from "@/components/common/app_text_field";
import AppButton from "@/components/common/app_button";

// Servicios y estado
import { registerRequest } from "@/service/token/service";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { storageKeys } from "@/const/storage_keys";

// Interfaces
import { UserRegistroRequest } from "@/service/token/interface";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openBackDrop, setOpenBackdrop] = useState(false);

  const [errorMessage, setErrorMsg] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [userRegister, setUserRegister] = useState<UserRegistroRequest>({
    email: "",
    password: "",
    userName: "",
  });
  const [userError, setUserError] = useState<UserRegistroRequest>({
    email: "",
    password: "",
    userName: "",
  });
  const [isWorng, setIsWrong] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const validateUserRegistro = () => {
    const errors: UserRegistroRequest = { ...userError };

    if (userRegister.email.length == 0) {
      errors.email = "";
    } else if (
      !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(userRegister.email)
    ) {
      errors.email = "El correo electrónico no es válido.";
    } else {
      errors.email = "";
    }
    if (userRegister.password.length == 0) {
      errors.password = "";
    } else if (userRegister.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    } else {
      errors.password = "";
    }
    setIsWrong(
      !Object.values(errors).every((value) =>
        typeof value === "string" ? value.trim() === "" : false
      )
    );
    setUserError(errors);
  };
  const handleRegisterRequested = async () => {
    setOpenBackdrop(true);
    const response = await registerRequest(userRegister);

    if (response.status == 401) {
      setErrorMsg("Usuario o contraseña incorrectos.");
      setOpenSnack(true);
      setOpenBackdrop(false);
    } else if (response.status == 200 && response.data) {
      localStorage.setItem(storageKeys.token, response.data.token);
      localStorage.setItem(storageKeys.email, response.data.email);
      localStorage.setItem(storageKeys.userName, response.data.userName);
      router.push("/home");
    } else {
      setErrorMsg(response.errors?.toString() ?? "");
      setOpenSnack(true);
      setOpenBackdrop(false);
    }
    setOpenBackdrop(false);
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
  useEffect(() => {
    validateUserRegistro();
  }, [userRegister]);
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
        message={errorMessage}
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
            Registrate
          </Typography>
        </Box>
        <AppTextField
          error={userError.userName.length > 0}
          helperText={userError.userName}
          label={"Nombre de usuario"}
          fullWidth
          margin="normal"
          type="text"
          onChange={(e) =>
            setUserRegister((state) => {
              return { ...state, userName: e.target.value };
            })
          }
        />
        <AppTextField
          error={userError.email.length > 0}
          helperText={userError.email}
          label={"Correo"}
          fullWidth
          margin="normal"
          type="email"
          onChange={(e) =>
            setUserRegister((state) => {
              return { ...state, email: e.target.value };
            })
          }
        />
        <AppTextField
          error={userError.password.length > 0}
          helperText={userError.password}
          label={"Tu contraseña"}
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setUserRegister((state) => {
              return { ...state, password: e.target.value };
            })
          }
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
        />
        {/* <AppTextField
          label={"Vuelve a introducir tu contraseña"}
          fullWidth
          margin="normal"
          type={"password"}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        /> */}
        {/* <AppDatePicker/> */}
      </Box>
      <AppButton
        label="Completar"
        disabled={
          !(
            Object.values(userRegister).every((value) =>
              typeof value === "string" ? value.trim() !== "" : true
            )
            // && passwordConfirm.trim() !== ""
          ) || isWorng
        }
        onClick={async () => {
          handleRegisterRequested();
        }}
      />
    </Box>
  );
}
