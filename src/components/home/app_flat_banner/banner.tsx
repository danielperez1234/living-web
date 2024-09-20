"use client";
import { Box } from "@mui/material";
import Image from "next/image";

interface BannerProps {
  content: string;
  onClick?: () => void;
}
export default function Banner({ content, onClick }: BannerProps) {
  return (
    <Box width={"95%"} padding={"2.5%"}>
      <Box
        onClick={onClick}
        width={"100%"}
        position={"relative"}
        borderRadius={"5vw"}
        overflow={"hidden"}
        boxShadow={4}
        sx={{
          aspectRatio: "4",
          ccursor: onClick && "pointer", // Changes cursor to hand on hover
          "&:hover": onClick && {
            cursor: "pointer"
          }
        }} // Ajusta la proporción de aspecto según sea necesario
      >
        <Image
          src={content}
          alt="mega_banner_image"
          layout="fill"
          sizes="(max-width: 100%)"
          style={{
            objectFit: "cover"
          }}
        />
      </Box>
    </Box>
  );
}
