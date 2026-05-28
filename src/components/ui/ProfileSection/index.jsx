import styles from "./profileSection.module.css";

export default function ProfileSection({ title, children }) {
  return (
    <section clas>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
