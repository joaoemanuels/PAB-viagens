import { useNavigate } from "react-router-dom";
import { Navigation } from "lucide-react";
import { useActiveTripId } from "../../../hooks/useActiveTripId";
import styles from "./trackingGate.module.css";
import Tracking from "../../../pages/passenger/Tracking";

export default function TrackingGate() {
  const { tripId, loading } = useActiveTripId();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.spinner} />
        <p className={styles.text}>Verificando viagens...</p>
      </div>
    );
  }

  if (tripId) {
    return <Tracking tripId={tripId} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Navigation size={40} />
      </div>
      <h2 className={styles.title}>Nenhuma viagem em andamento</h2>
      <p className={styles.text}>
        O motorista ainda não iniciou o compartilhamento de localização. Aguarde
        e tente novamente em instantes.
      </p>
      <button className={styles.btn} onClick={() => navigate("/home")}>
        Voltar para o início
      </button>
    </div>
  );
}
