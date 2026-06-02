import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabase";

export function usePassengerLocation(tripId) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    // 1. Busca a posição inicial para o mapa não começar vazio
    async function getInitialLocation() {
      const { data } = await supabase
        .from("driver_locations") // ou 'trips', dependendo de onde você salva
        .select("latitude, longitude")
        .eq("trip_id", tripId)
        .maybeSingle();

      if (data) {
        setCoords({ lat: data.latitude, lng: data.longitude });
      }
    }

    getInitialLocation();

    // 2. Inscreve no Realtime do Supabase para ouvir os updates do motorista
    const channel = supabase
      .channel(`track-trip-${tripId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // ou INSERT/UPSERT dependendo de como a tabela funciona
          schema: "public",
          table: "driver_locations",
          filter: `trip_id=eq.${tripId}`,
        },
        (payload) => {
          // Quando o motorista atualizar a posição, o payload traz os dados novos
          const { latitude, longitude } = payload.new;
          setCoords({ lat: latitude, lng: longitude });
        },
      )
      .subscribe();

    // Limpa a inscrição quando o passageiro sair da tela ou a viagem acabar
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId]);

  return coords; // Retorna { lat, lng } atualizado em tempo real para o componente do mapa
}
