import { ChevronRight, Phone, QrCode } from "lucide-react";
import styles from "./bookingActions.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/Button";

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

      <div className={styles.secondaryRow}>
        <button className={`${styles.buttonSecondary} ${styles.pix}`}>
          <QrCode className={styles.icon} />
          PIX Info
        </button>

        <button className={`${styles.buttonSecondary} ${styles.whatsapp}`}>
          <Phone className={styles.icon} /> WhatsApp
        </button>
      </div>
    </section>
  );
}
