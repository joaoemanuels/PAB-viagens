import { Pencil } from "lucide-react";
import styles from "./profileHeader.module.css";
import { passengersData } from "../../../data/passengers";

export default function ProfileHeader({ name, onEditAvatar }) {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        <img
          src={passengersData.avatar}
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
      <h1 className={styles.profileName}>{name}</h1>
    </div>
  );
}
