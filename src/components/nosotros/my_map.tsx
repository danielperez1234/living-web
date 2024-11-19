import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { LocationOn, Person } from "@mui/icons-material";
import { AppColorsHex } from "@/const/colors";
import "@/components/nosotros/my_map.css";
import useSucursalesStore from "@/service/sucursales/store";
import { Sucursal } from "@/service/sucursales/interface";
import { Box, Divider, ImageListItemBar, Typography } from "@mui/material";
import { basepath } from "@/const/utils";

export default function MyMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const sucursales = useSucursalesStore((state) => state.sucursales);
  const getSucursales = useSucursalesStore((state) => state.getSucursales);

  const [selectedSucursal, setSelectedSucursal] = useState<
    Sucursal | undefined
  >();

  useEffect(() => {
    getSucursales();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Error obteniendo la ubicación:", err);
        },
        {
          enableHighAccuracy: true, // Aumentar precisión
          timeout: 5000, // Tiempo de espera en milisegundos
          maximumAge: 0, // No usar una ubicación en caché
        }
      );
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }, []);

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: renderToString(
      <Person style={{ color: AppColorsHex.blue, fontSize: "2rem" }} />
    ),
    iconSize: [30, 30], // Tamaño del icono
    iconAnchor: [15, 30], // Punto del icono que apunta a la ubicación
  });

  const customBranch = L.divIcon({
    className: "custom-icon",
    html: renderToString(
      <LocationOn style={{ color: AppColorsHex.blue, fontSize: "2rem" }} />
    ),
    iconSize: [30, 30], // Tamaño del icono
    iconAnchor: [15, 30], // Punto del icono que apunta a la ubicación
  });

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* Static Image Overlay */}
      <Box
        style={{
          position: "absolute",
          zIndex: 1000, // Ensure it stays above the map
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Box
          style={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <img
            src={`/${basepath}/productos/tienda.jpeg`} // Replace with your image path
            alt="Static Overlay"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            // Customize the size and opacity
          />
          <Box
            sx={{
              position: "absolute",
              width: "25%",
              height: "100%",
              backgroundColor: "black",
              opacity: 0.8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          ></Box>
          <Box
            sx={{
              position: "absolute",
              width: "25%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" color={"white"} textAlign={"center"}>
              Mariano Escobedo
            </Typography>
            <Divider
              sx={{
                borderColor: AppColorsHex.yellow,
                borderWidth: "2px",
                width: "50%",
                borderRadius: "100px",
                marginY: 1,
              }}
            />
            <Typography
              variant="body2"
              color={"white"}
              textAlign={"center"}
              fontSize={11}
              marginX={3}
            >
              Blvr. Mariano Escobedo Pte. 3001-Local 3, John F. Kennedy, 37410
              León de los Aldama, Gto.
            </Typography>
            <Typography
              variant="body2"
              color={"white"}
              textAlign={"center"}
              fontSize={11}
              marginX={3}
              marginY={1}
            >
              miércoles, 8 a.m.–9 p.m.
            </Typography>
            <Typography
              variant="body2"
              color={"white"}
              textAlign={"center"}
              fontSize={11}
              marginX={3}
              marginY={2}
            >
              +524776614369
            </Typography>
          </Box>
        </Box>
      </Box>

      <MapContainer
        scrollWheelZoom
        center={position ?? [21.1191454, -101.6833461]}
        zoom={13}
        zoomControl={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Marker icon={customIcon} position={position}></Marker>}
        {sucursales.map((element, index) => (
          <Marker
            key={`sucursal_${index}`}
            icon={customBranch}
            position={[element.latitude, element.longitude]}
            eventHandlers={{
              click: () => {
                setSelectedSucursal(element);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>

      {selectedSucursal && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            boxShadow: 3,
            zIndex: 1000, // Ensure the box is above the map
            height: "100%",
            width: "50%",
            bgcolor: AppColorsHex.white,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundImage: `url(${selectedSucursal.image})`,
            opacity: 1,
            overflow: "hidden",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            bgcolor={AppColorsHex.black}
            sx={{ opacity: 0.85 }}
            width={"45%"}
            height={"100%"}
            padding={2}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Box sx={{ opacity: 1 }}>
              <Typography
                variant="h4"
                color={AppColorsHex.white}
                textAlign={"center"}
                mb={2}
              >
                {selectedSucursal.name}
              </Typography>
              <Divider style={{ background: "yellow", height: 5 }} />
              <Typography
                mt={2}
                variant="body1"
                color={AppColorsHex.white}
                textAlign={"center"}
              >
                {selectedSucursal.description}
              </Typography>
              <Typography
                mt={2}
                variant="body1"
                color={AppColorsHex.white}
                textAlign={"center"}
              >
                {selectedSucursal.schedule}
              </Typography>
              <Typography
                mt={2}
                variant="body1"
                color={AppColorsHex.white}
                textAlign={"center"}
              >
                {selectedSucursal.phoneNumber}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
}
