import { useNavigate } from "react-router-dom";
import { PlayIcon, PauseIcon, RadioIcon, StopCircleIcon } from "lucide-react";
import styles from "./tripControls.module.css";
import { useShareLocation } from "../../../../../hooks/useDriverLocation";
import { supabase } from "../../../../../services/supabase/supabase.js";

export default function TripControls({
  tripId,
  currentStatus,
  onStatusChange,
}) {
  const navigate = useNavigate();
  const isOngoing = currentStatus === "ongoing";

  const { start, stop } = useShareLocation(tripId);

  const handleToggleTrip = async () => {
    const nextStatus = isOngoing ? "scheduled" : "ongoing";

    const { error } = await supabase
      .from("trips")
      .update({ status: nextStatus })
      .eq("id", tripId);

    if (!error) {
      isOngoing ? stop() : start(); // ← inicia ou para o compartilhamento
      onStatusChange?.(nextStatus);
    }
  };

  const handleEnd = async () => {
    const { error } = await supabase
      .from("trips")
      .update({ status: "completed", actual_arrival: new Date().toISOString() })
      .eq("id", tripId);

    if (!error) {
      stop(); // ← garante que para ao encerrar
      navigate("/admin/home");
    }
  };

  const handleBroadcast = () => {
    // implementar depois
  };

  return (
    <section className={styles.tripControls}>
      <button
        type="button"
        className={`${styles.btnToggle} ${isOngoing ? styles.active : styles.paused}`}
        onClick={handleToggleTrip}
      >
        {isOngoing ? (
          <>
            <PauseIcon className={styles.icon} />

            <span>Pausar Viagem</span>
          </>
        ) : (
          <>
            <PlayIcon className={styles.icon} />

            <span>Iniciar Viagem</span>
          </>
        )}
      </button>

      <div className={styles.secondaryRow}>
        <button type="button" className={styles.btnEnd} onClick={handleEnd}>
          <StopCircleIcon className={styles.iconSecondary} />

          <span>Encerrar</span>
        </button>

        <button
          type="button"
          className={styles.btnBroadcast}
          onClick={handleBroadcast}
        >
          <RadioIcon className={styles.iconSecondary} />

          <span>Broadcast</span>
        </button>
      </div>
    </section>
  );
}
