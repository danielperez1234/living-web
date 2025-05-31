import { AppColorsHex } from "@/const/colors";
import useCartStore from "@/service/carrito/store";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import AppCounter from "./app_counter";
import { CartProduct } from "@/service/carrito/interface";
import AttachmentIcon from '@mui/icons-material/Attachment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function AppCartProduct({ product }: { product: CartProduct }) {
  const {
    cartProducts: cartItems,
    updateQuantity,
  } = useCartStore();
 
  const count = product.quantity ?? 0;

  const handleCountChange = (newCount: number) => {
  

    updateQuantity(product, product.quantity, newCount);

  };

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Grid
      xs={12}
      sm={12}
      md={10}
      xl={10}
      item
      display={"flex"}
      flexDirection={isSmallScreen ? "column" : "row"}
      justifyContent={isSmallScreen ? "center" : "space-evenly"}
      alignItems={"center"}
      width={"100%"}
    >
      <Box
        bgcolor={AppColorsHex.white}
        display={"flex"}
        flexDirection={isSmallScreen ? "column" : "row"}
        alignItems={isSmallScreen ? "center" : "center"}
        justifyContent={isSmallScreen ? "center" : "space-between"}
        width={"100%"}
        padding={isSmallScreen ? "15px" : "30px"}
        gap={isSmallScreen ? "20px" : "0"}
      >
        <Box
          width={isSmallScreen ? "50%" : "15%"}
          marginBottom={isSmallScreen ? "15px" : "0"}
        >
          <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
            <Image
              fill
              alt="product Image"
              src={product.imageUrl.toString()}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>
        </Box>

        <Box
          textAlign={isSmallScreen ? "center" : "left"}
          marginBottom={isSmallScreen ? "15px" : "0"}
        >
          <Typography sx={{ textAlign: "center" }}>
            {product.productName}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bolder",
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
            }}
          >
            ${product.price}
          </Typography>
          {product.selectedOptions.length > 0 && 
        <Accordion sx={{boxShadow:'none',border:'none'}}>
          <AccordionSummary sx={{boxShadow:'none',border:'none'}} expandIcon={<ExpandMoreIcon />}>
          <Grid container xs={12} >
          {product.selectedOptions.map((element) =>
            <Grid  key={`selectedOption_summary_${product.productId}_${element.id}`} item xs ={4}>
              
              {element.image != undefined && element.image != "Unknown" ? <Image width={15} height={15} style={{ borderRadius: 25 }} src={element.image.toString()} alt={`image_${product.productId}_${element.id}`} />:
                <AttachmentIcon  color={'primary'}/>
              }
             
            </Grid>)}
         
            </Grid>
          </AccordionSummary>
        <AccordionDetails >
        <Box
          textAlign={isSmallScreen ? "center" : "left"}
          width={isSmallScreen ? "100%" : "30%"} // Ajuste del ancho
        >
          {product.selectedOptions.map((element) =>
            <Box key={`selectedOption_${product.productId}_${element.id}`} display={'flex'} flexDirection={'row'} justifyContent={isSmallScreen ? "center" : "start"} alignItems={'center'} gap={2}>
              {element.image != undefined && element.image != "Unknown" ? <Image width={15} height={15} style={{ borderRadius: 25 }} src={element.image.toString()} alt={`image_${product.productId}_${element.id}`} />:
                <AttachmentIcon  color={'primary'}/>
              }
              <Typography
                sx={{
                  typography:"body",
                  textAlign: isSmallScreen ? "center" : "left",
                  
                  fontSize: isSmallScreen ? "1rem" : "1.25rem",
                }}
              >
                {element.text}
              </Typography>
            </Box>)}

        </Box>  </AccordionDetails>
        </Accordion>}
        </Box>

        {isSmallScreen && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            marginBottom="15px"
          >
            <AppCounter
              maxCount={1000}
              count={count}
              setCount={handleCountChange}
            />
          </Box>
        )}

        {!isSmallScreen && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <AppCounter
              maxCount={1000}
              count={count}
              setCount={handleCountChange}
            />
          </Box>
        )}

        <Typography
          sx={{
            fontWeight: "bolder",
            fontStyle: "italic",
            fontSize: isSmallScreen ? "1rem" : "1.25rem",
          }}
        >
          ${product.price * count}
        </Typography>
        
      </Box>
    </Grid>
  );
}
