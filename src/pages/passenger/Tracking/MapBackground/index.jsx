import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./mapBackground.module.css";

import {
  useShareLocation,
  useWatchDriver,
} from "../../../../hooks/useDriverLocation";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function MapBackground({ role, tripId, isMinimised }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Guardamos as referências dos marcadores e polylines para atualizá-los sem recriar
  const userMarkerRef = useRef(null);
  const driverMarkerRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const hasCenteredRef = useRef(false);

  const { isSharing, start, stop } = useShareLocation(tripId);

  const liveDriverLocation = useWatchDriver(
    role === "passenger" ? tripId : null,
  );

  const [staticDriverLocation] = useState({ lat: -7.2273, lng: -35.8812 });
  const driverLocation = liveDriverLocation ?? staticDriverLocation;

  // 1. Inicializar o Mapa (Uma única vez)
  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v12", // Estilo com foco em trânsito/ruas
      center: [-35.8812, -7.2273], // NOTA: Mapbox usa [Lng, Lat]
      zoom: 13,
    });

    // Adiciona controles de navegação simples (opcional)
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

  // 2. Substitui o antigo 'invalidateSize' do Leaflet para reajustar o container
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const timer = setTimeout(() => {
      mapInstanceRef.current.resize();
    }, 350);

    return () => clearTimeout(timer);
  }, [isMinimised]);

  // 3. Capturar localização do Usuário (Nativo do Navegador)
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserLocation({ lat: -7.23, lng: -35.885 }),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 },
    );
  }, []);

  // 4. Efeito principal: Atualizar Marcadores, Linha e Enquadramento (fitBounds)
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Lembrete crucial: Mapbox sempre espera as coordenadas como [lng, lat]

    // ---- MARCADOR DO USUÁRIO (Estilo CircleMarker azul) ----
    if (userLocation) {
      if (!userMarkerRef.current) {
        // Criamos uma Div customizada para emular o CircleMarker do Leaflet via CSS puro
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
      // Marcador padrão do Mapbox (Pin vermelho clássico)
      // Se quiser usar imagem própria futuramente, basta passar um elemento HTML aqui igual fizemos no usuário
      driverMarkerRef.current = new mapboxgl.Marker({ color: "#FF3B30" })
        .setLngLat([driverLocation.lng, driverLocation.lat])
        .addTo(map);
    } else {
      // O Mapbox faz transições de coordenadas de forma extremamente suave por padrão
      driverMarkerRef.current.setLngLat([
        driverLocation.lng,
        driverLocation.lat,
      ]);
    }

    // ---- LINHA ENTRE OS DOIS (POLYLINE VIA LAYER) ----
    if (userLocation) {
      const coordinates = [
        [userLocation.lng, userLocation.lat],
        [driverLocation.lng, driverLocation.lat],
      ];

      // No Mapbox, polylines são adicionadas via Sources (Fontes GeoJSON) + Layers (Camadas)
      if (!map.getSource("route-line")) {
        map.addSource("route-line", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
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
            "line-width": 2,
            "line-opacity": 0.6,
            "line-dasharray": [2, 2], // Linha tracejada equivalente ao 'dashArray' do Leaflet
          },
        });
      } else {
        // Se a fonte já existe, apenas atualizamos os dados geográficos na tela de forma limpa
        map.getSource("route-line").setData({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        });
      }

      // ---- AJUSTE DE CÂMERA (FITBOUNDS) ----
      const isMobile = window.innerWidth < 768;
      const bottomPadding = isMinimised ? 80 : isMobile ? 320 : 80;

      // Calculamos o bounding box manualmente (O Mapbox pede no formato [Sudoeste, Nordeste])
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

      // Executa a primeira centralização obrigatória
      if (!hasCenteredRef.current) {
        map.fitBounds(bounds, {
          padding: { top: 80, bottom: bottomPadding, left: 80, right: 80 },
          maxZoom: 15,
          animate: true,
        });
        hasCenteredRef.current = true;
      }

      // Mantém o enquadramento atualizado conforme eles se movem
      map.fitBounds(bounds, {
        padding: { top: 80, bottom: bottomPadding, left: 80, right: 80 },
        maxZoom: 15,
        animate: true, // Garante que a transição do enquadramento seja fluida
      });
    }
  }, [userLocation, driverLocation, mapReady, isMinimised]);

  return (
    <div style={{ position: "relative", width: "100%", flex: 1, minHeight: 0 }}>
      {/* Container do Mapa */}
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
          {isSharing
            ? "⏹ Parar compartilhamento"
            : "📍 Compartilhar localização"}
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
