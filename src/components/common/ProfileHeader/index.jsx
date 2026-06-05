import { Pencil } from "lucide-react";

import styles from "./profileHeader.module.css";
import avatar from "../../../assets/images/profile.png";

export default function ProfileHeader({ name, onEditAvatar }) {
  const firstName = name?.trim().split(" ")[0] || "Usuário";
  
  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        <img src={avatar} alt={name} className={styles.avatarImage} />
        <button
          className={styles.avatarEditBtn}
          onClick={onEditAvatar}
          aria-label="Editar foto"
        >
          <span>
            <Pencil size={14} />
          </span>
        </button>
      </div>
      <h1 className={styles.profileName}>{firstName}</h1>
    </div>
  );
}
