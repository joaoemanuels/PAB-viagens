import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../services/supabase/supabase.js";

const INTERVAL_MS = 4000;

export function useShareLocation(tripId) {
  const [isSharing, setIsSharing] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    console.log("start chamado, tripId:", tripId);
    if (!tripId) {
      console.warn("tripId ausente, abortando");
      return;
    }

    // PROTEÇÃO: Limpa qualquer intervalo órfão ativo antes de criar um novo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const share = () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          console.log(
            "posição obtida:",
            pos.coords.latitude,
            pos.coords.longitude,
          );

          const { error } = await supabase.from("driver_locations").upsert(
            {
              trip_id: tripId,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              timestamp: new Date().toISOString(),
            },
            { onConflict: "trip_id" },
          );

          if (error) console.error("Erro no upsert do Supabase:", error);
        },
        (err) => console.error("geolocation erro:", err),
        { enableHighAccuracy: true, timeout: 10000 },
      );
    };

    share(); // Executa a primeira imediatamente
    intervalRef.current = setInterval(share, INTERVAL_MS);
    setIsSharing(true);
  }, [tripId]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsSharing(false);
  }, []);

  // Garante a limpeza completa quando o componente desmontar da tela
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { isSharing, start, stop };
}

export function useWatchDriver(tripId) {
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    // 1. Busca posição inicial
    supabase
      .from("driver_locations")
      .select("latitude, longitude")
      .eq("trip_id", tripId)
      .maybeSingle()
      .then(({ data }) => {
        if (data && data.latitude && data.longitude) {
          setDriverLocation({ lat: data.latitude, lng: data.longitude });
        }
      });

    // 2. Escuta atualizações em tempo real com CANAL DINÂMICO único por viagem
    const channel = supabase
      .channel(`driver-location-${tripId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "driver_locations",
        },
        (payload) => {
          console.log(`Realtime recebido para viagem ${tripId}:`, payload);

          if (
            payload.new &&
            payload.new.trip_id === tripId &&
            payload.new.latitude &&
            payload.new.longitude
          ) {
            setDriverLocation({
              lat: payload.new.latitude,
              lng: payload.new.longitude,
            });
          }
        },
      )
      .subscribe((status) => {
        console.log(`Status da conexão Realtime (${tripId}):`, status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId]);

  return driverLocation;
}
