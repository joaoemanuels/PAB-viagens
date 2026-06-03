import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../services/supabase/supabase.js"; // caminho correto

const INTERVAL_MS = 4000;

export function useShareLocation(tripId) {
  // ← recebe tripId, não driver_id
  const [isSharing, setIsSharing] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    console.log("start chamado, tripId:", tripId);
    if (!tripId) {
      console.warn("tripId ausente, abortando");
      return;
    }

    const share = () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          console.log(
            "posição obtida:",
            pos.coords.latitude,
            pos.coords.longitude,
          );

          const { data, error } = await supabase
            .from("driver_locations")
            .upsert(
              {
                trip_id: tripId,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
                timestamp: new Date().toISOString(),
              },
              { onConflict: "trip_id" },
            );

          console.log("upsert resultado:", { data, error }); // ← erro aparece aqui
        },
        (err) => console.error("geolocation erro:", err), // ← erro de GPS aparece aqui
        { enableHighAccuracy: true, timeout: 10000 },
      );
    };

    share();
    intervalRef.current = setInterval(share, INTERVAL_MS);
    setIsSharing(true);
  }, [tripId]);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsSharing(false);
  }, []);

  useEffect(() => () => clearInterval(intervalRef.current), []);

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
      .maybeSingle() // maybeSingle evita estourar erro no console se a linha ainda não existir
      .then(({ data }) => {
        if (data && data.latitude && data.longitude) {
          setDriverLocation({ lat: data.latitude, lng: data.longitude });
        }
      });

    // 2. Escuta atualizações em tempo real (Formato corrigido)
    const channel = supabase
      .channel("driver-location-channel") // Nome genérico para o canal
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "driver_locations",
          // Removido o parâmetro 'filter' daqui
        },
        (payload) => {
          console.log("Realtime recebido do motorista (Sem filtro):", payload);

          // Filtramos diretamente no código para garantir que pertence a esta viagem
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
        // Log para você ter certeza na aba do navegador se o realtime conectou
        console.log(`Status da conexão Realtime (${tripId}):`, status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId]);

  return driverLocation;
}
