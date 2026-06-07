import styles from "./toast.module.css";

export default function Toast({ message }) {
  return <div className={styles.toast}>{message}</div>;
}
