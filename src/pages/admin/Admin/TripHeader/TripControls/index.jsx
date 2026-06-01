import { useNavigate } from "react-router-dom";
import { supabase } from "../../../../../services/supabase/supabase.js";
import { PauseIcon, RadioIcon, StopCircleIcon } from "lucide-react";
import styles from "./tripControls.module.css";

export default function TripControls({ tripId }) {
  const navigate = useNavigate();

  const handlePause = async () => {
    await supabase
      .from("trips")
      .update({ status: "scheduled" })
      .eq("id", tripId);
  };

  const handleEnd = async () => {
    await supabase
      .from("trips")
      .update({ status: "completed", actual_arrival: new Date().toISOString() })
      .eq("id", tripId);

    navigate("/admin/home");
  };

  const handleBroadcast = () => {
    // implementar depois
  };

  return (
    <section className={styles.tripControls}>
      <button type="button" className={styles.btnPause} onClick={handlePause}>
        <PauseIcon className={styles.icon} />
        <span>Pausar Viagem</span>
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
