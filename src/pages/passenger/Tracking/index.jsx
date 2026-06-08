import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabase/supabase";

import Header from "../../../components/ui/Header";
import MapBackground from "./MapBackground";
import TripDetailsSheet from "./TripDetailsSheet";
import styles from "./tracking.module.css";

export default function Tracking({ tripId }) {
  const [isMinimised, setIsMinimised] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tripId) return;

    const channel = supabase
      .channel(`trip-status-${tripId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "trips",
          filter: `id=eq.${tripId}`,
        },
        (payload) => {
          const status = payload.new.status;
          if (status === "scheduled" || status === "completed") {
            navigate("/rastrear", { replace: true });
          }
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [tripId, navigate]);

  return (
    <section className={styles.tracking}>
      <Header showSupportIcon={false} />
      <MapBackground
        isMinimised={isMinimised}
        role="passenger"
        tripId={tripId}
      />
      <TripDetailsSheet
        isMinimised={isMinimised}
        setIsMinimised={setIsMinimised}
        tripId={tripId}
      />
    </section>
  );
}