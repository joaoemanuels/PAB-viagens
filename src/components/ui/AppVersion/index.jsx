import styles from "./appVersion.module.css";

export default function AppVersion({ name, version }) {
  return (
    <footer className={styles.appVersion}>
      {name} {version}
    </footer>
  );
}
