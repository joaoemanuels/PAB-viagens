import { MoveRight } from "lucide-react";
import styles from "./routePreview.module.css";

export default function RoutePreview({ origin, destination }) {
  return (
    <section className={styles.routePreview}>
      <div className={styles.routePreviewContainer}>
        <div className={styles.routePreviewContent}>
          <div className={styles.routePreviewItem}>
            <span>Origem</span>
            <p>{origin}</p>
          </div>
          <MoveRight className={styles.routePreviewIcon} />
          <div className={styles.routePreviewItem}>
            <span>Destino</span>
            <p>{destination}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
