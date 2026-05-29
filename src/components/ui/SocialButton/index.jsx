import styles from "./socialButton.module.css";

export default function SocialButton({
  content,
  type,
  icon,
  className,
  variant = "primary",
}) {
  return (
    <button type={type} className={styles.socialButton}>
      <img
        src={icon}
        className={`${styles.socialIcon} ${styles[variant]} ${className}`}
      ></img>
      {content}
    </button>
  );
}
