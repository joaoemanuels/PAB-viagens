import styles from "./roleHeader.module.css";
import SelectRole from "../../../assets/images/SelectRole.png";

export default function RoleHeader() {
  return (
    <section className={styles.roleHeader}>
      <div className={styles.roleHeaderContainer}>
        <img src={SelectRole} alt="" />
        <h1>Bem-vindo ao PAB Mobilidade</h1>
        <p>Como você deseja utilizar o aplicativo hoje?</p>
      </div>
    </section>
  );
}
