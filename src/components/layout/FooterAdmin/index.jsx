import { NavLink } from "react-router-dom";
import { UserSearch, User, BusFront } from "lucide-react";
import styles from "./footerAdmin.module.css";

export default function FooterAdmin() {
  const checkActive = ({ isActive }) =>
    `${styles.navButton} ${isActive ? styles.active : ""}`;

  return (
    <nav className={styles.footer}>
      <NavLink to="/travelsAdmin" className={checkActive}>
        <BusFront />
        <span>Viagens</span>
      </NavLink>

      <NavLink to="/reserveAdmin" className={checkActive}>
        <div className={styles.iconWrapper}>
          <UserSearch />
        </div>
        <span>Reservas</span>
      </NavLink>

      <NavLink to="/mapAdmin" className={checkActive}>
        <User />
        <span>Mapa</span>
      </NavLink>

      <NavLink to="/profileAdmin" className={checkActive}>
        <User />
        <span>Configuração</span>
      </NavLink>
    </nav>
  );
}
