import RoleFooter from "./RoleFooter";
import RoleHeader from "./RoleHeader";
import styles from "./selectRole.module.css";
import TabRole from "./TabRole";

export default function SelectRole() {
  return (
    <section className={styles.selectRole}>
      <RoleHeader />
      <TabRole />
      <RoleFooter />
    </section>
  );
}
