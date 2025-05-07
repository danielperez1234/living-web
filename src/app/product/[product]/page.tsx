"use client";

// React
import React, { useEffect, useState } from "react";

// Next.js
import { useParams } from "next/navigation";

// Material-UI
import { Box, Chip, FormControl, InputLabel, MenuItem, Modal, OutlinedInput, Radio, Select, Typography } from "@mui/material";

// Componentes comunes
import AppButton from "@/components/common/app_button";
import AppCounter from "@/components/common/app_counter";
import AppFooter from "@/components/common/app_footer/main";
import AppNavBar from "@/components/common/app_nav_bar/main";

// Servicios y estado
import useProductosStore from "@/service/productos_v2/store";
import useCartStore from "@/service/carrito/store";

// Constantes y utilidades
import { AppColorsHex } from "@/const/colors";
import { storageKeys } from "@/const/storage_keys";

// Otros
import Image from "next/image";

export default function Page() {
  //Estatico
  // Radio Buttons Color
  const [selectedValueColor, setSelectedValueColor] = useState<string>("");
  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValueColor(event.target.value);
  };

  const controlPropsColor = (item: string) => ({
    checked: selectedValueColor === item,
    onChange: handleChangeColor,
    value: item,
    inputProps: { "aria-label": item },
  });

  // Radio Buttons Modelo
  const [selectedValueModelo, setSelectedValueModelo] = useState<string>("");
  const handleChangeModelo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValueModelo(event.target.value);
  };

  const controlPropsModelo = (item: string) => ({
    checked: selectedValueModelo === item,
    onChange: handleChangeModelo,
    value: item,
    inputProps: { "aria-label": item },
  });

  //--------------------------------------------
  const { product } = useParams();
  const producto = useProductosStore((state) => state.producto);
  const productOptions = useProductosStore((state) => state.productOptions);
  const properties = useProductosStore((state) => state.properties);
  const getProductById = useProductosStore((state) => state.getProductById);
  const getProductOptions = useProductosStore((state) => state.getProductOptions);
  const fetchSubcategoryProperties = useProductosStore((state) => state.fetchSubcategoryProperties);
  const imagenesDelProducto = useProductosStore(
    (state) => state.imagenesDelProducto
  );
  const getProductImagesById = useProductosStore(
    (state) => state.getProductImagesById
  );

  //Cart Zustand
  const { cartProducts: cartItems, addToCart } = useCartStore();

  //Local Hooks
  const [count, setCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOptions, setSelectedOpptions] = useState(new Map<string, string>([
  ]));
  useEffect(()=>{
    if(producto){
      fetchSubcategoryProperties(producto.subcategoryId)
    }
  },[producto])
  useEffect(() => {
    getProductImagesById(product.toString());
    if (producto.id !== product.toString()) {
      getProductById(product.toString());
      getProductOptions(product.toString());
      
    }
    const existingItem = cartItems.find(
      (item) => item.productId === producto.id
    );
    setCount(existingItem ? existingItem.quantity : 0);
  }, [producto.id, product]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % imagenesDelProducto.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [imagenesDelProducto.length, isPaused]);

  const handleImageClick = () => {
    setIsPaused(!isPaused); // Pausa el cambio de imágenes
    setOpenModal(true); // Abre la imagen en grande
  };

  return (
    <Box width={"100%"}>
      <AppNavBar />
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"5%"}
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          bgcolor={AppColorsHex.white}
          borderRadius={"9px"}
          width={{xs:"98%",sm:"80%", md:"40%"}}
          maxWidth={"500px"}
          minWidth={"200px"}
          sx={{
            boxShadow:
              "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: "20px", md: "0px" },
          }}
        >
          <Box width={"90%"}>
            <Box width={"100%"} sx={{ aspectRatio: 1, position: "relative" }}>
              {imagenesDelProducto.length > 0 ? (
                <Image
                  fill
                  alt={`${producto.name}`}
                  src={imagenesDelProducto[currentImageIndex]}
                  style={{
                    objectFit: "cover",
                  }}
                  onClick={handleImageClick}
                />
              ) : (
                <Image
                  fill
                  alt={`${producto.name}`}
                  src={producto.imageUrlOriginal}
                  style={{
                    objectFit: "cover",
                  }}
                  onClick={handleImageClick}
                />
              )}
            </Box>
          </Box>
        </Box>
        <Box width={{xs:"98%",sm:"80%", md:"40%"}}>
          <Typography variant="h1">{producto.name}</Typography>
          <Typography
            mb={1}
            style={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            variant="h5"
          >
            {producto.description }
          </Typography>
          
          
          {properties.filter(element => productOptions.some(option => element.options.some(sOption=> sOption.id == option.propertyOptionId))).map((element,index)=>(
            <FormControl key={`MultiPropsSelector_${element.id}`} sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">{element.name}</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              
              
              onChange={event =>{
                setSelectedOpptions(state=>{
                  var aux = new Map<string, string>(state.entries());
                  
                  aux.set(element.id,event.target.value.toString())
                  console.log(aux)
                  return aux  ;
                })
              }}
              
              input={<OutlinedInput id="select-multiple-chip" label={element.name} />}
              value={selectedOptions.has(element.id) ? selectedOptions.get(element.id):0}
              renderValue={(value)=>{
                var x = element.options.filter(elementOption=> productOptions.some(pO=>elementOption.id == pO.propertyOptionId) )[value as number]
                return(
                <Box
                  sx={{
                    display:'flex',
                    alignItems:'center'}}
                >
                  { x.image &&
                  <Image src={x.image ??''} width={30} height={30} style={{marginRight:10}} alt={`image_${x.text}`}/>}
                  {x.text}
                </Box>
              )}}
            >

              {element.options.filter(elementOption=> productOptions.some(pO=>elementOption.id == pO.propertyOptionId) ).map((name,index) => (
                <MenuItem

                  key={name.id}
                  value={index}
                  style={{}}
                >
                  {
                    name.image &&
                  <Image src={name.image ??''} width={30} height={30} style={{marginRight:10}} alt={`image_${name.text}`}/>
                  }
                  {name.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          ))}
          
          <Typography
            mb={1}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="h5"
          >
            Orden Maxima: {producto.maxOrder}
          </Typography>
          <Typography
            mb={1}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="h5"
          >
            Precio unitario: ${producto.price}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>Cantidad: </Typography>
            <AppCounter maxCount={40} count={count} setCount={setCount} />
          </Box>
          <AppButton
            label="Añadir al carrito"
            sx={{ marginY: "5%", aspectRatio: 6 }}
            onClick={() => {
              count > 0
                ? addToCart(
                    producto,
                    count,
                    localStorage.getItem(storageKeys.token)
                  )
                : null;
            }}
          />
        </Box>
      </Box>
      <AppFooter />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setIsPaused(false);
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          onClick={() => {
            setOpenModal(false);
            setIsPaused(false);
          }}
        >
          {imagenesDelProducto.length > 0 ? (
            <Image
              src={imagenesDelProducto[currentImageIndex]}
              alt="Imagen ampliada"
              width={600}
              height={600}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Image
              src={producto.imageUrlOriginal}
              alt="Imagen ampliada"
              width={600}
              height={600}
              style={{ objectFit: "contain" }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}
