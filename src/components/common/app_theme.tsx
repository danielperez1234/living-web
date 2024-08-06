'use client'
import { createTheme, ThemeProvider } from "@mui/material";
import { ReactElement, ReactHTMLElement } from "react";

export default function AppTheme({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){

    return (
        <ThemeProvider theme={createTheme({
            palette:{
                primary: {
                    main: "#003D9F"
                },
                secondary: {
                    main:'#FFFFFF'
                },
                info: {
                    main:'#373636'
                }
            },
            typography:{
                h6:{
                    fontWeight:'lighter',
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
        })}>
            
        {children}
        </ThemeProvider>
    )
}