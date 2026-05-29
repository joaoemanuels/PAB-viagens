import styles from "./profileItem.module.css";

export default function ProfileItem({
  icon,
  label,
  value,
  isLink,
  rightElement,
  variant = "default",
  onClick,
}) {
  const isClickable = isLink || onClick;

  const variantClass = variant === "danger" ? styles.itemDanger : "";
  const clickableClass = isClickable ? styles.clickable : "";

  const handleKeyDown = (event) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles.profileItem} ${clickableClass} ${variantClass}`}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-haspopup={isLink && !onClick ? "tree" : undefined}
    >
      <div className={styles.itemLeft}>
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <div className={styles.itemInfo}>
          {value && <span className={styles.itemLabelMini}>{label}</span>}
          <span className={value ? styles.itemValue : styles.itemLabelMain}>
            {value || label}
          </span>
        </div>
      </div>

      <div className={styles.itemRight}>
        {rightElement}
        {isLink && !rightElement && (
          <span className={styles.arrowIcon} aria-hidden="true">
            ❯
          </span>
        )}
      </div>
    </div>
  );
}
