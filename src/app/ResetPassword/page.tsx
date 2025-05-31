"use client";

// React
import { useEffect, useState } from "react";

// Next.js
import { useRouter, useSearchParams } from "next/navigation";
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
  useMediaQuery,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Componentes comunes
import AppTextField from "@/components/common/app_text_field";
import AppButton from "@/components/common/app_button";

// Servicios y estado
import { registerRequest, resetPassword } from "@/service/token/service";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { storageKeys } from "@/const/storage_keys";

// Interfaces
import { ResetPasswordRequest, UserRegistroRequest } from "@/service/token/interface";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openBackDrop, setOpenBackdrop] = useState(false);

  const [errorMessage, setErrorMsg] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [userRegister, setUserRegister] = useState<ResetPasswordRequest>({
    email: "",
    token:'',
    newPassword:''
  });
  const [userError, setUserError] = useState<ResetPasswordRequest>({
    email: "",
    token:'',
    newPassword:''
  });
  const [isWorng, setIsWrong] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const isSmallScreen = useMediaQuery((theme: any) =>
      theme.breakpoints.down("sm")
    );
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const validateUserRegistro = () => {
    const errors: ResetPasswordRequest = { ...userError };

    
    if (userRegister.newPassword.length == 0) {
      errors.newPassword = "";
    } else if (userRegister.newPassword.length < 6) {
      errors.newPassword = "La contraseña debe tener al menos 6 caracteres.";
    } else {
      errors.newPassword = "";
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
    const response = await resetPassword(userRegister);

   if (response.status == 200 && response.data) {
    setErrorMsg("Cambio de contraseña exitoso");
    setOpenSnack(true);
      const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
      await delay(3000)
      router.push("/login");
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
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    const emailFromUrl = searchParams.get('email');

    if (tokenFromUrl) {
      setUserRegister(state=>({...state,token:tokenFromUrl}));
      console.log("Token:", tokenFromUrl);
    }
    if (emailFromUrl) {
      setUserRegister(state=>({...state,email:emailFromUrl}));
      console.log("Email:", emailFromUrl);
    }
    // Aquí puedes usar el token y el email para tu lógica de reseteo de contraseña
  }, [searchParams]); // El efecto se re-ejecuta si searchParams cambia

  if (!userRegister.token || !userRegister.email) {
    return <p>Cargando parámetros o parámetros no encontrados...</p>;
  }

  

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
        alignItems={"center"}
        borderRadius={"50px"}
        justifyContent={'center'}
        width={{sm:"95%", xs:'100%'}}
        padding={ {md:"5%",sm:'20px', xs:'50px'}}
        maxWidth={"800px"}
        mb={2}
        sx={{
          boxShadow:
            "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box mb={5}>
          <Typography variant="h1" color={AppColorsHex.blue}>
            Ingreesa tu nueva contraseña
          </Typography>
        </Box>
        
        
        <AppTextField
          error={userError.newPassword.length > 0}
          helperText={userError.newPassword}
          label={"Tú nueva contraseña"}
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setUserRegister((state) => {
              return { ...state, newPassword: e.target.value };
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
        <AppTextField
          error={passwordConfirm != userRegister.newPassword}
          helperText={passwordConfirm != userRegister.newPassword ? `La contraseña no coincide ${passwordConfirm}  ${userRegister.newPassword}`:""}
          label={"Confirma tú contraseña"}
          fullWidth
          margin="normal"
          
          onChange={(e) =>
            setPasswordConfirm(e.target.value)
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
          ) || isWorng || userRegister.newPassword != passwordConfirm
        }
        onClick={async () => {
          handleRegisterRequested();
        }}
      />
    </Box>
  );
}
