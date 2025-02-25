"use client";

// Material-UI
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";

// React
import { useEffect, useState } from "react";

// Iconos
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Componentes comunes
import AppTextField from "@/components/common/app_text_field";
import AppButton from "@/components/common/app_button";

// Servicios y estado
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { storageKeys } from "@/const/storage_keys";
import { UserLoginRequest } from "@/service/token/interface";
import loginRequest from "@/service/token/service";

// Next.js
import { useRouter } from "next/navigation";

// Otros
import Image from "next/image";

interface OpenPay {
  setId(merchantId: string): void;
  setApiKey(apiKey: string): void;
  setSandboxMode(sandbox: boolean): void;
  token: {
    create(
      cardData: {
        card_number: string;
        holder_name: string;
        expiration_year: string;
        expiration_month: string;
        cvv2: string;
      },
      successCallback: (response: { data: { id: string } }) => void,
      errorCallback: (error: any) => void
    ): void;
  };
}

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
  useEffect(() => {
    // Dynamically add the Openpay script
    // if (!document.getElementById('openpay-script')) {
    //   const script = document.createElement('script');
    //   script.src = 'https://resources.openpay.mx/lib/openpay-js/1.2.38/openpay.v1.min.js';
    //   script.type = 'text/javascript';
    //   script.id = 'openpay-script';
    //   script.onload = () => {
    //     console.log('Openpay script loaded');
    //     if (window.OpenPay) {
    //       // Initialize Openpay after the script loads
    //       window.OpenPay.setId('mrd3wptlgzchwuuzrasn');
    //       window.OpenPay.setApiKey('pk_2e3d6952209f4a778846af257f5574e1');
    //       window.OpenPay.setSandboxMode(true); // Use false for production
    //     }
    //   };
    //   document.body.appendChild(script);
    // }
  }, []);

  const handlePayment = () => {
    console.log("hola");
    // if (window.OpenPay) {
    //   const cardData = {
    //     card_number: '4111111111111111',
    //     holder_name: 'Juan Perez',
    //     expiration_year: '25',
    //     expiration_month: '12',
    //     cvv2: '123',
    //   };

    //   window.OpenPay.token.create(
    //     cardData,
    //     (response) => {
    //       console.log('Token created successfully:', response.data.id);
    //     },
    //     (error) => {
    //       console.error('Error creating token:', error);
    //     }
    //   );
    // } else {
    //   console.error('OpenPay is not loaded');
    // }
  };
  const handleLoginRequested = async () => {
    const response = await loginRequest(user);

    if (response.status == 401) {
      //setErrorMsg("Usuario o contraseña incorrectos.");
    } else if (response.status == 200 && response.data) {
      localStorage.setItem(storageKeys.token, response.data.token);
      localStorage.setItem(storageKeys.email, response.data.email);
      localStorage.setItem(storageKeys.userName, response.data.userName);
      router.push("/banners");
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
            Pagar
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
      <AppButton label="Acceder" onClick={() => handlePayment()} />
      <AppButton
        label="Registrarme"
        onClick={() => router.push("/registro")}
        color="warning"
        sx={{ minWidth: "18vw" }}
      />
    </Box>
  );
}
