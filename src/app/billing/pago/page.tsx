"use client";

import React, { useEffect, useRef, useState } from "react"; // React y hooks
import { useRouter } from "next/navigation"; // Next.js

// Material-UI
import { Box, Card, CardContent, Grid } from "@mui/material";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";
import { basepath } from "@/const/utils";

// Componentes comunes
import AppNavBar from "@/components/common/app_nav_bar/main";
import AppFooter from "@/components/common/app_footer/main";

export default function Billing() {
  const [htmlContent, setHtmlContent] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const payButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  useEffect(() => {
    fetch(`/${basepath}/openpay/card.html`)
      .then((response) => response.text())
      .then((htmlString) => {
        setHtmlContent(htmlString);
      });
  }, []);
  useEffect(() => {
    // Load OpenPay and jQuery scripts dynamically
    const loadScripts = async () => {
      const jqueryScript = document.createElement("script");
      jqueryScript.src =
        "https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
      jqueryScript.async = true;
      document.body.appendChild(jqueryScript);

      const openPayScript = document.createElement("script");
      openPayScript.src = "https://openpay.s3.amazonaws.com/openpay.v1.min.js";
      openPayScript.async = true;
      document.body.appendChild(openPayScript);

      const openPayDataScript = document.createElement("script");
      openPayDataScript.src =
        "https://openpay.s3.amazonaws.com/openpay-data.v1.min.js";
      openPayDataScript.async = true;
      document.body.appendChild(openPayDataScript);

      openPayDataScript.onload = () => {
        // Initialize OpenPay after scripts are loaded
        if (window.OpenPay) {
          window.OpenPay.setId("mrd3wptlgzchwuuzrasn");
          window.OpenPay.setApiKey("pk_2e3d6952209f4a778846af257f5574e1");
          window.OpenPay.setSandboxMode(true);

          const deviceSessionId = window.OpenPay.deviceData.setup(
            formRef.current!,
            "deviceIdHiddenFieldName"
          );

          console.log("Device Session ID:", deviceSessionId);

          // Add click event to the Pay button
          payButtonRef.current?.addEventListener("click", handlePayment);
        }
      };
    };

    loadScripts();

    return () => {
      // Cleanup scripts and event listeners
      if (payButtonRef.current) {
        payButtonRef.current.removeEventListener("click", handlePayment);
      }
    };
  }, []);
  const handlePayment = () => {
    if (window.OpenPay && formRef.current) {
      window.OpenPay.token.extractFormAndCreate(
        formRef.current,
        (response: any) => {
          console.log("Token created:", response.data.id);
          const tokenField = document.getElementById(
            "token_id"
          ) as HTMLInputElement;
          tokenField.value = response.data.id;
          console.log(tokenField.value);
          router.push("/home");
          //formRef.current!.submit();
        },
        (error: any) => {
          console.error("Error creating token:", error);
          alert(`ERROR [${error.status}] ${error.message}`);
          if (payButtonRef.current) payButtonRef.current.disabled = false;
        }
      );
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: AppColorsHex.blue,
        minHeight: "100vh",
      }}
    >
      <AppNavBar />
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" }, // Centrado en pantallas pequeñas, alineado superior a partir de md
        }}
      >
        {/* Datos de contacto */}
        <Grid
          item
          xs={12}
          md={10}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              minWidth: "300px",
              maxWidth: { md: "90%", xs: "97%" },
              overflowX: "scroll",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: htmlContent,
                }}
              ></div>
              <div className="bkng-tb-cntnt">
                <div className="pymnts">
                  <form
                    action="#"
                    method="POST"
                    id="payment-form"
                    ref={formRef}
                  >
                    <input type="hidden" name="token_id" id="token_id" />
                    <div className="pymnt-itm card active">
                      <h2>Tarjeta de crédito o débito</h2>
                      <div className="pymnt-cntnt">
                        <div className="card-expl">
                          <div className="credit">
                            <h4>Tarjetas de crédito</h4>
                          </div>
                          <div className="debit">
                            <h4>Tarjetas de débito</h4>
                          </div>
                        </div>
                        <div className="sctn-row">
                          <div className="sctn-col l">
                            <label>Nombre del titular</label>
                            <input
                              type="text"
                              placeholder="Como aparece en la tarjeta"
                              autoComplete="off"
                              data-openpay-card="holder_name"
                            />
                          </div>
                          <div className="sctn-col">
                            <label>Número de tarjeta</label>
                            <input
                              type="text"
                              placeholder="0000-0000-0000-0000"
                              autoComplete="off"
                              data-openpay-card="card_number"
                            />
                          </div>
                        </div>
                        <div className="sctn-row">
                          <div className="sctn-col l">
                            <label>Fecha de expiración</label>
                            <div className="sctn-col half l">
                              <input
                                type="text"
                                placeholder="Mes"
                                data-openpay-card="expiration_month"
                              />
                            </div>
                            <div className="sctn-col half l">
                              <input
                                type="text"
                                placeholder="Año"
                                data-openpay-card="expiration_year"
                              />
                            </div>
                          </div>
                          <div className="sctn-col cvv">
                            <label>Código de seguridad</label>
                            <div className="sctn-col half l">
                              <input
                                type="text"
                                placeholder="3 dígitos"
                                autoComplete="off"
                                data-openpay-card="cvv2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="openpay">
                          <div className="logo">
                            Transacciones realizadas vía:
                          </div>
                          <div className="shield">
                            Tus pagos se realizan de forma segura con
                            encriptación de 256 bits
                          </div>
                        </div>
                        <div className="sctn-row">
                          <button
                            type="button"
                            className="button rght"
                            id="pay-button"
                            ref={payButtonRef}
                          >
                            Pagar
                          </button>
                        </div>
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
