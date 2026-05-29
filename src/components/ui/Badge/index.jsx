import styles from "./badge.module.css";

export default function Badge({
  content,
  context,
  variant = "primary",
  className,
}) {
  return (
    <div className={`${styles.badge} ${styles[variant]} ${className}`}>
      {content} {context}
    </div>
  );
}
