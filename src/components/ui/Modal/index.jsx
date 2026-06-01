import {
  BadgeQuestionMark,
  CreditCard,
  LogOut,
  Star,
  Ticket,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./modal.module.css";
import Icon from "../../../assets/images/favicon.svg";
import { passengersData } from "../../../data/passengers";
import AppVersion from "../AppVersion";
import { authService } from "../../../services/auth";

export default function Modal({ isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const getNavLinkClass = ({ isActive }) =>
    `${styles.menuItem} ${isActive ? styles.activeItem : ""}`;

  const handleLogout = async () => {
    try {
      await authService.signOut();

      onClose();

      navigate("/login/passenger");
    } catch (error) {
      console.error("Erro ao tentar deslogar:", error);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <img src={passengersData.avatar} alt="Ricardo de Oliveira" />
            <span>
              <Star fill={"#fff"} size={12} />
            </span>
          </div>

          <div className={styles.profileTextInfo}>
            <h2>{passengersData.fullName}</h2>
            <p>{passengersData.email}</p>
            <div className={styles.premiumTagWrapper}>
              <span>Premium Member</span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            <NavLink
              to="/profileUser"
              className={getNavLinkClass}
              onClick={onClose}
            >
              <span className={styles.icon}>
                <User />
              </span>
              <span className={styles.itemText}>Minha Conta</span>
            </NavLink>

            <NavLink
              to="/reserves"
              className={getNavLinkClass}
              onClick={onClose}
            >
              <span className={styles.icon}>
                <Ticket />
              </span>
              <span className={styles.itemText}>Meus Bilhetes</span>
            </NavLink>

            <NavLink
              to="/payMethod"
              className={getNavLinkClass}
              onClick={onClose}
            >
              <span className={styles.icon}>
                <CreditCard />
              </span>
              <span className={styles.itemText}>Formas de Pagamento</span>
            </NavLink>
          </ul>

          <div className={styles.divider} />

          <ul className={styles.menuList}>
            <NavLink to="/ajuda" className={getNavLinkClass} onClick={onClose}>
              <span className={styles.icon}>
                <BadgeQuestionMark />
              </span>
              <span className={styles.itemText}>Central de Ajuda</span>
            </NavLink>

            <li
              className={`${styles.menuItem} ${styles.logoutItem}`}
              onClick={onClose}
            >
              <span className={styles.icon}>
                <LogOut />
              </span>
              <span className={styles.itemText} onClick={handleLogout}>
                Sair
              </span>
            </li>
          </ul>
        </nav>

        <div className={styles.brandFooter}>
          <div className={styles.brandLogo}>
            <span className={styles.brandIcon}>
              <img src={Icon} alt="" />
            </span>
            <span className={styles.brandName}>PAB Viagens</span>
          </div>

          <p className={styles.versionText}>
            <AppVersion version={passengersData.appVersion} />
          </p>
        </div>
      </div>
    </div>
  );
}
