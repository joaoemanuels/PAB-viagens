import { User, BusFront, Navigation, House, Ticket } from "lucide-react";
import styles from "./footerAuth.module.css";

export default function FooterAuth() {
  const activeTab = "Home";

  return (
    <nav className={styles.footer}>
      <button
        className={`${styles.navButton} ${activeTab === "Home" ? styles.active : ""}`}
      >
        <div className={styles.iconWrapper}>
          <House />
          <span>Home</span>
        </div>
      </button>

      <button
        className={`${styles.navButton} ${activeTab === "Viagens" ? styles.active : ""}`}
      >
        <BusFront />
        <span>Viagens</span>
      </button>

      <button
        className={`${styles.navButton} ${activeTab === "rastrear" ? styles.active : ""}`}
      >
        <Navigation />
        <span>Rastrear</span>
      </button>

      <button
        className={`${styles.navButton} ${activeTab === "Reservas" ? styles.active : ""}`}
      >
        <Ticket />
        <span>Reservas</span>
      </button>

      <button
        className={`${styles.navButton} ${activeTab === "perfil" ? styles.active : ""}`}
      >
        <User />
        <span>Perfil</span>
      </button>
    </nav>
  );
}
