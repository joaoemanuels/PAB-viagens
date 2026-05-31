import { Link } from "react-router-dom";
import styles from "./roleFooter.module.css";
import { HelpCircleIcon } from "lucide-react";

export default function RoleFooter() {
  return (
    <footer className={styles.roleFooter}>
      <hr className={styles.divider} />

      <Link to="/ajuda" className={styles.helpLink}>
        <HelpCircleIcon className={styles.helpIcon} />
        <span>Precisa de ajuda?</span>
      </Link>
    </footer>
  );
}
