import styles from "./appVersion.module.css";
import packageJson from "../../../../package.json";

export default function AppVersion() {
  return <footer className={styles.appVersion}>v{packageJson.version}</footer>;
}
