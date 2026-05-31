import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./mapBackground.module.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";

export default function MapBackground() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState({
    lat: -7.2273,
    lng: -35.8812,
  });
  const [mapReady, setMapReady] = useState(false);

  // Inicializar mapa uma única vez
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
      className: "leaflet-tile-layer",
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);
  }, []);

  // Pegar localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Localização não disponível:", error.message);
          // Fallback: usar localização próxima ao motorista
          setUserLocation({
            lat: -7.23,
            lng: -35.885,
          });
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 },
      );
    }
  }, []);

  // Atualizar marcadores (otimizado)
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Remover marcadores antigos
    Object.values(markersRef.current).forEach((marker) => {
      marker?.remove?.();
    });
    markersRef.current = {};

    // Marcador do usuário (azul pequeno)
    if (userLocation) {
      const userMarker = L.circleMarker([userLocation.lat, userLocation.lng], {
        radius: 6,
        fillColor: "#007AFF",
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
        className: styles.userMarker,
      }).addTo(map);

      markersRef.current.user = userMarker;
    }

    // Marcador do motorista
    const driverMarker = L.marker([driverLocation.lat, driverLocation.lng], {
      icon: L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIconRetina,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        className: styles.driverMarker,
      }),
      title: "Sua van",
    }).addTo(map);

    markersRef.current.driver = driverMarker;

    // Desenhar rota
    if (userLocation && polylineRef.current) {
      polylineRef.current.remove();
    }

    if (userLocation) {
      polylineRef.current = L.polyline(
        [
          [userLocation.lat, userLocation.lng],
          [driverLocation.lat, driverLocation.lng],
        ],
        {
          color: "#007AFF",
          weight: 2,
          opacity: 0.6,
          dashArray: "5, 5",
          lineCap: "round",
          lineJoin: "round",
        },
      ).addTo(map);

      // Ajustar bounds COM PADDING
      const bounds = L.latLngBounds(
        [userLocation.lat, userLocation.lng],
        [driverLocation.lat, driverLocation.lng],
      );
      map.fitBounds(bounds, { padding: [80, 80], maxZoom: 15 });
    }
  }, [userLocation, driverLocation, mapReady]);

  // Simular movimento (menos frequente)
  useEffect(() => {
    const updateDriver = () => {
      setDriverLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0005,
        lng: prev.lng + (Math.random() - 0.5) * 0.0005,
      }));
    };

    const interval = setInterval(updateDriver, 5000);
    return () => clearInterval(interval);
  }, []);

  return <section className={styles.mapBackground} ref={mapRef} />;
}
