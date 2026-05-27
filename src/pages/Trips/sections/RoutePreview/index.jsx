import { MoveRight } from "lucide-react";
import styles from "./routePreview.module.css";

export default function RoutePreview() {
  return (
    <section className={styles.routePreview}>
      <div className={styles.routePreviewContainer}>
        <div className={styles.routePreviewContent}>
          <div className={styles.routePreviewItem}>
            <span>Origem</span>
            <p>São Paulo, SP</p>
          </div>
          <MoveRight className={styles.routePreviewIcon} />
          <div className={styles.routePreviewItem}>
            <span>Destino</span>
            <p>Campinas, SP</p>
          </div>
        </div>
      </div>
    </section>
  );
}
