import { AppColorsHex } from "@/const/colors";
import { Opacity } from "@mui/icons-material";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import React from "react";

export default function AppDataForm({
  children,
  handleShowPopup,
  showPopup,
}: Readonly<{
  children: React.ReactNode;
  handleShowPopup: (value: boolean) => void;
  showPopup: boolean;
}>) {
  return (
    <Modal
      open={showPopup}
      onClose={handleShowPopup}
      BackdropComponent={Backdrop}
      BackdropProps={{ style: { opacity: 0 } }}
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 700 } }}
      sx={{
        bgcolor: AppColorsHex.blueWithOpacity,
      }}
    >
      <Fade in={showPopup} timeout={900}>
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
            zIndex: 10002,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "85%",
            maxWidth: "600px",
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
