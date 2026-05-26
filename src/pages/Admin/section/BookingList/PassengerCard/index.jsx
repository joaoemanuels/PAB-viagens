import { useState } from "react";
import styles from "./passengerCard.module.css";

export function PassengerCard({
  name,
  details,
  avatar,
  defaultChecked = false,
}) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className={styles.card}>
      <img src={avatar} alt={`Avatar de ${name}`} />

      <div className={styles.cardInfo}>
        <p>{name}</p>
        <span>{details}</span>
      </div>

      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
