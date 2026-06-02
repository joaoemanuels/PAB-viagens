import { PlayIcon, PauseIcon, RadioIcon, StopCircleIcon } from "lucide-react";
import styles from "./tripControls.module.css";
import { useShareLocation } from "../../../../../hooks/useDriverLocation";
import { supabase } from "../../../../../services/supabase/supabase.js";

export default function TripControls({
  tripId,
  currentStatus,
  onStatusChange,
}) {
  const isOngoing = currentStatus === "in_progress";

  const { isSharing, start, stop } = useShareLocation(tripId);

  const handleEnd = async () => {
    const { error } = await supabase
      .from("trips")
      .update({ status: "completed", actual_arrival: new Date().toISOString() })
      .eq("id", tripId);

    if (!error) {
      stop();

      console.log("Viagem encerrada com sucesso");
    }
  };

  const handleBroadcast = () => {
    // implementar depois
  };

  const handleToggleTrip = async () => {
    if (!tripId) {
      console.error("Não é possível alterar o status: tripId está indefinido.");
      return;
    }

    const nextStatus = isOngoing ? "scheduled" : "in_progress";

    console.log("handleToggleTrip chamado");
    console.log("tripId:", tripId);
    console.log("isOngoing:", isOngoing);
    console.log("nextStatus:", nextStatus);

    const { error } = await supabase
      .from("trips")
      .update({ status: nextStatus })
      .eq("id", tripId);

    console.log("update resultado:", { error });

    if (!error) {
      isOngoing ? stop() : start();
      onStatusChange?.(nextStatus);
    }
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

            <span>
              {isSharing ? "Pausar Viagem (ao vivo)" : "Pausar Viagem"}
            </span>
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
