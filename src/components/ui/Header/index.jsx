import { CircleUserRound, Menu } from "lucide-react";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Menu className={styles.menuHamburguer} />

      <p className={styles.headerContent}>PAB Mobilidade</p>

      <div className={styles.userAvatar}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg"
          alt="Avatar"
        />
      </div>
      <div className={styles.supportIcon}>
        <CircleUserRound />
      </div>
    </div>
  );
}
