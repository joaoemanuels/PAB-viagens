import styles from "./button.module.css";

export default function Button({ content, btnIcon, className, onClick }) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      <span>{content}</span>
      {btnIcon}
    </button>
  );
}
