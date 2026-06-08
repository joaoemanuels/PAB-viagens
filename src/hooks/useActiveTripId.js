import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabase";

export function useActiveTripId() {
  const [tripId, setTripId] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchActiveTrip() {
    const { data } = await supabase
      .from("trips")
      .select("id")
      .eq("status", "in_progress")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
console.log("fetchActiveTrip resultado:", data);
    setTripId(data?.id ?? null);
    setLoading(false);
  }

  useEffect(() => {
    fetchActiveTrip();

    const channel = supabase
      .channel("active-trip-watch")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "trips",
        },
        (payload) => {
          if (payload.new.status === "in_progress") {
            setTripId(payload.new.id);
          } else if (payload.new.id === tripId) {
            setTripId(null);
          }
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [tripId]);

  return { tripId, loading };
}
