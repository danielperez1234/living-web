"use client";

import React, { useEffect, useRef, useState, useCallback } from "react"; // React y hooks
import { useRouter } from "next/navigation"; // Next.js

// Material-UI
import { Box, Card, CardContent, Grid, Button, TextField, Typography } from "@mui/material";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";
import { PostOpenPayment } from "@/service/pago/service";
import { storageKeys } from "@/const/storage_keys";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";

// --- Corrected/Adjusted OpenPay Type Definitions ---
interface OpenPayDeviceData {
  // Parameter name changed from hiddenFieldName to fieldName to match the error
  setup: (formId: string | HTMLFormElement, fieldName: string) => string;
}

interface OpenPayToken {
  extractFormAndCreate: (
    formElement: HTMLFormElement,
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void
  ) => void;
  // Add other token methods if known from the OpenPay SDK you are using
}

// This is the OpenPayCard interface, which we can't include in OpenPayInstance
// directly if the existing global type for Window.OpenPay doesn't have it.
interface OpenPayCard {
  validateCardNumber: (cardNumber: string) => boolean;
  validateCVC: (cvc: string, cardNumber?: string) => boolean;
  validateExpiry: (month: string, year: string) => boolean;
  getCardType: (cardNumber: string) => string | null;
}

// This OpenPayInstance is adjusted to match the type TypeScript expects,
// based on the error message.
interface OpenPayInstance {
  setId: (id: string) => void;
  setApiKey: (apiKey: string) => void;
  setSandboxMode: (isSandbox: boolean) => void;
  deviceData: OpenPayDeviceData; // Uses the corrected OpenPayDeviceData
  token: OpenPayToken;
  // The 'card?: OpenPayCard;' property is REMOVED here to match the
  // conflicting type that TypeScript has encountered elsewhere.
  // If OpenPay.card methods are available and you need to use them,
  // you might have to cast or augment the Window.OpenPay type
  // more carefully globally, or check for the property's existence at runtime.
  // For example: if (window.OpenPay && 'card' in window.OpenPay) { ... }
  // or (window.OpenPay as OpenPayInstance & { card?: OpenPayCard }).card?.validateCardNumber(...);
}

declare global {
  interface Window {
    OpenPay: OpenPayInstance; // Use the adjusted OpenPayInstance
  }
}
// --- End of Corrected OpenPay Type Definitions ---


// Es MUY RECOMENDABLE usar variables de entorno para esto
const OPENPAY_ID = process.env.NEXT_PUBLIC_OPENPAY_ID;
const OPENPAY_API_KEY = process.env.NEXT_PUBLIC_OPENPAY_API_KEY;
const OPENPAY_SANDBOX_MODE = process.env.NEXT_PUBLIC_OPENPAY_SANDBOX_MODE === 'true';

interface FormData {
  holder_name: string;
  card_number: string;
  expiration_month: string;
  expiration_year: string;
  cvv2: string;
}

interface FormErrors {
  holder_name?: string;
  card_number?: string;
  expiration_month?: string;
  expiration_year?: string;
  cvv2?: string;
  general?: string;
}

