import styles from "./roleHeader.module.css";

import SelectRole from "@/assets/images/selectRole.webp";

export default function RoleHeader() {
  return (
    <section className={styles.roleHeader}>
      <div className={styles.roleHeaderContainer}>
        <img src={SelectRole} alt="" loading="lazy" />
        <h1>Bem-vindo ao Paulo Viagens</h1>
        <p>Como você deseja utilizar o aplicativo hoje?</p>
      </div>
    </section>
  );
}
