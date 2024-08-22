"use client";
import { AppColorsHex } from "@/const/colors";
import { createTheme, ThemeProvider } from "@mui/material";
import { ReactElement, ReactHTMLElement } from "react";

export default function AppTheme({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: AppColorsHex.blue,
          },
          secondary: {
            main: AppColorsHex.white,
          },
          info: {
            main: AppColorsHex.black,
          },
        },
        typography: {
          h1: {
            fontWeight: 900,
            fontSize: "32px", // XS
            "@media (min-width:600px)": {
              fontSize: "48px", // MD
            },
            "@media (min-width:960px)": {
              fontSize: "64px", // LG
            },
          },
          h5:{
            fontWeight:500,
            fontSize: '24px'    
          },
          h6: {
            fontWeight: 200,
          },
        },
        // components: {
        //     MuiTypography: {
        //       defaultProps: {
        //         variantMapping: {
        //           h1: 'h2',
        //           h2: 'h2',
        //           h3: 'h2',
        //           h4: 'h2',
        //           h5: 'h2',
        //           h6: 'h2',
        //           subtitle1: 'h2',
        //           subtitle2: 'h2',
        //           body1: 'span',
        //           body2: 'span',
        //         },
        //       },
        //     },
        //   },
      })}
    >
      {children}
    </ThemeProvider>
  );
}
