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
            right:0,
            boxShadow: 3,
            zIndex: 1000, // Ensure the box is above the map
            height: "100%",
            width: "50%",
            bgcolor: AppColorsHex.white,
            backgroundSize: "cover  ",
            backgroundPosition: "center",
            backgroundImage: `url(${selectedSucursal.image})`,
            opacity: 1,
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            bgcolor={"black"}
            sx={{ opacity: 0.7 }}
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
