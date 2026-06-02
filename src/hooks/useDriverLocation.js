import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../services/supabase/supabase.js";

const INTERVAL_MS = 4000;

export function useShareLocation(tripId) {
  const [isSharing, setIsSharing] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (!tripId) return;

    const share = () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await supabase.from("driver_locations").upsert(
            {
              trip_id: tripId,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              timestamp: new Date().toISOString(),
            },
            { onConflict: "trip_id" },
          );
        },
        null,
        { enableHighAccuracy: true, timeout: 5000 },
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

    // Busca posição inicial
    supabase
      .from("driver_locations")
      .select("latitude, longitude")
      .eq("trip_id", tripId)
      .single()
      .then(({ data }) => {
        if (data)
          setDriverLocation({ lat: data.latitude, lng: data.longitude });
      });

    // Subscribe em tempo real
    const channel = supabase
      .channel("driver-location-" + tripId)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "driver_locations",
          filter: `trip_id=eq.${tripId}`,
        },
        (payload) => {
          const { latitude, longitude } = payload.new;
          setDriverLocation({ lat: latitude, lng: longitude });
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [tripId]);

  return driverLocation;
}
