import styles from "./button.module.css";

export default function Button({
  content,
  btnIcon,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      <span>{content}</span>
      {btnIcon}
    </button>
  );
}
