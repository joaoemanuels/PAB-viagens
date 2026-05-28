import {
  BadgeQuestionMark,
  CreditCard,
  LogOut,
  Star,
  Ticket,
  User,
} from "lucide-react";
import styles from "./modal.module.css";
import Icon from "../../../../public/favicon.svg";

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <img src="/images/ricardo-avatar.png" alt="Ricardo de Oliveira" />

            <span>
              <Star fill={"#fff"} size={12} />
            </span>
          </div>

          <div className={styles.profileTextInfo}>
            <h2> Ricardo de Oliveira</h2>

            <p>ricardo.oliveira@email.com</p>

            <div className={styles.premiumTagWrapper}>
              <span>Premium Member</span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            <li className={`${styles.menuItem} ${styles.activeItem}`}>
              <span className={styles.icon}>
                <User />
              </span>

              <span className={styles.itemText}>Minha Conta</span>
            </li>

            <li className={styles.menuItem}>
              <span className={styles.icon}>
                <Ticket />
              </span>

              <span className={styles.itemText}>Meus Bilhetes</span>
            </li>

            <li className={styles.menuItem}>
              <span className={styles.icon}>
                <CreditCard />
              </span>

              <span className={styles.itemText}>Formas de Pagamento</span>
            </li>
          </ul>

          <div className={styles.divider} />

          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <span className={styles.icon}>
                <BadgeQuestionMark />
              </span>

              <span className={styles.itemText}>Central de Ajuda</span>
            </li>

            <li
              className={`${styles.menuItem} ${styles.logoutItem}`}
              onClick={onClose}
            >
              <span className={styles.icon}>
                <LogOut />
              </span>

              <span className={styles.itemText}>Sair</span>
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
            v4.2.0 - Mobilidade Interestadual
          </p>
        </div>
      </div>
    </div>
  );
}
