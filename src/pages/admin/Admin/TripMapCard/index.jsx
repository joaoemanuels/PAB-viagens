import { MapPinIcon } from "lucide-react";
import styles from "./tripMapCard.module.css";

export default function TripMapCard({ trip }) {
  const currentLocation = trip?.driver_current_lat
    ? `${trip.driver_current_lat}, ${trip.driver_current_lng}`
    : "Localização não disponível";

  const progressPercentage = 0; // implementar cálculo real depois

  return (
    <section className={styles.tripMapCard}>
      <div className={styles.tripMapCardContainer}>
        <div className={styles.mapWrapper}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/500px-Image_created_with_a_mobile_phone.png"
            alt="Mapa do trajeto atual"
            className={styles.mapImage}
          />
          <div className={styles.locationBadge}>
            <MapPinIcon className={styles.pinIcon} />
            <span>{currentLocation}</span>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.rowTop}>
            <span className={styles.label}>Próxima Parada</span>
            <span className={styles.time}>
              {trip?.estimated_arrival ?? "—"}
            </span>
          </div>

          <h3 className={styles.stopName}>
            {trip?.routes?.destination ?? "—"}
          </h3>

          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
