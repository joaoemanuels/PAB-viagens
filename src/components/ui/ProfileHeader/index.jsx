import { Pencil } from "lucide-react";
import styles from "./profileHeader.module.css";

export default function ProfileHeader({
  name,
  isPremium,
  avatarUrl,
  onEditAvatar,
}) {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg"
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
      {isPremium && (
        <div className={styles.premiumBadge}>
          <span>🗲</span> Membro Premium
        </div>
      )}
    </div>
  );
}
