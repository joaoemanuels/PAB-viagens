import { User, BusFront, Navigation, House } from "lucide-react";

import { NavLink, useParams } from "react-router-dom";

import styles from "./footerAuth.module.css";

export default function FooterAuth() {
  const { tripId } = useParams();

  return (
    <nav className={styles.footer}>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.iconWrapper}>
          <House />

          <span>Home</span>
        </div>
      </NavLink>

      <NavLink
        to="/reserves"
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.iconWrapper}>
          <BusFront />

          <span>Reservas</span>
        </div>
      </NavLink>

      <NavLink
        to={`/tracking/${tripId}`}
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.iconWrapper}>
          <Navigation />

          <span>Rastrear</span>
        </div>
      </NavLink>

      <NavLink
        to="/profileUser"
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.iconWrapper}>
          <User />

          <span>Perfil</span>
        </div>
      </NavLink>
    </nav>
  );
}
