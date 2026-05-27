import { useNavigate } from "react-router-dom";
import styles from "./upcomingTripCard.module.css";

import { BusFront, Clock3 } from "lucide-react";

export default function UpcomingTripCard({
  category,
  route,
  price,
  departure,
  seatsRemaining,
  tripId,
}) {
  const navigate = useNavigate();

  function handleBooking() {
    navigate(`/booking/${tripId}`);
  }

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.tripInfo}>
          <div className={styles.category}>
            <BusFront size={14} />

            <span>{category}</span>
          </div>

          <h3>{route}</h3>
        </div>

        <div className={styles.price}>
          <span>R$</span>

          <strong>{price.toFixed(2).replace(".", ",")}</strong>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.time}>
          <Clock3 size={16} />

          <span>Partida: {departure}</span>
        </div>

        <div className={styles.seats}>{seatsRemaining} lugares restantes</div>
      </div>

      <button className={styles.button} onClick={handleBooking}>
        Reservar
      </button>
    </div>
  );
}
