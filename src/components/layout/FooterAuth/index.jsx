import { User, BusFront, Navigation, House, Ticket } from "lucide-react";

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
        <House />

        <span>Home</span>
      </NavLink>

      <NavLink
        to="/trips"
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <BusFront />

        <span>Viagens</span>
      </NavLink>

      <NavLink
        to="/tracking"
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <Navigation />

        <span>Rastrear</span>
      </NavLink>

      <NavLink
        to="/reservations"
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <Ticket />

        <span>Reservas</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${styles.navButton} ${isActive ? styles.active : ""}`
        }
      >
        <User />

        <span>Perfil</span>
      </NavLink>
    </nav>
  );
}
