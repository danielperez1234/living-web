"use client";
import AppTextField from "@/components/common/app_text_field";
import { AppColorsHex } from "@/const/colors";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AppButton from "@/components/common/app_button";
import { basepath } from "@/const/utils";
import { UserLoginRequest } from "@/service/token/interface";
import LoginRequested from "@/service/token/service";
import { storageKeys } from "@/const/storage_keys";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [user,setUser] = useState<UserLoginRequest>({email:'',password:''})
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleLoginRequested = async(
  ) => {
    const response = await LoginRequested(user);

              if (response.status == 401) {
                //setErrorMsg("Usuario o contraseña incorrectos.");
              } else if (response.status == 200 && response.data) {
                localStorage.setItem(storageKeys.token, response.data.token);
                localStorage.setItem(storageKeys.email, response.data.email);
                localStorage.setItem(
                  storageKeys.userName,
                  response.data.userName
                );
                router.push("/home");
              }
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
            objectFit: "contain"
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
        maxWidth={'800px'}
        mb={2}
        sx={{
          boxShadow:
            "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)"
        }}
      >
        <Box mb={5}>
          <Typography variant="h1" color={AppColorsHex.blue}>
            Iniciar Sesión
          </Typography>
        </Box>
        <AppTextField onChange={(s)=>setUser(state=>{
          var x = {...state,email:s.target.value}
          return x;
        })} label={"Correo"} fullWidth margin="normal" type="email" />
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
            )
          }}
          onChange={(s)=>setUser(state=>{
            var x = {...state, password:s.target.value}
            return x;
          })}
        />
      </Box>
      <AppButton label="Acceder" onClick={handleLoginRequested} />
      <AppButton label="Registrarme" onClick={()=>router.push('/registro')} color="warning" sx={{minWidth:'18vw'}} />
    </Box>
  );
}