export default function Billing() {
  const formRef = useRef<HTMLFormElement>(null);
  const payButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [isScriptsLoaded, setIsScriptsLoaded] = useState(false);
  const [deviceSessionId, setDeviceSessionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    holder_name: "",
    card_number: "",
    expiration_month: "",
    expiration_year: "",
    cvv2: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const loadScript = (src: string, id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(id)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  };

  const validateField = useCallback((name: keyof FormData, value: string, currentFields: FormData): string | undefined => {
    switch (name) {
      case "holder_name":
        if (!value.trim()) return "El nombre del titular es obligatorio.";
        if (value.length > 50) return "El nombre es demasiado largo (máx 50 caracteres).";
        if (!/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ'\-.]+$/.test(value)) return "Nombre inválido. Use solo letras, espacios y caracteres como '-', '.', '''";
        return undefined;
      case "card_number":
        const cardNumber = value.replace(/\s+/g, ''); // Remove spaces for validation
        if (!cardNumber) return "El número de tarjeta es obligatorio.";
        if (!/^\d{13,19}$/.test(cardNumber)) return "Número de tarjeta debe tener entre 13 y 19 dígitos.";
        // If you need to use OpenPay.card.validateCardNumber, you'd do it carefully:
        // if (window.OpenPay && (window.OpenPay as any).card && !(window.OpenPay as any).card.validateCardNumber(cardNumber)) {
        //   return "Número de tarjeta inválido (según OpenPay).";
        // }
        return undefined;
      case "expiration_month":
        if (!value.trim()) return "El mes es obligatorio.";
        if (!/^\d{1,2}$/.test(value)) return "Mes debe ser 1 o 2 dígitos (MM).";
        const month = parseInt(value, 10);
        if (month < 1 || month > 12) return "Mes inválido (01-12).";
        return undefined;
      case "expiration_year":
        if (!value.trim()) return "El año es obligatorio.";
        if (!/^(\d{2})$/.test(value)) return "Año debe ser a 2 (AA) dígitos.";
        let year = parseInt(value, 10);
        if (value.length === 2) year += 2000;

        const currentYear = new Date().getFullYear();
        if (year < currentYear) return "Año de expiración no puede estar en el pasado.";

        if (currentFields.expiration_month) {
            const expMonthNum = parseInt(currentFields.expiration_month, 10);
            if (expMonthNum >= 1 && expMonthNum <=12) {
                const currentMonth = new Date().getMonth() + 1;
                if (year === currentYear && expMonthNum < currentMonth) {
                    return "Fecha de expiración no puede estar en el pasado.";
                }
            }
        }
        return undefined;
      case "cvv2":
        if (!value.trim()) return "El CVV es obligatorio.";
        if (!/^\d{3,4}$/.test(value)) return "CVV debe tener 3 o 4 dígitos.";
        return undefined;
      default:
        return undefined;
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormData;

    let processedValue = value;
    if (fieldName === "card_number" || fieldName === "expiration_month" || fieldName === "expiration_year" || fieldName === "cvv2") {
      processedValue = value.replace(/[^0-9]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: processedValue,
    }));

    if (errors[fieldName] || errors.general) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: undefined,
        general: undefined,
      }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormData;
    const error = validateField(fieldName, value, formData);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  function mapOpenPayErrorCodeToMessage(errorCode: number | string | undefined, description: string | undefined): string {
      const code = Number(errorCode);
      const desc = description || "No se proporcionó descripción del error.";
      switch (code) {
          case 1001: return `Petición mal formada: ${desc}. Verifique los campos.`;
          case 1002: return `Autenticación fallida: ${desc}. Revise sus credenciales de API.`;
          case 1003: return `Parámetro inválido: ${desc}. Uno o más parámetros son incorrectos.`;
          // ... (rest of the cases from the previous response)
          case 3012: return `Tarjeta declinada por el banco (${desc}). (Ej: Excede el límite de transacciones diarias)`;
          default:
            if (desc && desc.toLowerCase().includes("card number is required")) return "El número de tarjeta es obligatorio.";
            if (desc && desc.toLowerCase().includes("holder name is required")) return "El nombre del titular es obligatorio.";
            // ... (other specific description checks)
            return `Error ${code || 'desconocido'}: ${desc}. Verifique los datos e intente de nuevo.`;
      }
  }

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    let expirationErrorShown = false;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key], formData);
      if (error) {
        newErrors[key] = error;
        isValid = false;
        if (key === 'expiration_month' || key === 'expiration_year') expirationErrorShown = true;
      }
    });

    if (!newErrors.expiration_month && !newErrors.expiration_year && formData.expiration_month && formData.expiration_year && !expirationErrorShown) {
        let yearVal = parseInt(formData.expiration_year, 10);
        if (formData.expiration_year.length === 2) yearVal += 2000;
        const monthVal = parseInt(formData.expiration_month, 10);
        const currentFullYear = new Date().getFullYear();
        const currentMonthZeroIndexed = new Date().getMonth();

        if (yearVal < currentFullYear || (yearVal === currentFullYear && monthVal < (currentMonthZeroIndexed + 1))) {
            newErrors.expiration_year = "Fecha de expiración no puede estar en el pasado.";
            isValid = false;
        }
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  const handleSubmit = async () => {
    setErrors(prev => ({ ...prev, general: undefined }));

    if (!isScriptsLoaded || !deviceSessionId) {
      console.error("OpenPay no está listo o falta deviceSessionId.");
      setErrors(prev => ({ ...prev, general: "El sistema de pagos no está completamente cargado. Por favor, espere un momento o recargue la página." }));
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);

      if (!formRef.current) {
        console.error("Referencia del formulario no encontrada para OpenPay.token.extractFormAndCreate");
        setErrors(prev => ({ ...prev, general: "Error interno del formulario. Intente recargar." }));
        setIsSubmitting(false);
        return;
      }

      window.OpenPay.token.extractFormAndCreate(
        formRef.current,
        async (response: any) => {
          const tokenField = document.getElementById("token_id") as HTMLInputElement | null;
          if (!tokenField) {
            console.error("Campo token_id no encontrado");
            setErrors(prev => ({ ...prev, general: "Error en el formulario: Falta el campo token_id."}));
            setIsSubmitting(false);
            return;
          }
          tokenField.value = response.data.id;

          try {
            await PostOpenPayment(
              {
                sessionId: deviceSessionId,
                token: tokenField.value,
              },
              localStorage.getItem(storageKeys.token) ?? ""
            );
            router.push("/home");
          } catch (paymentError: any) {
            console.error("Error en PostOpenPayment:", paymentError);
            const apiErrorMessage = paymentError.response?.data?.message || paymentError.message;
            setErrors(prev => ({ ...prev, general: `Hubo un error al procesar su pago: ${apiErrorMessage || "Por favor, intente de nuevo."}` }));
            setIsSubmitting(false);
          }
        },
        (error: any) => {
          console.error("Error de OpenPay al crear token:", error);
          const message = mapOpenPayErrorCodeToMessage(error.error_code || error.status_code, error.description || error.message);
          setErrors(prev => ({ ...prev, general: message }));
          setIsSubmitting(false);
        }
      );
    } else {
      console.log("Validación del formulario fallida.");
      setErrors(prev => ({...prev, general: "Por favor corrija los errores resaltados en el formulario."}))
    }
  };

  useEffect(() => {
    const initializeOpenPay = async () => {
      if (!OPENPAY_ID || !OPENPAY_API_KEY) {
        console.error("OpenPay ID o API Key no están configurados en las variables de entorno.");
        setErrors(prev => ({...prev, general: "Error de configuración del sistema de pagos. Contacte a soporte."}));
        return;
      }
      try {
        await loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js", "jquery-script");
        await loadScript("https://openpay.s3.amazonaws.com/openpay.v1.min.js", "openpay-v1-script");
        await loadScript("https://openpay.s3.amazonaws.com/openpay-data.v1.min.js", "openpay-data-v1-script");

        if (window.OpenPay) {
          window.OpenPay.setId(OPENPAY_ID);
          window.OpenPay.setApiKey(OPENPAY_API_KEY);
          window.OpenPay.setSandboxMode(OPENPAY_SANDBOX_MODE);

          if (!formRef.current) {
            console.error("Referencia del formulario no encontrada para OpenPay.deviceData.setup");
             setErrors(prev => ({...prev, general: "Error al inicializar el formulario de pago."}));
            return;
          }
          // Use "deviceIdHiddenFieldName" as the actual name for the field OpenPay will create.
          // The 'fieldName' in OpenPayDeviceData interface is just for the type signature of the method.
          const newDeviceSessionId = window.OpenPay.deviceData.setup(
            formRef.current,
            "deviceIdHiddenFieldName"
          );

          setDeviceSessionId(newDeviceSessionId);
          setIsScriptsLoaded(true);
          console.log("OpenPay inicializado. Device Session ID:", newDeviceSessionId);
        } else {
          throw new Error("Objeto OpenPay no encontrado después de cargar scripts.");
        }
      } catch (error) {
        console.error("Error al cargar o inicializar OpenPay:", error);
        setErrors(prev => ({...prev, general: "No se pudo cargar el sistema de pagos. Por favor, recargue la página."}));
      }
    };

    if (!isScriptsLoaded && typeof window !== 'undefined') {
        initializeOpenPay();
    }
  }, [isScriptsLoaded]);


  return (
    <Box
      sx={{
        backgroundColor: AppColorsHex.blue,
        minHeight: "100vh",
        py: 4,
      }}
    >
      <AppNavBar />
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          mt: 4,
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
        >
          <Card
            sx={{
              minWidth: "300px",
              width: "100%",
              borderRadius: "20px",
              p: {xs: 1, sm: 2, md: 3},
            }}
          >
            <CardContent>
              {/* ... rest of your JSX ... (identical to previous response from this point) */}
              <div className="bkng-tb-cntnt">
                <div className="pymnts">
                  <form
                    action="#"
                    method="POST"
                    id="payment-form"
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input type="hidden" name="token_id" id="token_id" />
                    {/* OpenPay creará aquí el input deviceIdHiddenFieldName */}

                    <div className="pymnt-itm card active">
                      <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, borderBottom: '2px solid #F9F100', pb:2, mb:3, color: '#2840c5' }}>
                        Tarjeta de crédito o débito
                      </Typography>
                      <div className="pymnt-cntnt">
                        <div className="card-expl" style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between', marginBottom: '20px' }}>
                          <div className="credit" style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_PATH || ''}/web/openpay/cards1.png")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center', minHeight: '40px', width:"45%", paddingLeft: '130px' }}>
                          </div>
                          <div className="debit" style={{ backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_PATH || ''}/web/openpay/cards2.png")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center', minHeight: '40px', width:"45%",paddingLeft: '130px' }}>
                          </div>
                        </div>

                        <Grid container spacing={2} className="sctn-row">
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="holder_name"
                              label="Nombre del titular"
                              placeholder="Como aparece en la tarjeta"
                              value={formData.holder_name}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              error={!!errors.holder_name}
                              helperText={errors.holder_name || ' '}
                              autoComplete="cc-name"
                              inputProps={{ "data-openpay-card": "holder_name", maxLength: 50 }}
                              variant="outlined"
                              sx={{ mb: 2, '& .MuiInputBase-input': { color: '#2840c5' }, '& label': { color: '#2840c5' }, '& .MuiFormHelperText-root': {minHeight: '1.2em'}}}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="card_number"
                              label="Número de tarjeta"
                              type="tel"
                              inputMode="numeric"
                              placeholder="0000 0000 0000 0000"
                              value={formData.card_number}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              error={!!errors.card_number}
                              helperText={errors.card_number || ' '}
                              autoComplete="cc-number"
                              inputProps={{ "data-openpay-card": "card_number", maxLength: 23 }}
                              variant="outlined"
                              sx={{ mb: 2, '& .MuiInputBase-input': { color: '#2840c5' }, '& label': { color: '#2840c5' }, '& .MuiFormHelperText-root': {minHeight: '1.2em'}}}
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} className="sctn-row">
                          <Grid item xs={12} sm={6} className="sctn-col l">
                            <Typography variant="body2" sx={{ mb:1, color: '#2840c5' }}>Fecha de expiración</Typography>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  name="expiration_month"
                                  placeholder="MM"
                                  type="tel"
                                  inputMode="numeric"
                                  value={formData.expiration_month}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  error={!!errors.expiration_month}
                                  helperText={errors.expiration_month || ' '}
                                  inputProps={{ "data-openpay-card": "expiration_month", maxLength: 2, autoComplete: "cc-exp-month" }}
                                  variant="outlined"
                                  sx={{ '& .MuiInputBase-input': { color: '#2840c5' }, '& .MuiFormHelperText-root': {minHeight: '1.2em'} }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  name="expiration_year"
                                  placeholder="AA"
                                  type="tel"
                                  inputMode="numeric"
                                  value={formData.expiration_year}
                                  onChange={handleInputChange}
                                  onBlur={handleBlur}
                                  error={!!errors.expiration_year}
                                  helperText={errors.expiration_year || ' '}
                                  inputProps={{ "data-openpay-card": "expiration_year", maxLength: 4, autoComplete: "cc-exp-year" }}
                                  variant="outlined"
                                  sx={{ '& .MuiInputBase-input': { color: '#2840c5' }, '& .MuiFormHelperText-root': {minHeight: '1.2em'} }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6} className="sctn-col cvv">
                              <Typography variant="body2" sx={{ mb:1, color: '#2840c5' }}>Código de seguridad</Typography>
                              <TextField
                                fullWidth
                                name="cvv2"
                                placeholder="CVV"
                                type="tel"
                                inputMode="numeric"
                                value={formData.cvv2}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                error={!!errors.cvv2}
                                helperText={errors.cvv2 || ' '}
                                autoComplete="cc-csc"
                                inputProps={{ "data-openpay-card": "cvv2", maxLength: 4 }}
                                variant="outlined"
                                sx={{
                                  '& .MuiInputBase-input': { color: '#2840c5' },
                                  '& .MuiFormHelperText-root': {minHeight: '1.2em'}
                                }}
                              />
                          </Grid>
                        </Grid>

                        {errors.general && (
                            <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center', fontWeight: 500 }}>
                                {errors.general}
                            </Typography>
                        )}

                        <div className="openpay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '20px', marginBottom: '20px' }}>
                          <Typography variant="caption" sx={{ mr: 2, color: '#2840c5', display: 'flex', alignItems: 'center' }}>
                            Transacciones realizadas vía:
                            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/web/openpay/openpay.png`} alt="OpenPay" style={{ height: '20px', verticalAlign: 'middle', marginLeft: '5px' }}/>
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#2840c5', display: 'flex', alignItems: 'center' }}>
                            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/web/openpay/security.png`} alt="Secure" style={{ height: '20px', verticalAlign: 'middle', marginRight: '5px' }} />
                            Tus pagos se realizan de forma segura.
                          </Typography>
                        </div>

                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                          <Button
                            ref={payButtonRef}
                            id="pay-button"
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={!isScriptsLoaded || !deviceSessionId || isSubmitting}
                            className="button rght"
                            sx={{
                              color: '#fff',
                              fontSize: { xs: '16px', md: '18px'},
                              padding: '10px 20px',
                              borderRadius: '5px',
                              '&.Mui-disabled': {
                                backgroundColor: 'grey.400',
                                color: 'grey.700',
                              }
                            }}
                          >
                            {isSubmitting ? "Procesando..." : "Pagar"}
                          </Button>
                        </Box>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AppFooter />
    </Box>
  );
}