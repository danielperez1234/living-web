import type { Metadata } from "next"; // Tipado de Next.js
import { Inter } from "next/font/google"; // Fuentes de Google
import "./globals.css"; // Estilos globales

// Componentes comunes
import AppTheme from "@/components/common/app_theme";

// Constantes y utilidades
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
      <body
        style={{
          background: AppColorsHex.white,
          padding: "0px",
          margin: "0px",
        }}
      >
        <AppTheme>{children}</AppTheme>
      </body>
    </html>
  );
}
