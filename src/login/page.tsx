"use client";

// React y Next.js
import { useState, useRef } from "react"; // Importa useRef
import { useRouter } from "next/navigation";
import Image from "next/image";

// Material-UI
import {
  Backdrop,
  Box,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  SnackbarCloseReason,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Librería reCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";
import { storageKeys } from "@/const/storage_keys";

// Servicios y lógica de negocio
// Asegúrate de que esta interfaz incluya 'recaptchaToken'
import { UserLoginRequest } from "@/service/token/interface";
import loginRequest from "@/service/token/service"; // Este servicio debe enviar el token

// Componentes comunes
import AppTextField from "@/components/common/app_text_field";
import AppButton from "@/components/common/app_button";

// --- !!! IMPORTANTE: REEMPLAZA ESTA CLAVE CON TU CLAVE DEL SITIO DE RECAPTCHA V2 !!! ---
const RECAPTCHA_V2_SITE_KEY = "6LfHcVErAAAAAIzwzCPH9-7RZISH5eEzOXkioMgd";
// --- !!! NO USES TU CLAVE SECRETA AQUÍ !!! ---

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openBackDrop, setOpenBackdrop] = useState(false);
  const [errorMessage, setErrorMsg] = useState("Ha ocurrido un error."); // Mensaje de error por defecto
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null); // Referencia al componente ReCAPTCHA

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [user, setUser] = useState<Omit<UserLoginRequest, "recaptchaToken">>({
    email: "",
    password: "",
  });
 const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (!token) {
      // El token puede ser null si expira o si hay un error al cargar reCAPTCHA
      setErrorMsg("El reCAPTCHA ha expirado o fallado. Por favor, inténtalo de nuevo.");
      setOpenSnack(true);
    }
  };

  const handleLoginRequested = async () => {
    if (!recaptchaToken) {
      setErrorMsg("Por favor, completa el reCAPTCHA para continuar.");
      setOpenSnack(true);
      return;
    }

    setOpenBackdrop(true);

    const loginPayload: UserLoginRequest = {
      ...user,
      recaptchaToken: recaptchaToken, // Incluye el token en el payload
    };

    try {
      const response = await loginRequest(loginPayload); // Tu servicio debe enviar este payload
      setOpenBackdrop(false);

      if (response.status === 401) {
        setErrorMsg(response.errors || "Usuario o contraseña incorrectos.");
        setOpenSnack(true);
        recaptchaRef.current?.reset(); // Reinicia reCAPTCHA
        setRecaptchaToken(null);
      } else if (response.status === 400 && response.errors?.toLowerCase().includes("recaptcha")) {
        // Ejemplo si el backend devuelve un error específico de reCAPTCHA
        setErrorMsg(response.errors || "Falló la verificación reCAPTCHA. Intenta de nuevo.");
        setOpenSnack(true);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else if (response.status === 200 && response.data) {
        localStorage.setItem(storageKeys.token, response.data.token);
        localStorage.setItem(storageKeys.email, response.data.email);
        localStorage.setItem(storageKeys.userName, response.data.userName);
        localStorage.setItem(storageKeys.refreshToken, response.data.refreshToken);
        router.push("/home");
      } else {
        setErrorMsg(response.errors || "Ocurrió un error durante el inicio de sesión.");
        setOpenSnack(true);
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      }
    } catch (error) {
      setOpenBackdrop(false);
      setErrorMsg("Error de conexión o respuesta inesperada del servidor.");
      setOpenSnack(true);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      console.error("Login request failed:", error);
    }
  };

  return (
    <Box
      marginY={"5%"}
      marginX={{ xs: "5%", md: "15%" }}
      mb={{ xs: "5%", md: "10%" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={openBackDrop}
      ></Backdrop>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage} // Muestra el mensaje de error del estado
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
            cursor: "pointer"
          }}
        />
      </Box>
      <Box
        component="form" // Es buena práctica usar un tag <form>
        onSubmit={(e) => {
            e.preventDefault(); // Previene el envío tradicional del formulario
            handleLoginRequested();
        }}
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
            Iniciar Sesión
          </Typography>
        </Box>
        <AppTextField
          onChange={(s) =>
            setUser((state) => ({ ...state, email: s.target.value }))
          }
          value={user.email} // Controla el valor
          label={"Correo"}
          fullWidth
          margin="normal"
          type="email"
          required // Añade validación básica HTML5
        />
        <AppTextField
          label={"Tu contraseña"}
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={user.password} // Controla el valor
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
            setUser((state) => ({ ...state, password: s.target.value }))
          }
          required // Añade validación básica HTML5
        />
        <Link href={"/"} color="primary" underline="hover">
        <Typography typography={'body2'}>

        Recuperar contraseña
        </Typography>
        </Link>
        {/* --- Componente ReCAPTCHA --- */}
        
        {/* --- Fin Componente ReCAPTCHA --- */}

        <AppButton label="Acceder" type="submit" /> {/* Cambiado onClick a type="submit" */}
      </Box>

      <AppButton
        label="Registrarme"
        onClick={() => router.push("/register")}
        color="warning"
        sx={{ minWidth: "18vw" }}
      />
      <Box height={200}/>
      <Box  mt={2} mb={2} display="flex" justifyContent="center" position="fixed" alignSelf={'center'} bottom={10}  >
          <ReCAPTCHA
            size={isSmallScreen?"compact":'normal'}
            ref={recaptchaRef}
            sitekey={RECAPTCHA_V2_SITE_KEY}
            onChange={handleRecaptchaChange}
            onExpired={() => { // Opcional: maneja la expiración explícitamente
                setRecaptchaToken(null);
                setErrorMsg("El reCAPTCHA ha expirado. Por favor, resuélvelo de nuevo.");
                setOpenSnack(true);
            }}
            onErrored={() => { // Opcional: maneja errores al cargar reCAPTCHA
                setRecaptchaToken(null);
                setErrorMsg("Error al cargar reCAPTCHA. Verifica tu conexión o inténtalo más tarde.");
                setOpenSnack(true);
            }}
            hl="es" // Opcional: Configura el idioma a español
          />
        </Box>
    </Box>
  );
}