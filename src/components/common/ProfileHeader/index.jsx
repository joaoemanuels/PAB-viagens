import { Pencil } from "lucide-react";
import styles from "./profileHeader.module.css";
import { passengersData } from "../../../data/passengers";
import userProfile_def from "../../../assets/images/userProfile_def.png";

export default function ProfileHeader({ name, onEditAvatar }) {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        <img
          src={passengersData.avatar || userProfile_def}
          alt={name}
          className={styles.avatarImage}
        />
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
      <h1 className={styles.profileName}>{name || "Usuário"}</h1>
    </div>
  );
}
