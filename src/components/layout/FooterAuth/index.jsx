import { User, BusFront, Navigation, House } from "lucide-react";

import { NavLink } from "react-router-dom";

import styles from "./footerAuth.module.css";

export default function FooterAuth() {
  return (
    <nav className={styles.footer}>
      <NavLink
        to="/"
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
        to="/trips"
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.iconWrapper}>
          <BusFront />

          <span>Viagens</span>
        </div>
      </NavLink>

      <NavLink
        to="/tracking"
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
        to="/profile"
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
