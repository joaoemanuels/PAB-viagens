import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./mapBackground.module.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import {
  useShareLocation,
  useWatchDriver,
} from "../../../../hooks/useDriverLocation";

// Recebe: role ("driver" | "passenger"), driverId (UUID do motorista, necessário para passageiro)
export default function MapBackground({ role, driverId }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // Hooks de localização
  const { isSharing, start, stop } = useShareLocation();
  const liveDriverLocation = useWatchDriver(
    role === "passenger" ? driverId : null,
  );

  // Localização estática fallback (quando não há Realtime ainda)
  const [staticDriverLocation] = useState({ lat: -7.2273, lng: -35.8812 });
  const driverLocation = liveDriverLocation ?? staticDriverLocation;

  // Inicializar mapa
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: true,
      preferCanvas: true,
    }).setView([-7.2273, -35.8812], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      minZoom: 10,
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);
  }, []);

  // Localização do usuário
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserLocation({ lat: -7.23, lng: -35.885 }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 },
    );
  }, []);

  // Atualizar marcadores
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    Object.values(markersRef.current).forEach((m) => m?.remove?.());
    markersRef.current = {};
    polylineRef.current?.remove();

    if (userLocation) {
      markersRef.current.user = L.circleMarker(
        [userLocation.lat, userLocation.lng],
        {
          radius: 6,
          fillColor: "#007AFF",
          color: "#fff",
          weight: 2,
          fillOpacity: 0.9,
        },
      ).addTo(map);
    }

    markersRef.current.driver = L.marker(
      [driverLocation.lat, driverLocation.lng],
      {
        icon: L.icon({
          iconUrl: markerIcon,
          iconRetinaUrl: markerIconRetina,
          shadowUrl: markerShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
        title: "Sua van",
      },
    ).addTo(map);

    if (userLocation) {
      polylineRef.current = L.polyline(
        [
          [userLocation.lat, userLocation.lng],
          [driverLocation.lat, driverLocation.lng],
        ],
        { color: "#007AFF", weight: 2, opacity: 0.6, dashArray: "5, 5" },
      ).addTo(map);

      map.fitBounds(
        L.latLngBounds(
          [userLocation.lat, userLocation.lng],
          [driverLocation.lat, driverLocation.lng],
        ),
        { padding: [80, 80], maxZoom: 15 },
      );
    }
  }, [userLocation, driverLocation, mapReady]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <section className={styles.mapBackground} ref={mapRef} />

      {/* Botão apenas para o motorista */}
      {role === "driver" && (
        <button
          onClick={isSharing ? stop : start}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "12px 28px",
            borderRadius: 24,
            border: "none",
            background: isSharing ? "#FF3B30" : "#007AFF",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {isSharing
            ? "⏹ Parar compartilhamento"
            : "📍 Compartilhar localização"}
        </button>
      )}

      {/* Indicador de rastreamento para o passageiro */}
      {role === "passenger" && liveDriverLocation && (
        <div
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "8px 16px",
            borderRadius: 20,
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          🟢 Rastreando motorista em tempo real
        </div>
      )}
    </div>
  );
}
