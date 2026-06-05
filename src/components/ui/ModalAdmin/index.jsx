import { NavLink, useNavigate } from "react-router-dom";
import { authService } from "../../../services/auth";
import { passengersData } from "../../../data/passengers";
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

import styles from "./modalAdmin.module.css";

export default function ModalAdmin({ isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const getNavLinkClass = ({ isActive }) =>
    `${styles.menuItem} ${isActive ? styles.activeItem : ""}`;

  const handleLogout = async () => {
    try {
      await authService.signOut();

      onClose();

      navigate("/login/admin");
    } catch (error) {
      console.error("Erro ao tentar deslogar:", error);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <img
              src="https://scontent.cdninstagram.com/v/t51.82787-19/642493145_18055397795454507_6225200326203174088_n.jpg?_nc_cat=104&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=Dpodp99Q7dwQ7kNvwEEcMQh&_nc_oc=AdoQBXN96OBCVZQMNyNb5pbILUHNin48VTmlVUW-J1xxMC8wyY2buZETYmZZU4PKy14&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=9iKtou7INYlnPps64IULpw&_nc_ss=7c6a8&oh=00_Af8Hg_6KIz8NicoJw66T3mtmG8wP4N0t6W-em_7nZU8mzw&oe=6A2895D2"
              alt="Paulo Aguiar"
            />
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
              to="/profileAdmin"
              className={getNavLinkClass}
              onClick={onClose}
            >
              <span className={styles.icon}>
                <User />
              </span>
              <span className={styles.itemText}>Minha Conta</span>
            </NavLink>

            <NavLink
              to="/travelsAdmin"
              className={getNavLinkClass}
              onClick={onClose}
            >
              <span className={styles.icon}>
                <Ticket />
              </span>
              <span className={styles.itemText}>Minhas viagens</span>
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
