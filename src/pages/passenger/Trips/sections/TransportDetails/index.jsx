import Badge from "../../../../../components/ui/Badge";
import styles from "./transportDetails.module.css";

import { Star, MessageSquareText, Car } from "lucide-react";

export default function TransportDetails() {
  return (
    <section className={styles.transportDetails}>
      <div className={styles.transportDetailsContainer}>
        <span className={styles.label}>DETALHES DO TRANSPORTE</span>

        <div className={styles.vehicleCard}>
          <div className={styles.vehicleIcon}>
            <Car />
          </div>

          <div className={styles.vehicleInfo}>
            <h2>Kombi</h2>

            <div className={styles.tags}>
              <Badge variant="tertiary" content="PAB-2026" />

              <span className={styles.type}>• Executivo</span>
            </div>
          </div>
        </div>

        <div className={styles.driver}>
          <div className={styles.driverInfo}>
            <img src="https://i.pravatar.cc/100?img=12" alt="Motorista" />

            <div>
              <h3>Paulo Aguiar</h3>

              <div className={styles.rating}>
                <Star size={14} fill="currentColor" />

                <span>5.0 (7 anos)</span>
              </div>
            </div>
          </div>

          <button className={styles.chatButton}>
            <MessageSquareText size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
