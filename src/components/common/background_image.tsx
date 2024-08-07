import { Box } from "@mui/material";
import React, { ReactElement } from "react";

export default function AppBackgroundImage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundImage: "url(/marca/fondo.svg)",
      }}
    >
      {children}
    </Box>
  );
}
