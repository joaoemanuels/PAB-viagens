import styles from "./appVersion.module.css";

export default function AppVersion({ version }) {
  return <footer className={styles.appVersion}>{version}</footer>;
}
