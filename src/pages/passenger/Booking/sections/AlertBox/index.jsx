import { CircleAlert } from "lucide-react";
import styles from "./alertBox.module.css";

export default function AlertBox() {
  return (
    <section className={styles.alertBox}>
      <div className={styles.alertContent}>
        <CircleAlert size={50} />
        <p>
          Certifique-se de chegar ao local de embarque com pelo menos 15 minutos
          de antecedência.
        </p>
      </div>
    </section>
  );
}
