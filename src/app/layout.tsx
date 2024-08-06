'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppTheme from "@/components/common/app_theme";
import AppNavBar from "@/components/common/app_nav_bar/main";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <AppTheme>
        <AppNavBar/>
        {children}
        </AppTheme>
      </body>
    </html>
  );
}
