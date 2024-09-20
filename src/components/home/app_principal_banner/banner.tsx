import { Box } from "@mui/material";
import Image from "next/image";

interface BannerProps {
  content: string;
  onClick?: () => void;
}
export default function Banner({ content, onClick }: BannerProps) {
  if (content.includes("mp4")) {
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
            aspectRatio: "2",
            cursor: onClick && "pointer", // Changes cursor to hand on hover
            "&:hover": onClick && {
              cursor: "pointer"
            }
          }} // Ajusta la proporción de aspecto según sea necesario
        >
          <video autoPlay loop muted controls={false} style={{ width: "100%" }}>
            <source src={content} type="video/mp4" />
          </video>
        </Box>
      </Box>
    );
  }
  return (
    <Box width={"95%"} padding={"2.5%"}>
      <Box
        width={"100%"}
        position={"relative"}
        borderRadius={"5vw"}
        overflow={"hidden"}
        boxShadow={4}
        sx={{ aspectRatio: "2" }} // Ajusta la proporción de aspecto según sea necesario
      >
        <Image
          src={content}
          alt="mega_banner_image"
          layout="fill"
          sizes="(max-width: 80vw)"
          style={{
            objectFit: "cover"
          }}
        />
      </Box>
    </Box>
  );
}
