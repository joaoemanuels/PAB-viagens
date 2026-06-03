import { ChevronRight } from "lucide-react";
import styles from "./bookingActions.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../components/ui/Button";

export default function BookingActions({ tripId }) {
  const navigate = useNavigate();

  function handleBooking() {
    navigate(`/trips/${tripId}/booking`);
  }
  return (
    <section className={styles.bookingActions}>
      <Button
        type="submit"
        variant="primary"
        content="Reservar agora"
        btnIcon={<ChevronRight />}
        onClick={handleBooking}
      />
    </section>
  );
}
