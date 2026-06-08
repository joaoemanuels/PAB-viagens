import { useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabase";

export function useActiveBooking() {
  const [tripId, setTripId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("bookings")
        .select("trip_id")
        .eq("passenger_id", user.id)
        .eq("status", "confirmed") // ajusta pro nome do status que você usa
        .maybeSingle();

      setTripId(data?.trip_id ?? null);
      setLoading(false);
    }

    fetch();
  }, []);

  return { tripId, loading };
}
