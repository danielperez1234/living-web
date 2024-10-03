import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { LocationOn, Person } from "@mui/icons-material";
import { AppColorsHex } from "@/const/colors";
import "@/components/nosotros/my_map.css"
import useSucursalesStore from "@/service/sucursales/store";
export default function MyMap() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const sucursales = useSucursalesStore(state=>state.sucursales);
  const getSucursales = useSucursalesStore(state=>state.getSucursales);
  useEffect(() => {
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
          maximumAge: 0 // No usar una ubicación en caché
        }
      );
    } else {
      console.error("Geolocalización no es soportada por este navegador.");
    }
  }, []);
  const customIcon = L.divIcon({
    className: "custom-icon",
    html: renderToString(<Person style={{ color: AppColorsHex.blue, fontSize: "2rem" }} />),
    iconSize: [30, 30], // Tamaño del icono
    iconAnchor: [15, 30], // Punto del icono que apunta a la ubicación
  });
  return <MapContainer scrollWheelZoom center={position ?? [21.1191454,-101.6833461]} zoom={13} zoomControl={false} style={{ height: "100%", width: "100%" }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

    />
    {position && <Marker icon={customIcon} position={position}>
      
    </Marker>}
  </MapContainer>
}