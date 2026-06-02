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
  // ← tripId, não driverId
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    supabase
      .from("driver_locations")
      .select("latitude, longitude") // ← nomes corretos
      .eq("trip_id", tripId) // ← filtro por trip_id
      .single()
      .then(({ data }) => {
        if (data)
          setDriverLocation({ lat: data.latitude, lng: data.longitude });
      });

    const channel = supabase
      .channel("driver-location-" + tripId)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "driver_locations",
          filter: `trip_id=eq.${tripId}`, // ← filtro correto
        },
        (payload) => {
          const { latitude, longitude } = payload.new; // ← nomes corretos
          setDriverLocation({ lat: latitude, lng: longitude });
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [tripId]);

  return driverLocation;
}
