import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./mapBackground.module.css";

import {
  useShareLocation,
  useWatchDriver,
} from "../../../../hooks/useDriverLocation";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Calcula distância entre dois pontos em metros (Haversine simplificado)
function getDistanceMeters(a, b) {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const c =
    sinDLat * sinDLat +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      sinDLng *
      sinDLng;
  return R * 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
}

export default function MapBackground({ role, tripId, isMinimised }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const driverMarkerRef = useRef(null);
  const lastRoutedDriverRef = useRef(null); // última posição do motorista que gerou uma rota
  const hasCenteredRef = useRef(false);

  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  const { isSharing, start, stop } = useShareLocation(tripId);
  const liveDriverLocation = useWatchDriver(
    role === "passenger" ? tripId : null,
  );

  const [staticDriverLocation] = useState({ lat: -7.2273, lng: -35.8812 });
  const driverLocation = liveDriverLocation ?? staticDriverLocation;

  // 1. Inicializar mapa
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-35.8812, -7.2273],
      zoom: 13,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      mapInstanceRef.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Resize ao minimizar
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const timer = setTimeout(() => mapInstanceRef.current.resize(), 350);
    return () => clearTimeout(timer);
  }, [isMinimised]);

  // 3. Localização do usuário
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation({ lat: -7.23, lng: -35.885 }),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 },
    );
  }, []);

  // 4. Efeito principal — marcadores, rota e câmera
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // ---- MARCADOR DO USUÁRIO ----
    if (userLocation) {
      if (!userMarkerRef.current) {
        const el = document.createElement("div");
        el.style.width = "12px";
        el.style.height = "12px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = "#007AFF";
        el.style.border = "2px solid #fff";
        el.style.boxShadow = "0 0 4px rgba(0,0,0,0.3)";
        userMarkerRef.current = new mapboxgl.Marker(el)
          .setLngLat([userLocation.lng, userLocation.lat])
          .addTo(map);
      } else {
        userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
      }
    }

    // ---- MARCADOR DO MOTORISTA ----
    if (!driverMarkerRef.current) {
      driverMarkerRef.current = new mapboxgl.Marker({ color: "#FF3B30" })
        .setLngLat([driverLocation.lng, driverLocation.lat])
        .addTo(map);
    } else {
      driverMarkerRef.current.setLngLat([driverLocation.lng, driverLocation.lat]);
    }

    // ---- ROTA PELAS RUAS (DIRECTIONS API) ----
    if (userLocation) {
      const shouldRefetch =
        !lastRoutedDriverRef.current ||
        getDistanceMeters(lastRoutedDriverRef.current, driverLocation) >= 100;

      if (shouldRefetch) {
        lastRoutedDriverRef.current = driverLocation;

        const fetchRoute = async () => {
          try {
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${driverLocation.lng},${driverLocation.lat};${userLocation.lng},${userLocation.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
            const res = await fetch(url);
            const data = await res.json();

            if (!data.routes?.[0]) return;

            const coordinates = data.routes[0].geometry.coordinates;

            if (!map.getSource("route-line")) {
              map.addSource("route-line", {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: { type: "LineString", coordinates },
                },
              });

              map.addLayer({
                id: "route-line-layer",
                type: "line",
                source: "route-line",
                layout: {
                  "line-join": "round",
                  "line-cap": "round",
                },
                paint: {
                  "line-color": "#007AFF",
                  "line-width": 4,
                  "line-opacity": 0.8,
                },
              });
            } else {
              map.getSource("route-line").setData({
                type: "Feature",
                properties: {},
                geometry: { type: "LineString", coordinates },
              });
            }
          } catch (err) {
            console.error("Erro ao buscar rota:", err);
          }
        };

        fetchRoute();
      }

      // ---- CÂMERA (FITBOUNDS) ----
      const isMobile = window.innerWidth < 768;
      const bottomPadding = isMinimised ? 80 : isMobile ? 320 : 80;

      const bounds = new mapboxgl.LngLatBounds(
        [
          Math.min(userLocation.lng, driverLocation.lng),
          Math.min(userLocation.lat, driverLocation.lat),
        ],
        [
          Math.max(userLocation.lng, driverLocation.lng),
          Math.max(userLocation.lat, driverLocation.lat),
        ],
      );

      if (!hasCenteredRef.current) {
        map.fitBounds(bounds, {
          padding: { top: 80, bottom: bottomPadding, left: 80, right: 80 },
          maxZoom: 15,
          animate: true,
        });
        hasCenteredRef.current = true;
      } else {
        map.fitBounds(bounds, {
          padding: { top: 80, bottom: bottomPadding, left: 80, right: 80 },
          maxZoom: 15,
          animate: true,
        });
      }
    }
  }, [userLocation, driverLocation, mapReady, isMinimised]);

  return (
    <div style={{ position: "relative", width: "100%", flex: 1, minHeight: 0 }}>
      <section
        className={styles.mapBackground}
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
      />

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
          {isSharing ? "⏹ Parar compartilhamento" : "📍 Compartilhar localização"}
        </button>
      )}

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