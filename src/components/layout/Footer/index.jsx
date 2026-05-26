import { UserSearch, User, BusFront } from "lucide-react";
import styles from "./footer.module.css";

export default function Footer() {
  const activeTab = "passageiros";

  return (
    <nav className={styles.footer}>
      <button
        className={`${styles.navButton} ${activeTab === "viagens" ? styles.active : ""}`}
      >
        <BusFront />
        <span>Viagens</span>
      </button>

      <button
        className={`${styles.navButton} ${activeTab === "passageiros" ? styles.active : ""}`}
      >
        <div className={styles.iconWrapper}>
          <UserSearch />
        </div>
        <span>Passageiros</span>
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
