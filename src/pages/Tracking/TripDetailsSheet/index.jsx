import { MapPin, Phone, Share, Star } from "lucide-react";
import styles from "./tripDetailsSheet.module.css";
import Button from "../../../components/ui/Button";

const currentTrip = {
  statusText: "Indo para Campinas",
  dropoffPoint: "Ponto de desembarque: Terminal Multimodal",
  driver: {
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", // Substitua pelo caminho correto da imagem

    vehicleModel: "Kombi Branca",
    licensePlate: "PAB-2024",
  },
};

export default function TripDetailsSheet() {
  return (
    <div className={styles.tripDetailsSheet}>
      <div className={styles.dragHandle} />

      <div className={styles.destinationSection}>
        <h2>{currentTrip.statusText}</h2>

        <div className={styles.locationWrapper}>
          <MapPin size={16} />
          <p>{currentTrip.dropoffPoint}</p>
        </div>
      </div>

      <div className={styles.driverCard}>
        <div className={styles.avatarWrapper}>
          <img src={currentTrip.driver.avatar} alt={currentTrip.driver.name} />
          <div className={styles.verifiedBadge}>
            <Star className={styles.starIcon} fill="#fff" />
          </div>
        </div>

        <div className={styles.driverInfo}>
          <div className={styles.driverHeader}>
            <h3 className={styles.driverName}>Paulo Aguiar</h3>
            <div className={styles.ratingBadge}>
              <span>5.0</span>
              <Star className={styles.starIcon} fill="currentColor" />
            </div>
          </div>
          <p className={styles.vehicleDetails}>
            {currentTrip.driver.vehicleModel}
            <span className={styles.dotSeparator}>&bull;</span>
            <strong>{currentTrip.driver.licensePlate}</strong>
          </p>
        </div>
      </div>

      <div className={styles.actionsGroup}>
        <Button
          content={"Falar com Paulo"}
          className={styles.primaryActionButton}
          btnIcon={<Phone />}
        />

        <Button
          content={"Compartilhar"}
          className={styles.secondaryActionButton}
          btnIcon={<Share />}
        />
      </div>
    </div>
  );
}
