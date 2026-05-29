import { useId } from "react";
import styles from "./profileSection.module.css";

export default function ProfileSection({ title, children }) {
  const titleId = useId();
  return (
    <section
      className={styles.profileSection}
      aria-labelledby={title ? titleId : undefined}
    >
      {title && (
        <h2 id={titleId} className={styles.sectionTitle}>
          {title}
        </h2>
      )}
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
