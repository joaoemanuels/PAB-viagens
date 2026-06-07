import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabase";

export function usePassengerLocation(tripId) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    let isMounted = true;

    // 1. Busca a posição inicial
    async function getInitialLocation() {
      const { data } = await supabase
        .from("driver_locations")
        .select("latitude, longitude")
        .eq("trip_id", tripId)
        .maybeSingle();

      // Só atualiza se o componente ainda estiver montado e se o Realtime já não tiver atualizado
      if (isMounted && data && !coords) {
        setCoords({ lat: data.latitude, lng: data.longitude });
      }
    }

    getInitialLocation();

    // 2. Inscreve no Realtime
    const channel = supabase
      .channel(`track-trip-${tripId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // Se o motorista usa insert para histórico, mude para "INSERT"
          schema: "public",
          table: "driver_locations",
          filter: `trip_id=eq.${tripId}`,
        },
        (payload) => {
          if (isMounted && payload.new) {
            const { latitude, longitude } = payload.new;
            setCoords({ lat: latitude, lng: longitude });
          }
        },
      )
      .subscribe();

    // Limpeza estrita
    return () => {
      isMounted = false;
      channel.unsubscribe();
    };
  }, [tripId, coords]);

  return coords;
}
