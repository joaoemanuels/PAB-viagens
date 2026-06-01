import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../../services/auth";

import {
  BadgeQuestionMark,
  CreditCard,
  LogOut,
  Star,
  Ticket,
  User,
} from "lucide-react";
import Icon from "../../../assets/images/favicon.svg";
import AppVersion from "../AppVersion";

import styles from "./modal.module.css";

export default function Modal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!isOpen) return;
      const data = await authService.getCurrentUser();
      setProfile(data);
    }

    fetchProfile();
  }, [isOpen]);

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
            <img src={profile?.avatar_url} alt={profile?.full_name} />
            <span>
              <Star fill={"#fff"} size={12} />
            </span>
          </div>

          <div className={styles.profileTextInfo}>
            <h2>{profile?.full_name}</h2>
            <p>{profile?.email}</p>
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
            <AppVersion version={profile?.app_version} />
          </p>
        </div>
      </div>
    </div>
  );
}
