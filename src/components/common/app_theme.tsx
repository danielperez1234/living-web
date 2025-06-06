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
          warning:{
            main:AppColorsHex.yellow,
            contrastText:AppColorsHex.blue
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
              fontSize: "42px", // MD
            },
            "@media (min-width:960px)": {
              fontSize: "48px", // LG
            },
          },
          h2:{
             fontWeight:600,
             fontSize: "25px", // XS
             "@media (min-width:600px)": {
               fontSize: "32px", // MD
             },
             "@media (min-width:960px)": {
               fontSize: "40px", // LG
             },
          },
          h4:{
            fontSize: "20px", // XS
            "@media (min-width:600px)": {
              fontSize: "26px", // MD
            },
            "@media (min-width:960px)": {
              fontSize: "32px", // LG
            },
            fontWeight:500
          },
          h5:{
            fontWeight:300,
            fontSize: '24px'    
          },
          h6: {
            fontWeight: 200,
          },
          subtitle1: {
            fontWeight: 600,
            fontSize: "16px", // XS
            "@media (min-width:600px)": {
              fontSize: "18px", // MD
            },
            "@media (min-width:960px)": {
              fontSize: "20px", // LG
            },
          },
          body1:{
            
            fontSize: "14px", // XS
            "@media (min-width:600px)": {
              fontSize: "16px", // MD
            },
            "@media (min-width:960px)": {
              fontSize: "18px", // LG
            },
          },
          body2:{
            color:'primary',
            fontWeight:500,
            fontSize: "10px", // XS
            "@media (min-width:600px)": {
              fontSize: "12px", // MD
            },
            "@media (min-width:960px)": {
              fontSize: "12px", // LG
            },
          }
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
