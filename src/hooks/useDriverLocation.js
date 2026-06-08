import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../services/supabase/supabase.js";

export function useShareLocation(tripId) {
  const [isSharing, setIsSharing] = useState(false);
  const watchRef = useRef(null);

  const start = useCallback(() => {
    if (!tripId) return console.warn("tripId ausente, abortando");
    if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);

    // watchPosition é muito mais leve para a bateria do celular do motorista
    watchRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        console.log(
          "Nova posição do motorista:",
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
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );

    setIsSharing(true);
  }, [tripId]);

  const stop = useCallback(() => {
    if (watchRef.current) {
      navigator.geolocation.clearWatch(watchRef.current);
      watchRef.current = null;
    }
    setIsSharing(false);
  }, []);

  useEffect(() => {
    return () => {
      if (watchRef.current) navigator.geolocation.clearWatch(watchRef.current);
    };
  }, []);

  return { isSharing, start, stop };
}

export function useWatchDriver(tripId) {
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    supabase
      .from("driver_locations")
      .select("latitude, longitude")
      .eq("trip_id", tripId)
      .gte("timestamp", fiveMinutesAgo) // <-- Garante apenas posições nos últimos 5 minutos
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) console.error("Erro ao buscar posição inicial:", error);
        if (data?.latitude && data?.longitude) {
          setDriverLocation({ lat: data.latitude, lng: data.longitude });
        }
      });

    const channel = supabase
      .channel(`driver-location-${tripId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "driver_locations",
          filter: `trip_id=eq.${tripId}`,
        },
        (payload) => {
          console.log("Mudança de posição recebida em Realtime:", payload);
          const current = payload.new;
          if (current?.latitude && current?.longitude) {
            setDriverLocation({
              lat: current.latitude,
              lng: current.longitude,
            });
          }
        },
      )
      .subscribe((status) => {
        console.log(`Status do Canal Realtime (${tripId}):`, status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId]);

  return driverLocation;
}
