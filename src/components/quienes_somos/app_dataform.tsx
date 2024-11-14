import { AppColorsHex } from "@/const/colors";
import { Box } from "@mui/material";
import React from "react";

export default function AppDataForm({
  children,
  setShowPopup,
}: Readonly<{
  children: React.ReactNode;
  setShowPopup: (value: boolean) => void;
}>) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        onClick={() => setShowPopup(false)}
        sx={{
          width: "100%",
          height: "100%",
          background: AppColorsHex.blue,
          opacity: 0.4,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      ></Box>
      <Box
        sx={{
          transform: "translate(-50%, -50%)",
          position: "fixed",
          top: "50%",
          left: "50%",
          bgcolor: "white",
          padding: "5%",
          borderRadius: "50px",
          boxShadow: 3,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          width: "85%",
          maxWidth: "600px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
