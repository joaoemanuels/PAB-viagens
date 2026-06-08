import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabase";

export function usePassengerLocation(tripId) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    let isMounted = true;

    async function getInitialLocation() {
      const { data } = await supabase
        .from("driver_locations")
        .select("latitude, longitude")
        .eq("trip_id", tripId)
        .maybeSingle();

      if (isMounted && data) {
        setCoords({ lat: data.latitude, lng: data.longitude });
      }
    }

    getInitialLocation();

    const channel = supabase
      .channel(`track-trip-${tripId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // troca UPDATE por * para pegar INSERT e UPDATE
          schema: "public",
          table: "driver_locations",
          filter: `trip_id=eq.${tripId}`, // ← ADICIONADO
        },
        (payload) => {
          if (isMounted && payload.new) {
            setCoords({
              lat: payload.new.latitude,
              lng: payload.new.longitude,
            });
          }
        },
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel); // ← era unsubscribe(), agora removeChannel
    };
  }, [tripId]); // ← removido coords das deps

  return coords;
}
