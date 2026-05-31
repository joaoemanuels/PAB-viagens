import { Clock, Users, Eye, CircleDot, MapPin } from "lucide-react";
import styles from "./activeTravels.module.css";

export default function ActiveTravels() {
  return (
    <section className={styles.activeTravels}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.statusBadge}>EM ANDAMENTO</span>
        </div>

        <div className={styles.routeTimeline}>
          <div className={styles.timelineLine}></div>

          <div className={styles.routePoint}>
            <CircleDot
              className={styles.iconOrigem}
              size={20}
              strokeWidth={3}
            />
            <div className={styles.routeText}>
              <span className={styles.label}>ORIGEM</span>
              <p className={styles.placeName}>Terminal Tietê, São Paulo</p>
            </div>
          </div>

          <div className={styles.routePoint}>
            <MapPin className={styles.iconDestino} size={20} />
            <div className={styles.routeText}>
              <span className={styles.label}>DESTINO</span>
              <p className={styles.placeName}>Centro, Campinas</p>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <Clock size={20} />
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Saída</span>
              <span className={styles.metaValue}>Hoje, 14:30</span>
            </div>
          </div>

          <div className={styles.metaItem}>
            <Users size={20} />
            <div className={styles.metaText}>
              <span className={styles.metaLabel}>Passageiros</span>
              <span className={styles.metaValue}>12/15 Confirmados</span>
            </div>
          </div>
        </div>

        <button className={styles.detailsButton}>
          <Eye size={20} />
          <span>Ver Detalhes</span>
        </button>
      </div>
    </section>
  );
}
