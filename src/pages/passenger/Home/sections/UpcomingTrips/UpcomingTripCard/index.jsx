import { useNavigate } from "react-router-dom";
import styles from "./upcomingTripCard.module.css";

import { BusFront, Clock3 } from "lucide-react";
import { formatCurrency } from "../../../../../../utils/formatCurrency";
import Badge from "../../../../../../components/ui/Badge";
import Button from "../../../../../../components/ui/Button";

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
    navigate(`/trips/${tripId}`);
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
          <strong>{formatCurrency(price)}</strong>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.time}>
          <Clock3 size={16} />

          <span>Partida: {departure}</span>
        </div>

        <Badge
          content={seatsRemaining}
          context={"lugares restantes"}
          variant="primary"
        />
      </div>

      <Button
        type="button"
        content="Reservar agora"
        className={styles.button}
        onClick={handleBooking}
        variant="secondary"
      ></Button>
    </div>
  );
}
