import styles from "./socialButton.module.css";

export default function SocialButton({
  content,
  type,
  icon,
  className,
  variant = "primary",
  onClick,
}) {
  return (
    <button type={type} className={styles.socialButton} onClick={onClick}>
      <img
        src={icon}
        className={`${styles.socialIcon} ${styles[variant]} ${className}`}
        alt=""
      />
      {content}
    </button>
  );
}
