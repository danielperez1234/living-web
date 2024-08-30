import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppTheme from "@/components/common/app_theme";
import AppNavBar from "@/components/common/app_nav_bar/main";
import { Box } from "@mui/material";
import { AppColorsHex } from "@/const/colors";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Papeleria Living",
  description: "Brindamos soluciones de calidad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body style={{background:AppColorsHex.white,padding:'0px',margin:'0px'}} >
        <AppTheme>
        {children}
        </AppTheme>
      </body>
    </html>
  );
}
